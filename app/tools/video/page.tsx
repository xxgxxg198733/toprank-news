import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { VideoForm } from "@/components/video/video-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Generation — AI视频生成 | 文字转视频在线制作",
  description: "免费AI视频生成工具，火山引擎(豆包Seedance)驱动。文字描述即可生成动态视频，支持16:9等多种比例。20积分/次。AI生成短视频、宣传片、广告视频。",
  keywords: ["AI视频生成", "文字生成视频", "AI视频制作", "火山引擎视频", "豆包Seedance", "AI生成短视频", "AI生成抖音视频", "AI视频制作工具", "在线AI视频", "文字转视频免费"],
  alternates: { canonical: "https://zicisi.fun/tools/video" },
};

export default function VideoPage() {
  return (
    <ToolShell>
      <AuthGuard
        message="请登录后使用视频生成"
        description="登录即可使用 AI 视频生成，文字转视频 —— 由火山引擎驱动"
      >
        <div>
          <h2 className="text-xl font-bold mb-1">Video Generation</h2>
          <p className="text-sm text-muted-foreground mb-4">
            AI Text to Video · Volcano Engine (Doubao)
          </p>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              AI video generation costs 20 credits. Consider using AI Chat or Writing tools to refine your idea first.
            </AlertDescription>
          </Alert>
          <VideoForm />
        </div>
      </AuthGuard>
    </ToolShell>
  );
}
