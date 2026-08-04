import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { ImageGenerator } from "@/components/image/image-generator";

export const metadata: Metadata = {
  title: "图片生成",
  description: "AI 图片生成工具，用文字描述创建精美图片，支持多种风格和尺寸。",
};

export default function ImagePage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">图片生成</h2>
        <p className="text-sm text-muted-foreground mb-4">
          用文字描述生成 AI 图片 · 支持多种尺寸
        </p>
        <ImageGenerator />
      </div>
    </ToolShell>
  );
}
