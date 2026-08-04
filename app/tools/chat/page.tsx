import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "AI 对话",
  description: "多模型 AI 智能对话，支持 DeepSeek、GPT、Claude、Gemini，实时流式回复。",
};

export default function ChatPage() {
  return (
    <ToolShell>
      <ChatPanel />
    </ToolShell>
  );
}
