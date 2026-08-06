import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zicisi AI vs WebNavHub AI — Which AI Toolkit is Right for You?",
  description: "Compare Zicisi AI and WebNavHub AI side by side. Chat, image, video, document tools. DeepSeek + Volcano Engine. 50 free credits on both. Find your perfect AI toolkit.",
  keywords: ["Zicisi AI vs WebNavHub", "AI toolkit comparison", "best AI tools 2026", "DeepSeek chat", "AI image generator"],
};

export default function ComparePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold mb-3">Which AI Toolkit is Right for You?</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Compare our two AI platforms — both powered by the same Chinese AI models, optimized for different use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Zicisi AI */}
        <div className="rounded-2xl border-2 border-primary bg-primary/5 p-8">
          <h2 className="text-2xl font-extrabold mb-2">Zicisi AI</h2>
          <p className="text-sm text-muted-foreground mb-6">All-in-one creative AI toolkit</p>
          <div className="space-y-3 mb-6">
            {[
              ["Chat", "DeepSeek, GPT, Claude, Gemini"],
              ["Image", "Volcano Engine + DALL·E"],
              ["Writing", "Articles, rewrite, translate, SEO"],
              ["Analysis", "Upload CSV/Excel, AI insights"],
              ["Video", "Coming soon"],
            ].map(([t, f]) => (
              <div key={t} className="flex justify-between text-sm"><span className="font-medium">{t}</span><span className="text-muted-foreground">{f}</span></div>
            ))}
          </div>
          <Link href="https://www.zicisi.fun" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-9 px-6 text-sm font-medium w-full">Try Zicisi AI →</Link>
        </div>

        {/* WebNavHub */}
        <div className="rounded-2xl border-2 border-cyan-500 bg-cyan-500/5 p-8">
          <h2 className="text-2xl font-extrabold mb-2">WebNavHub AI</h2>
          <p className="text-sm text-muted-foreground mb-6">Chinese AI models, global access</p>
          <div className="space-y-3 mb-6">
            {[
              ["Chat", "DeepSeek with streaming"],
              ["Image", "Volcano Engine Seedream 5.0"],
              ["Video", "Seedance 2.0 — reference media"],
              ["Document", "Upload & AI analysis + Q&A"],
              ["Blog", "AI guides & comparisons"],
            ].map(([t, f]) => (
              <div key={t} className="flex justify-between text-sm"><span className="font-medium">{t}</span><span className="text-muted-foreground">{f}</span></div>
            ))}
          </div>
          <Link href="https://webnavhub.com" className="inline-flex items-center justify-center rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white h-9 px-6 text-sm font-medium w-full">Try WebNavHub AI →</Link>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Both platforms share:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {["50 free credits on sign in", "$1 trial available", "PayPal payment", "No subscription needed"].map((f) => (
            <div key={f} className="bg-muted/50 rounded-xl p-4 font-medium">✅ {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
