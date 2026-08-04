import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { WritingShell } from "@/components/writing/writing-shell";

export const metadata: Metadata = {
  title: "AI 写作",
  description: "AI 写作助手：文章生成、内容改写、多语言翻译、SEO 优化。",
};

export default function WritingPage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">AI 写作</h2>
        <p className="text-sm text-muted-foreground mb-4">
          文章生成 · 改写润色 · 翻译 · SEO 优化
        </p>
        <WritingShell />
      </div>
    </ToolShell>
  );
}
