"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
import { getMessageText } from "@/lib/utils";
import { MessageMarkdown, MessageActions } from "./message-markdown";

export function MessageList({ messages }: { messages: UIMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 text-primary/40" />
          <p className="text-lg font-medium">开始对话</p>
          <p className="text-sm mt-1">输入消息，AI 将实时回复</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => {
        const text = getMessageText(msg.parts);
        return (
          <div key={msg.id} className={`flex gap-3 group ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role !== "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border"
              }`}
            >
              {msg.role === "user" ? (
                <p className="text-sm whitespace-pre-wrap">{text}</p>
              ) : (
                <>
                  <MessageMarkdown content={text} />
                  <MessageActions content={text} />
                </>
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
