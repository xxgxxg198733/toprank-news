import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free AI Tools — No Credit Card Required | 50 Free Credits",
  description: "Get 50 free AI credits instantly. Chat with DeepSeek, GPT, Claude. Generate images with Volcano Engine. No subscription, no credit card. $1 for 75 more credits.",
  keywords: ["free AI tools", "free AI chatbot", "free AI image generator", "no signup AI tools", "free DeepSeek", "free ChatGPT alternative"],
};

const tools = [
  { name: "AI Chat", desc: "Chat with DeepSeek, GPT-4, Claude, Gemini — 1 credit per message.", credits: 50, icon: "💬" },
  { name: "AI Image Generator", desc: "Create stunning images with Volcano Engine Seedream — 8 credits per image.", credits: 6, icon: "🎨" },
  { name: "AI Writing", desc: "Articles, SEO content, translations, rewriting — 2 credits per request.", credits: 25, icon: "✍️" },
  { name: "Data Analysis", desc: "Upload CSV/Excel for AI-powered insights — 3 credits per report.", credits: 16, icon: "📊" },
  { name: "Video Generation", desc: "Text to video with Seedance — 20 credits per video.", credits: 2, icon: "🎬" },
];

export default function FreeAIToolsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold px-3 py-1 mb-4">✨ 100% Free — No Credit Card Required</div>
        <h1 className="text-4xl font-extrabold mb-4">Free AI Tools — 50 Credits On Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">Sign in with Google and get 50 free credits instantly. No subscription, no credit card, no catch. Need more? $1 buys 75 additional credits.</p>
        <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-12 gap-2 px-10 text-base font-bold">Get 50 Free Credits →</Link>
      </div>

      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 mb-8 text-center">
        <p className="text-sm"><strong>💰 Compare:</strong> ChatGPT Plus costs $20/month with usage caps. Zicisi AI gives you 50 free messages + $1 for 75 more. <strong>You save $19 on day one.</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {tools.map((t) => (
          <div key={t.name} className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3 mb-2"><span className="text-2xl">{t.icon}</span><h3 className="font-bold">{t.name}</h3></div>
            <p className="text-sm text-muted-foreground mb-2">{t.desc}</p>
            <p className="text-xs font-medium text-green-600">Free: up to {t.credits} uses with 50 credits</p>
          </div>
        ))}
      </div>

      <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-green-500/10 border">
        <h2 className="text-2xl font-bold mb-3">Ready to start?</h2>
        <p className="text-muted-foreground mb-4">50 credits = 50 chat messages or 6 AI images. Free forever, no expiration.</p>
        <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-12 gap-2 px-10 text-base font-bold">Claim Your 50 Credits</Link>
      </div>
    </div>
  );
}
