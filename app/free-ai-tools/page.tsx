import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Image,
  Pen,
  BarChart3,
  Video,
  Sparkles,
  Zap,
  ShieldCheck,
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Tools — No Signup Required · 50 Free Credits",
  description:
    "Free AI tools with 50 free credits and no credit card: free AI chat with DeepSeek, GPT, Claude, Gemini and Doubao, AI image generation, AI writing assistant, data analysis and AI video. No subscription — pay only if you want more.",
  keywords: [
    "free AI tools",
    "free AI tools no signup",
    "free AI tools no credit card",
    "free AI chat tool",
    "AI tools with free credits",
    "free AI image generator",
    "AI writing assistant free",
    "free AI video generator",
    "AI tools no subscription",
    "免费AI工具",
    "免费积分",
  ],
  alternates: {
    canonical: "https://zicisi.fun/free-ai-tools",
  },
  openGraph: {
    title: "Free AI Tools — No Signup Required · 50 Free Credits",
    description:
      "50 free credits to chat with GPT, Claude, DeepSeek, Gemini and Doubao — plus free AI images, writing, data analysis and video. No credit card, no subscription.",
    url: "https://zicisi.fun/free-ai-tools",
    type: "website",
    siteName: "Zicisi AI",
    locale: "en_US",
  },
};

const tools = [
  {
    icon: MessageCircle,
    name: "AI Chat",
    tagline: "Chat with 8 top models in one window",
    cost: "1 credit per turn",
    freeCount: "≈ 50 free chats",
    models:
      "DeepSeek · GPT-5.1 · Claude Sonnet 4.5 · Claude Opus 4.5 · Gemini 2.5 · Doubao Pro 256K",
    href: "/tools/chat",
  },
  {
    icon: Image,
    name: "AI Image Generation",
    tagline: "Text-to-image in seconds, no watermark",
    cost: "8 credits per image",
    freeCount: "≈ 6 free HD images",
    models: "Seedream 5.0 Pro · DALL·E 3 · GPT Image 1 · Imagen 4",
    href: "/tools/image",
  },
  {
    icon: Pen,
    name: "AI Writing",
    tagline: "Articles, rewrite, translate, SEO",
    cost: "2 credits per request",
    freeCount: "≈ 25 free requests",
    models: "Article generation · rewriting · translation · SEO optimization",
    href: "/tools/writing",
  },
  {
    icon: BarChart3,
    name: "AI Data Analysis",
    tagline: "Upload CSV or Excel, get insights + charts",
    cost: "3 credits per report",
    freeCount: "≈ 16 free analyses",
    models: "Trend detection · anomaly spotting · auto charts · plain-language reports",
    href: "/tools/analysis",
  },
  {
    icon: Video,
    name: "AI Video Generation",
    tagline: "Turn a sentence into a video clip",
    cost: "20 credits per video",
    freeCount: "≈ 2 free videos",
    models: "Seedance (Volcano Engine) · 16:9 and more",
    href: "/tools/video",
  },
];

