import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { ImageGenerator } from "@/components/image/image-generator";

export const metadata: Metadata = {
  title: "Image Generation — AI图片生成 | 文字转图片在线工具",
  description: "免费AI图片生成工具，支持豆包Seedream、DALL·E 3、GPT Image等模型。文字描述即可生成高清图片，支持1:1方图/16:9横版/9:16竖版。8积分/张。",
  keywords: ["AI图片生成", "AI绘画", "文字转图片", "免费AI生图", "豆包Seedream", "DALL-E生图", "GPT生图", "AI生成头像", "AI生成壁纸", "AI生成海报", "AI生成插画", "在线AI绘画"],
  alternates: { canonical: "https://zicisi.fun/tools/image" },
};

export default function ImagePage() {
  return (
    <ToolShell>
      <AuthGuard
        message="请登录后使用图片生成"
        description="登录即可使用 AI 生成精美图片，支持多种风格和尺寸"
      >
        <div>
          <h2 className="text-xl font-bold mb-1">Image Generation</h2>
          <p className="text-sm text-muted-foreground mb-4">
            AI Image Generation from Text · Multiple Sizes
          </p>
          <ImageGenerator />
        </div>
      </AuthGuard>
    </ToolShell>
  );
}
