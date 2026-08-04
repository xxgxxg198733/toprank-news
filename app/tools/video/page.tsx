import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { VideoForm } from "@/components/video/video-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "视频生成",
  description: "AI 视频生成工具，将文字创意转化为动态视频。",
};

export default function VideoPage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">视频生成</h2>
        <p className="text-sm text-muted-foreground mb-4">
          AI 文字转视频 · 支持 Kling v2、MiniMax
        </p>
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            AI 视频生成成本较高，建议先用 AI 对话或写作工具确认创意后再生成。
          </AlertDescription>
        </Alert>
        <VideoForm />
      </div>
    </ToolShell>
  );
}
