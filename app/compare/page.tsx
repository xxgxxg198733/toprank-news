import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, Zap, Globe, Scale, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Zicisi AI vs WebNavHub — Side-by-Side Comparison (2026)",
  description:
    "Zicisi AI vs WebNavHub compared: multi-model chat vs DeepSeek chat, image and video generation, data analysis vs document processing, free credits, pricing and no-subscription credit systems. Find out which AI toolkit fits you — or why you might want both.",
  keywords: [
    "Zicisi AI vs WebNavHub",
    "WebNavHub alternative",
    "AI toolkit comparison",
    "compare AI tools 2026",
    "DeepSeek chat platform",
    "AI tools with credits",
    "best AI toolkit no subscription",
  ],
  alternates: {
    canonical: "https://zicisi.fun/compare",
  },
  openGraph: {
    title: "Zicisi AI vs WebNavHub — Side-by-Side Comparison (2026)",
    description:
      "Two no-subscription AI toolkits, one side-by-side table. Compare models, tools, credits and pricing — and see why many users run both.",
    url: "https://zicisi.fun/compare",
    type: "website",
    siteName: "Zicisi AI",
    locale: "en_US",
  },
};

const comparisonRows = [
  {
    feature: "Positioning",
    zicisi: "All-in-one multi-model AI toolkit",
    webnavhub: '"AI Tools, Simplified" — Chinese AI from anywhere, no VPN',
  },
  {
    feature: "AI chat",
    zicisi: "8 models: DeepSeek, GPT-5.1, GPT-5, Claude Sonnet/Opus 4.5, Gemini 2.5 Pro, Doubao Pro 256K",
    webnavhub: "DeepSeek-powered chat with streaming output and chat history",
  },
  {
    feature: "Image generation",
    zicisi: "Seedream 5.0 Pro, DALL·E 3, GPT Image 1, Imagen 4",
    webnavhub: "Volcano Engine image generation — HD output, multiple styles",
  },
  {
    feature: "Video generation",
    zicisi: "Seedance text-to-video, 16:9 and more aspect ratios",
    webnavhub: "Seedance video generation with reference media support, 16:9",
  },
  {
    feature: "Writing tools",
    zicisi: "Article generation, rewriting, translation, SEO optimization",
    webnavhub: "General writing via chat",
  },
  {
    feature: "Data & documents",
    zicisi: "CSV / Excel upload with auto charts and plain-language reports",
    webnavhub: "Multi-format document processing with AI analysis and Q&A mode",
  },
  {
    feature: "Free credits on sign-in",
    zicisi: "50 credits",
    webnavhub: "20 credits",
  },
  {
    feature: "Trial pack",
    zicisi: "$1 = 75 credits (50 + 50% bonus)",
    webnavhub: "Pay-as-you-go credit packs",
  },
  {
    feature: "Subscription",
    zicisi: "None — credits never expire",
    webnavhub: "None — pay-as-you-go credits",
  },
  {
    feature: "Payments",
    zicisi: "PayPal",
    webnavhub: "PayPal",
  },
  {
    feature: "Access from anywhere",
    zicisi: "Cloud-hosted, works globally",
    webnavhub: "Designed for global access to Chinese models — no VPN needed",
  },
];

const zicisiWhen = [
  "You want GPT, Claude and Gemini in the same chat as DeepSeek and Doubao",
  "You write content — articles, SEO copy, translations — and want a dedicated writing tool",
  "You analyze spreadsheets and want auto-generated charts from CSV / Excel uploads",
  "You want the largest free welcome balance (50 credits) to explore everything",
];

const webnavhubWhen = [
  "DeepSeek chat and document processing cover 90% of your workflow",
  "You mainly need Chinese AI models from a network-restricted region",
  "You prefer a minimal, simplified toolkit over a feature-heavy one",
  "You want reference-media video generation and don't need multi-model chat",
];

const sharedFeatures = [
  "Pay-as-you-go credits — no subscription, no auto-renewal",
  "Powered by Chinese AI models (DeepSeek, Volcano Engine, Seedance)",
  "Runs entirely in the browser — no installation",
  "PayPal payment",
  "Free credits the moment you sign in",
];

