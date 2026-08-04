import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Zicisi AI — All-in-One AI Toolkit.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <h1 className="text-3xl font-extrabold mb-6">About Zicisi AI</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          Zicisi AI is a free online AI tool collection, making advanced AI technology accessible to everyone.
        </p>

        <h2>Our Mission</h2>
        <p>
          Bring cutting-edge AI capabilities to every user — whether you're a developer, designer, content creator, or everyday user, you'll find the right AI tools at Zicisi AI.
        </p>

        <h2>Supported AI Models</h2>
        <ul>
          <li><strong>Doubao (ByteDance)</strong> — High quality, cost-effective</li>
          <li><strong>DeepSeek</strong> — Strong Chinese understanding</li>
          <li><strong>OpenAI GPT</strong> — World-leading large language models</li>
          <li><strong>Anthropic Claude</strong> — Excellent at long-form text and analysis</li>
          <li><strong>Google Gemini</strong> — Multimodal AI capabilities</li>
        </ul>

        <h2>Five Tools</h2>
        <ul>
          <li><strong>AI Chat</strong> — Multi-model intelligent chat with real-time streaming</li>
          <li><strong>Image Generation</strong> — Create stunning images from text descriptions</li>
          <li><strong>AI Writing</strong> — Article generation, rewriting, translation, SEO</li>
          <li><strong>Data Analysis</strong> — Upload files for automatic AI insights</li>
          <li><strong>Video Generation</strong> — AI text-to-video creation</li>
        </ul>

        <h2>Security & Privacy</h2>
        <p>
          Your API keys are stored only in your server-side environment variables. All AI requests are proxied through the server and never exposed to the frontend. We do not store your conversations or generated content.
        </p>
      </div>
    </div>
  );
}
