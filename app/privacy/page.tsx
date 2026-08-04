import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "Zicisi AI 隐私政策",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold mb-2">隐私政策</h1>
      <p className="text-sm text-muted-foreground mb-8">最后更新：2026 年 8 月</p>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <h2>1. 信息收集</h2>
        <p>
          Zicisi AI 不会主动收集你的个人信息。工具使用时产生的对话内容和生成结果
          不会被保存到我们的服务器。你的 API Key 仅用于转发请求到你选择的 AI 服务商。
        </p>

        <h2>2. API Key 安全</h2>
        <p>
          你的 AI 服务商 API Key 仅保存在你本地或 Vercel 的环境变量中。
          所有 AI 请求均通过服务端 API 路由转发，API Key 不会暴露到浏览器端。
        </p>

        <h2>3. 第三方服务</h2>
        <p>
          使用 AI 工具时，你的请求会被转发到对应的 AI 服务商
          （如 OpenAI、Anthropic、Google、DeepSeek）。各服务商有自己的隐私政策，
          我们建议你查看相应服务的隐私条款。
        </p>

        <h2>4. Cookie</h2>
        <p>
          我们可能使用必要的 Cookie 来保存你的偏好设置（如深色模式）。不用于追踪或广告目的。
        </p>

        <h2>5. 联系我们</h2>
        <p>
          如有任何隐私问题，请通过 GitHub Issues 联系我们：
          github.com/xxgxxg198733/toprank-news
        </p>
      </div>
    </div>
  );
}
