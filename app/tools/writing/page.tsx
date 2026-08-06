import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { WritingShell } from "@/components/writing/writing-shell";

export const metadata: Metadata = {
  title: "AI Writing — AI写作助手 | 文章生成/改写/翻译/SEO优化",
  description: "免费AI写作工具，支持文章生成、内容改写润色、多语言翻译、SEO优化写作。可指定语气风格（专业/轻松/学术）和字数。2积分/次。写公众号、小红书、知乎。",
  keywords: ["AI写作", "AI写文章", "AI写作助手", "AI改写", "AI润色", "AI翻译", "AI写公众号", "AI写小红书", "AI写文案", "AI写SEO文章", "文章生成器", "在线翻译", "AI写知乎"],
  alternates: { canonical: "https://zicisi.fun/tools/writing" },
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
