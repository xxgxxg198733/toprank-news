"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageList } from "./message-list";
import { ModelSelector } from "./model-selector";

interface ModelInfo { id: string; name: string; provider: string; category: string; }
interface ProviderInfo { id: string; name: string; }

export function ChatPanel() {
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [providerId, setProviderId] = useState("deepseek");
  const [modelId, setModelId] = useState("deepseek-chat");
  const [defaults, setDefaults] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/models")
      .then((r) => r.json())
      .then((data) => {
        setProviders(data.providers || []);
        setModels(data.models || []);
        setDefaults(data.defaults || {});
        if (data.defaultProvider) {
          setProviderId(data.defaultProvider);
          setModelId(data.defaults?.[data.defaultProvider] || "deepseek-chat");
        }
      })
      .catch(() => {});
  }, []);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ providerId, modelId }),
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleProviderChange = (pid: string | null) => {
    if (!pid) return;
    setProviderId(pid);
    setModelId(defaults[pid] || models.find((m) => m.provider === pid)?.id || "deepseek-chat");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-between pb-3 border-b mb-3">
        <ModelSelector
          models={models}
          providers={providers}
          modelId={modelId}
          providerId={providerId}
          onModelChange={(v) => v && setModelId(v)}
          onProviderChange={handleProviderChange}
        />
        <Button variant="ghost" size="xs" onClick={() => setMessages([])} className="text-xs text-muted-foreground">
          清空对话
        </Button>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto py-2">
        <MessageList messages={messages} />
      </div>

      <div className="pt-3 border-t">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的问题..."
            rows={2}
            className="min-h-[48px] resize-none"
            onKeyDown={handleKeyDown}
          />
          {isLoading ? (
            <Button type="button" size="icon" variant="destructive" onClick={() => stop()}>
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" size="icon" disabled={!input.trim()} onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
