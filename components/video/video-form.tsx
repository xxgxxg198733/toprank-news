"use client";

import { useState, useEffect } from "react";
import { Video, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function VideoForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Poll status
  useEffect(() => {
    if (!taskId || status === "completed" || status === "failed") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/video/status?id=${taskId}`);
        if (!res.ok) return;
        const data = await res.json();
        setStatus(data.status);
        if (data.videoUrl) {
          setVideoUrl(data.videoUrl);
          setStatus("completed");
        }
        if (data.status === "failed") {
          setError("Video generation failed. Please try again.");
        }
      } catch {
        // retry next poll
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [taskId, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setVideoUrl(null);
    setStatus(null);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setTaskId(data.taskId);
      setStatus(data.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const isGenerating = loading || (status && status !== "completed" && status !== "failed");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Describe the video you want... (e.g. A golden retriever running on the beach at sunset, cinematic quality)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="min-h-[100px]"
      />

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={!prompt.trim() || isGenerating}>
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Video className="h-4 w-4 mr-1" />
          )}
          {isGenerating ? "Generating..." : "Generate Video"}
        </Button>
        <span className="text-xs text-muted-foreground">Powered by Volcano Engine (Doubao)</span>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>
      )}

      {isGenerating && !loading && (
        <div className="p-4 bg-card border rounded-xl text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Generating video... This may take 1-3 minutes.</p>
          <p className="text-xs text-muted-foreground mt-1">Status: {status}</p>
        </div>
      )}

      {videoUrl && (
        <div className="rounded-xl overflow-hidden border bg-card">
          <video controls className="w-full" src={videoUrl} />
          <div className="p-2 flex justify-end">
            <Button size="sm" variant="outline" asChild>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-3.5 w-3.5 mr-1" /> Download
              </a>
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
