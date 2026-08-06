import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "AI Chat — 多模型智能对话 | DeepSeek/GPT/Claude/豆包",
  description: "免费在线AI聊天工具，支持DeepSeek、GPT-4o、Claude、Gemini、豆包等多模型切换。流式实时回复，中文友好，1积分/次。写文案、写代码、翻译、头脑风暴。",
  keywords: ["AI聊天", "AI对话", "免费AI聊天", "DeepSeek聊天", "GPT免费使用", "Claude中文", "豆包AI", "Gemini聊天", "多模型AI对话", "AI聊天机器人", "在线AI对话", "AI写代码", "AI写文案", "AI翻译", "AI头脑风暴"],
  alternates: { canonical: "https://zicisi.fun/tools/chat" },
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