const faqs = [
  {
    q: "Are Zicisi AI and WebNavHub the same product?",
    a: "No — they're two separate AI toolkits built on the same family of Chinese AI models (DeepSeek, Volcano Engine, Seedance). Zicisi AI is the broader all-in-one: eight chat models plus writing, data analysis, image and video tools. WebNavHub is the streamlined version: DeepSeek chat, image and video generation, and document processing — with an emphasis on accessing Chinese AI from anywhere without a VPN.",
  },
  {
    q: "Which one is cheaper?",
    a: "Both are pay-as-you-go with no subscription. Zicisi AI starts you with 50 free credits and offers a $1 trial pack (75 credits with the 50% bonus). WebNavHub starts with 20 free credits. For typical usage both work out to a few dollars per month — for heavy multi-tool use, Zicisi AI's larger balance and bundle of tools goes further.",
  },
  {
    q: "Do credits expire on Zicisi AI?",
    a: "No. Credits on Zicisi AI never expire, whether they came from the free welcome bonus or a purchase. WebNavHub also uses a no-subscription credit model — check its site for expiry details.",
  },
  {
    q: "Can WebNavHub be used without a VPN?",
    a: "That's its core promise: all API calls are proxied through WebNavHub's own servers, so you can use Chinese AI models from anywhere — no VPN needed. Zicisi AI is also cloud-hosted and works globally.",
  },
  {
    q: "Which platform has more AI models?",
    a: "Zicisi AI — its chat tool includes eight models across five providers (DeepSeek, OpenAI GPT, Anthropic Claude, Google Gemini and ByteDance Doubao), plus four image models. WebNavHub focuses on DeepSeek for chat and Volcano Engine for image and video.",
  },
  {
    q: "Should I use both?",
    a: "Many users do. Zicisi AI is your main workspace for multi-model chat, writing and spreadsheet analysis; WebNavHub is a handy second toolkit for DeepSeek chat and document Q&A when you're traveling or need a simplified fallback. Both are cheap enough that the decision is low-stakes.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ComparePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1 mb-5">
          <Scale className="h-3.5 w-3.5" />
          Two toolkits, one comparison
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Zicisi AI vs WebNavHub
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          Both are no-subscription AI toolkits with free credits. Both are powered by
          top Chinese AI models. Neither will ever auto-renew. The difference is scope:{" "}
          <strong className="text-foreground">Zicisi AI is the all-in-one with 8 chat models and
          writing + data tools</strong>; <strong className="text-foreground">WebNavHub is the
          streamlined DeepSeek toolkit built for global access</strong>. Here&apos;s how to pick —
          and why many people simply use both.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 gap-2 px-8 text-sm font-semibold transition-all"
          >
            Start free on Zicisi AI
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://webnavhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 h-11 gap-2 px-6 text-sm font-semibold transition-colors"
          >
            Visit WebNavHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Verdict cards */}
      <section className="grid gap-4 md:grid-cols-2 mb-14">
        <div className="rounded-3xl border-2 border-primary bg-primary/5 p-7">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold px-3 py-1 mb-3">
            <Zap className="h-3.5 w-3.5" /> Best all-in-one
          </div>
          <h2 className="text-2xl font-extrabold mb-1">Zicisi AI — zicisi.fun</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The full toolbox: 8 chat models, image, writing, data analysis and video on one
            credit balance.
          </p>
          <ul className="space-y-2 text-sm mb-5">
            {zicisiWhen.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-6 text-sm font-medium w-full transition-colors"
          >
            50 free credits on Zicisi AI →
          </Link>
        </div>

        <div className="rounded-3xl border-2 border-cyan-500 bg-cyan-500/5 p-7">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold px-3 py-1 mb-3">
            <Globe className="h-3.5 w-3.5" /> Best for global Chinese AI
          </div>
          <h2 className="text-2xl font-extrabold mb-1">WebNavHub — webnavhub.com</h2>
          <p className="text-sm text-muted-foreground mb-4">
            DeepSeek chat, Volcano Engine image and video, and document Q&A — simplified, from
            anywhere, no VPN.
          </p>
          <ul className="space-y-2 text-sm mb-5">
            {webnavhubWhen.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://webnavhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white h-9 px-6 text-sm font-medium w-full transition-colors"
          >
            Visit WebNavHub →
          </a>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Side-by-side comparison
        </h2>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3.5 font-semibold">Feature</th>
                <th className="px-4 py-3.5 font-bold text-primary">Zicisi AI</th>
                <th className="px-4 py-3.5 font-bold text-cyan-600 dark:text-cyan-400">
                  WebNavHub
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b last:border-0 align-top">
                  <td className="px-4 py-3.5 font-medium">{row.feature}</td>
                  <td className="px-4 py-3.5 text-primary">{row.zicisi}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{row.webnavhub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          WebNavHub details based on its public site as of August 2026.
        </p>
      </section>

      {/* Shared features */}
      <section className="mb-14">
        <div className="rounded-3xl border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Both platforms share</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Whatever you pick, you get the same honest model: no subscriptions, no surprises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
            {sharedFeatures.map((feature) => (
              <div key={feature} className="bg-muted/50 rounded-xl p-4 font-medium">
                <Sparkles className="h-4 w-4 text-primary mx-auto mb-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why not both */}
      <section className="mb-14 rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 p-8 md:p-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Why not both?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Both are pay-as-you-go with free credits, so running both costs almost nothing.
            Use Zicisi AI for multi-model chat, writing and spreadsheet analysis — and keep
            WebNavHub as your go-to for DeepSeek chat and document Q&A from anywhere. It&apos;s
            the setup a growing number of users run every day.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 gap-2 px-8 text-sm font-bold transition-all"
          >
            Get 50 free credits on Zicisi AI
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://webnavhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 h-11 gap-2 px-8 text-sm font-bold transition-colors"
          >
            Get free credits on WebNavHub
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Comparison FAQ</h2>
        <div className="grid gap-3 md:grid-cols-2 max-w-4xl mx-auto">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border bg-card p-5">
              <h3 className="font-bold mb-2">{item.q}</h3>
              <p className="text-sm leading-relaxed text-foreground/90">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Zicisi tools */}
      <section className="rounded-3xl border bg-muted/40 p-8">
        <h2 className="text-xl font-bold mb-4 text-center">
          Explore the Zicisi AI toolkit
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-center">
          <Link href="/tools/chat" className="font-medium hover:text-primary transition-colors">
            AI Chat — 8 models in one window
          </Link>
          <Link href="/tools/image" className="font-medium hover:text-primary transition-colors">
            Image Generation — Seedream, DALL·E 3, Imagen
          </Link>
          <Link href="/tools/writing" className="font-medium hover:text-primary transition-colors">
            AI Writing — articles, rewrite, SEO
          </Link>
          <Link href="/tools/analysis" className="font-medium hover:text-primary transition-colors">
            Data Analysis — CSV & Excel upload
          </Link>
          <Link href="/tools/video" className="font-medium hover:text-primary transition-colors">
            Video Generation — Seedance text-to-video
          </Link>
          <Link href="/pricing" className="font-medium hover:text-primary transition-colors">
            Pricing — $1 trial, no subscription
          </Link>
        </div>
      </section>
    </div>
  );
}
