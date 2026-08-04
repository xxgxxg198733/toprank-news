import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { VideoForm } from "@/components/video/video-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Generation",
  description: "AI Video Generator — turn text ideas into dynamic videos.",
};

export default function VideoPage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">Video Generation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          AI Text to Video · Kling v2, MiniMax
        </p>
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            AI video generation costs more credits. Consider using AI Chat or Writing tools to refine your idea first.
          </AlertDescription>
        </Alert>
        <VideoForm />
      </div>
    </ToolShell>
  );
}
