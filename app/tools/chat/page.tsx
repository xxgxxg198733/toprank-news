import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Multi-model AI chat with Doubao, DeepSeek, GPT, Claude, Gemini. Real-time streaming responses.",
};

export default function ChatPage() {
  return (
    <ToolShell>
      <AuthGuard
        message="请登录后使用 AI Chat"
        description="登录即可与多模型 AI 对话，包括豆包、DeepSeek、GPT、Claude、Gemini"
      >
        <ChatPanel />
      </AuthGuard>
    </ToolShell>
  );
}