const comparisonRows = [
  {
    feature: "Monthly price",
    zicisi: "$0 to start — pay-as-you-go",
    chatgpt: "$20 / month",
    claude: "$20 / month",
    gemini: "$19.99 / month",
  },
  {
    feature: "Free credits on sign-in",
    zicisi: "50 credits — no card needed",
    chatgpt: "Free tier, rate-limited",
    claude: "Free tier, daily caps",
    gemini: "Free tier, limited",
  },
  {
    feature: "Credit card required to start",
    zicisi: "No",
    chatgpt: "Yes (for Plus)",
    claude: "Yes (for Pro)",
    gemini: "Yes (for Pro)",
  },
  {
    feature: "Subscription required",
    zicisi: "No — credits never expire",
    chatgpt: "Yes",
    claude: "Yes",
    gemini: "Yes",
  },
  {
    feature: "Chat models included",
    zicisi: "DeepSeek, GPT-5.1, Claude, Gemini, Doubao",
    chatgpt: "GPT family",
    claude: "Claude family",
    gemini: "Gemini family",
  },
  {
    feature: "AI image generation",
    zicisi: "Seedream 5.0, DALL·E 3, GPT Image 1, Imagen 4",
    chatgpt: "Included with Plus",
    claude: "—",
    gemini: "Included with Pro",
  },
  {
    feature: "AI writing assistant",
    zicisi: "Built-in — articles, rewrite, SEO",
    chatgpt: "Via chat prompts",
    claude: "Via chat prompts",
    gemini: "Google Docs integration",
  },
  {
    feature: "Data analysis (CSV / Excel)",
    zicisi: "Built-in — upload + auto charts",
    chatgpt: "File uploads",
    claude: "Long-context only",
    gemini: "File uploads",
  },
  {
    feature: "AI video generation",
    zicisi: "Built-in — Seedance",
    chatgpt: "Not included",
    claude: "Not included",
    gemini: "Separate (Veo)",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Content creator",
    quote:
      "I used to pay for two subscriptions to get chat and image generation. With the 50 free credits here I got a whole week of work done before spending a dollar — and I didn't even need to.",
  },
  {
    name: "David K.",
    role: "Freelance developer",
    quote:
      "Being able to switch between DeepSeek, GPT and Claude in the same conversation is the killer feature. The free credits let me test every model before buying anything.",
  },
  {
    name: "Lina C.",
    role: "Marketing manager",
    quote:
      "The writing tool pays for itself. Drafting, rewriting and SEO in one place for 2 credits a request — my $1 trial is still going after three weeks.",
  },
];

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes — every new account gets 50 free credits the moment they sign in with Google. No credit card, no trial window, no subscription. Those credits work on every tool on the site, including chat with GPT, Claude, DeepSeek, Gemini and Doubao.",
  },
  {
    q: "Do I need a credit card for the free credits?",
    a: "No. Sign in with Google and the 50 credits are yours instantly. You never enter a card unless you decide to buy a top-up pack later.",
  },
  {
    q: "What happens when my 50 free credits run out?",
    a: "Nothing gets deleted and nothing gets charged. You can keep signing in for free and buy a small pack whenever you need one — the $1 trial pack gives 75 credits, and packs never auto-renew.",
  },
  {
    q: "Do the credits expire?",
    a: "No. Credits on Zicisi AI never expire, whether they came from the free welcome bonus or from a purchase. There is no monthly reset and no deadline to use them.",
  },
  {
    q: "Which models can I use with the free credits?",
    a: "All of them. The 50 free credits cover DeepSeek Chat, GPT-5.1, GPT-5, Claude Sonnet 4.5, Claude Opus 4.5, Gemini 2.5 Pro, Doubao Pro 256K and more — plus image generation, writing, data analysis and video.",
  },
  {
    q: "How is this different from ChatGPT's free tier?",
    a: "ChatGPT's free tier limits you to one model family with throttled responses during peak hours. Zicisi AI gives you eight chat models in one conversation, plus image, writing, data and video tools — all from one 50-credit balance.",
  },
  {
    q: "Can I use the free credits for video generation?",
    a: "Yes. A video costs 20 credits, so your 50 free credits cover two videos (or a mix — for example 16 images and 2 videos).",
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

export default function FreeAiToolsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          50 FREE CREDITS for every new account
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Free AI Tools — No Signup Required
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Chat with GPT-5.1, Claude, DeepSeek, Gemini and Doubao. Generate images, write
          articles, analyze spreadsheets and make videos.{" "}
          <strong className="text-foreground">
            No credit card. No subscription. No hidden fees.
          </strong>{" "}
          Just a free Google sign-in to claim your 50 credits.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 gap-2 px-8 text-sm font-semibold transition-all"
          >
            Sign in with Google
            <ArrowRight className="h-4 w-4" />
            <span className="font-bold">Get 50 credits instantly</span>
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card hover:bg-muted h-11 px-6 text-sm font-medium transition-colors"
          >
            See pricing
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> No credit card
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-500" /> No subscription
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" /> Credits never expire
          </span>
        </div>
      </section>

      {/* 50 credits callout */}
      <section className="mb-14">
        <div className="rounded-3xl bg-gradient-to-br from-amber-500/15 via-primary/10 to-emerald-500/10 border border-amber-500/30 p-8 md:p-10 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
            Claim your free balance now
          </div>
          <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-amber-500 via-primary to-emerald-500 bg-clip-text text-transparent mb-3">
            50 FREE CREDITS
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            One balance for every tool. Here&apos;s exactly what 50 free credits get you:
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              "50 AI chat turns",
              "25 writing requests",
              "16 data analyses",
              "6 HD images",
              "2 videos",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Every tool is included — no paid unlocks
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Your 50 free credits work on every single tool. No premium tiers, no locked features,
          no watermark on generated images or videos.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border bg-card p-5 flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold leading-tight">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground">{tool.tagline}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{tool.models}</p>
              <div className="mt-auto space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs">
                  <span className="text-muted-foreground">{tool.cost}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {tool.freeCount}
                  </span>
                </div>
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-border hover:bg-muted w-full h-8 text-xs font-medium transition-colors"
                >
                  Try it free <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}

          {/* Free credits summary card */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-xl bg-primary p-2.5">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold leading-tight">Your free starter kit</h3>
                <p className="text-xs text-muted-foreground">Sign in once, use everything</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex-1 mb-3 leading-relaxed">
              Skip the spreadsheet of 20 different free trials. Zicisi AI is one account, one
              credit balance and every major model — the toolkit version of &quot;it&apos;s all
              free to try.&quot;
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm font-semibold transition-colors"
            >
              Sign in with Google — free
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Why pay $20/mo for ChatGPT when you get 50 free credits here?
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Free credits plus pay-as-you-go pricing beats a monthly subscription for almost every
          kind of usage. Compare for yourself:
        </p>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3.5 font-semibold">Feature</th>
                <th className="px-4 py-3.5 font-bold text-primary">Zicisi AI</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">ChatGPT Plus</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">Claude Pro</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">Gemini Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-primary font-medium">{row.zicisi}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.chatgpt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.claude}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.gemini}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Competitor pricing and features are approximate as of August 2026 and subject to
          change. Zicisi AI pricing is fixed on the{" "}
          <Link href="/pricing" className="text-primary underline underline-offset-2">
            pricing page
          </Link>
          .
        </p>
      </section>

      {/* Social proof */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          People are switching — and staying
        </h2>
        <div className="flex items-center justify-center gap-1 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 text-sm font-semibold">4.9 / 5 from 1,200+ users</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border bg-card p-6 flex flex-col">
              <Quote className="h-6 w-6 text-primary/40 mb-3" />
              <blockquote className="text-sm leading-relaxed flex-1 mb-4">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          &quot;Is it really free?&quot; — Yes. Here&apos;s the fine print.
        </h2>
        <div className="grid gap-3 md:grid-cols-2 max-w-4xl mx-auto">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border bg-card p-5">
              <h3 className="font-bold mb-2">{item.q}</h3>
              <p className="text-sm leading-relaxed text-foreground/90">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Your 50 free credits are waiting</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Sign in with Google, get 50 credits instantly, and start chatting with GPT, Claude,
          DeepSeek and Gemini today. Takes about 10 seconds.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 gap-2 px-10 text-sm font-bold transition-all"
        >
          Sign in with Google
          <ArrowRight className="h-4 w-4" />
          Get 50 credits instantly
        </Link>
      </section>
    </div>
  );
}
