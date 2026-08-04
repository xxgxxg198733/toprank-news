"use client";

import { useState } from "react";
import { Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function VideoForm() {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          视频生成功能需要配置 Fal.ai API Key。请在 <code className="text-xs bg-muted px-1 rounded">.env.local</code> 中设置 <code className="text-xs bg-muted px-1 rounded">FAL_KEY</code> 后使用。
          <br />
          支持的模型：Kling v2、MiniMax 等。
          <Button variant="link" size="xs" className="px-0" onClick={() => setSubmitted(false)}>
            返回编辑
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="描述你想要的视频内容...（如：一只金毛犬在海边奔跑，夕阳西下，电影质感）"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="min-h-[100px]"
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={!prompt.trim()}>
          <Video className="h-4 w-4 mr-1" /> 生成视频
        </Button>
        <span className="text-xs text-muted-foreground self-center">
          需要配置 Fal.ai API Key
        </span>
      </div>
    </form>
  );
}
