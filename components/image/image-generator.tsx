"use client";

import { useState } from "react";
import { Sparkles, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const sizes = [
  { value: "1024x1024", label: "1:1 方形 (1024)" },
  { value: "1792x1024", label: "16:9 横版 (1792)" },
  { value: "1024x1792", label: "9:16 竖版 (1792)" },
];

const models = [
  { value: "doubao-seedream-5-0-pro-260628", label: "豆包 Seedream 5.0" },
  { value: "gpt-image-1", label: "GPT Image 1" },
  { value: "dall-e-3", label: "DALL·E 3" },
];

const providers = [
  { value: "doubao", label: "豆包" },
  { value: "openai", label: "OpenAI" },
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [modelId, setModelId] = useState("doubao-seedream-5-0-pro-260628");
  const [providerId, setProviderId] = useState("doubao");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), size, modelId, providerId, n: 1 }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const data = await res.json();
      setImages(data.images.map((img: { base64: string | null; url: string | null; mediaType: string }) =>
        img.url ? img.url : `data:${img.mediaType};base64,${img.base64}`
      ));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "生成失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (dataUrl: string, index: number) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `ai-image-${Date.now()}-${index}.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="描述你想要的图片...（如：一只可爱的橘猫在阳光下睡觉）"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Select value={providerId} onValueChange={(v) => { if (v) { setProviderId(v); setModelId(v === "doubao" ? "doubao-seedream-5-0-pro-260628" : "gpt-image-1"); } }}>
            <SelectTrigger className="w-[80px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={modelId} onValueChange={(v) => v && setModelId(v)}>
            <SelectTrigger className="w-[130px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={size} onValueChange={(v) => v && setSize(v)}>
            <SelectTrigger className="w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            生成
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="aspect-square w-full max-w-md rounded-xl" />
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((dataUrl, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden border bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dataUrl} alt={`AI 生成图片 ${i + 1}`} className="w-full h-auto" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon-xs" variant="secondary" onClick={() => handleDownload(dataUrl, i)}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
