import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Multi-model AI chat with Doubao, DeepSeek, GPT, Claude, Gemini. Real-time streaming responses.",
};

export default function ChatPage() {
  return (
    <ToolShell>
      <ChatPanel />
    </ToolShell>
  );
}
