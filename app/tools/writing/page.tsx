import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { WritingShell } from "@/components/writing/writing-shell";

export const metadata: Metadata = {
  title: "AI Writing",
  description: "AI Writing Assistant: article generation, content rewriting, translation, and SEO optimization.",
};

export default function WritingPage() {
  return (
    <ToolShell>
      <AuthGuard
        message="请登录后使用 AI Writing"
        description="登录即可使用 AI 写作助手：文章生成、改写、翻译、SEO 优化"
      >
        <div>
          <h2 className="text-xl font-bold mb-1">AI Writing</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Article Generation · Rewriting · Translation · SEO
          </p>
          <WritingShell />
        </div>
      </AuthGuard>
    </ToolShell>
  );
}
