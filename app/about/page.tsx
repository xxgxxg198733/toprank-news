import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 Zicisi AI — 一站式在线 AI 工具箱。",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold mb-6">关于 Zicisi AI</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Zicisi AI 是一个免费的在线 AI 工具集合，旨在让每个人都能轻松使用先进的 AI 技术。
        </p>

        <h2>我们的使命</h2>
        <p>
          将最前沿的 AI 能力带给每一位用户——无论你是开发者、设计师、内容创作者还是普通用户，
          都能在 Zicisi AI 找到适合你的 AI 工具。
        </p>

        <h2>支持的 AI 模型</h2>
        <ul>
          <li><strong>DeepSeek</strong> — 高性价比，中文理解能力强</li>
          <li><strong>OpenAI GPT</strong> — 全球领先的大语言模型</li>
          <li><strong>Anthropic Claude</strong> — 擅长长文本和分析推理</li>
          <li><strong>Google Gemini</strong> — 多模态 AI 能力</li>
        </ul>

        <h2>五大工具</h2>
        <ul>
          <li><strong>AI 对话</strong> — 多模型智能聊天，实时流式回复</li>
          <li><strong>图片生成</strong> — 文字描述生成精美图片</li>
          <li><strong>AI 写作</strong> — 文章生成、改写、翻译、SEO</li>
          <li><strong>数据分析</strong> — 上传文件自动分析洞察</li>
          <li><strong>视频生成</strong> — AI 文字转视频</li>
        </ul>

        <h2>安全与隐私</h2>
        <p>
          你的 API Key 仅保存在你的服务端环境变量中，所有 AI 请求通过服务端转发，
          不会将你的密钥暴露给前端。我们不存储你的对话和生成的内容。
        </p>
      </div>
    </div>
  );
}
