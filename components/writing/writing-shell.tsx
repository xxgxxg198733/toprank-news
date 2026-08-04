"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Send, Square, FileDown } from "lucide-react";
import { getMessageText } from "@/lib/utils";
import { MessageMarkdown } from "@/components/chat/message-markdown";

const TABS = [
  { id: "article", label: "Article", placeholder: "Describe the article topic and content you want..." },
  { id: "rewrite", label: "Rewrite", placeholder: "Paste the text you want to rewrite..." },
  { id: "translate", label: "Translate", placeholder: "Paste the text you want to translate..." },
  { id: "seo", label: "SEO", placeholder: "Enter your target keywords or topic..." },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "academic", label: "Academic" },
  { value: "friendly", label: "Friendly" },
  { value: "enthusiastic", label: "Enthusiastic" },
];

const languages = [
  { value: "English", label: "English" }, { value: "Chinese", label: "Chinese" },
  { value: "Japanese", label: "Japanese" }, { value: "Korean", label: "Korean" },
  { value: "French", label: "French" }, { value: "German", label: "German" },
];

export function WritingShell() {
  const [activeTab, setActiveTab] = useState("article");
  const [text, setText] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [targetLang, setTargetLang] = useState("英文");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState("");

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/writing",
      body: () => ({ tool: activeTab, text, options: { tone, length, targetLang, keywords } }),
    }),
  });

  // Collect result from messages
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role !== "user");
  const lastText = lastAssistantMsg ? getMessageText(lastAssistantMsg.parts) : "";
  if (lastText && lastText !== result) {
    setResult(lastText);
  }

  const handleGenerate = () => {
    if (!text.trim()) return;
    setResult("");
    sendMessage({ text });
  };

  const isLoading = status === "submitted" || status === "streaming";
  const currentTab = TABS.find((t) => t.id === activeTab);

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `writing-${activeTab}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
        <TabsList className="w-full justify-start mb-4">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {activeTab !== "translate" && activeTab !== "seo" && (
              <>
                <Select value={tone} onValueChange={(v) => setTone(v || "")}>
                  <SelectTrigger className="h-8 w-[120px] text-xs">
                    <SelectValue placeholder="Tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {activeTab === "article" && (
                  <Input
                    placeholder="Word count (e.g. 800 words)"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="h-8 w-[140px] text-xs"
                  />
                )}
              </>
            )}
            {activeTab === "translate" && (
              <Select value={targetLang} onValueChange={(v) => v && setTargetLang(v)}>
                <SelectTrigger className="h-8 w-[100px] text-xs">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {activeTab === "seo" && (
              <Input
                placeholder="Core keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="h-8 w-[180px] text-xs"
              />
            )}
          </div>

          <Textarea
            placeholder={currentTab?.placeholder || "Enter your content..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="min-h-[120px] resize-y"
          />

          <div className="flex gap-2">
            {isLoading ? (
              <Button type="button" variant="destructive" size="sm" onClick={() => stop()}>
                <Square className="h-4 w-4 mr-1" /> Stop
              </Button>
            ) : (
              <Button type="button" size="sm" disabled={!text.trim()} onClick={handleGenerate}>
                <Send className="h-4 w-4 mr-1" /> Generate
              </Button>
            )}
            {result && (
              <Button type="button" variant="outline" size="sm" onClick={handleDownload}>
                <FileDown className="h-4 w-4 mr-1" /> Download
              </Button>
            )}
          </div>
        </div>
      </Tabs>

      {result && (
        <div className="mt-6 p-4 bg-card border rounded-xl">
          <MessageMarkdown content={result} />
        </div>
      )}
    </div>
  );
}
