import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Image,
  Pen,
  BarChart3,
  Video,
  Sparkles,
  ArrowRight,
  Search,
  LayoutGrid,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Complete AI Tools Directory 2026 — Free AI Chat, Image, Writing, Data & Video",
  description:
    "The complete AI tools directory 2026: free AI chat tool with DeepSeek, GPT, Claude and Gemini, the best AI image generator 2026 (Seedream, DALL·E 3), a free AI writing assistant, AI data analysis with CSV upload, and free AI video generator text to video. All in one place with credit pricing.",
  keywords: [
    "AI tools directory",
    "best AI tools 2026",
    "free AI chat tool",
    "best AI image generator 2026",
    "AI writing assistant free",
    "AI data analysis upload CSV",
    "free AI video generator text to video",
    "AI article generator with SEO optimization",
    "AI translation free",
    "AI essay writer free",
    "AI tools no signup",
    "free AI tools no credit card",
    "AI图片生成工具",
    "免费AI工具大全",
  ],
  alternates: {
    canonical: "https://zicisi.fun/ai-tools-directory",
  },
  openGraph: {
    title: "Complete AI Tools Directory 2026 — Free AI Chat, Image, Writing, Data & Video",
    description:
      "Every AI tool on zicisi.fun in one directory: multi-model chat, image generation, writing, data analysis and video — with credit pricing for each.",
    url: "https://zicisi.fun/ai-tools-directory",
    type: "website",
    siteName: "Zicisi AI",
    locale: "en_US",
  },
};

const categories = [
  {
    id: "ai-chat-tools",
    icon: MessageCircle,
    name: "AI Chat Tools",
    tagline: "The free AI chat tool with 8 models in one window",
    description:
      "A free AI chat tool that gives you every major model in one conversation: DeepSeek, GPT-5.1, GPT-5, Claude Sonnet 4.5, Claude Opus 4.5, Gemini 2.5 Pro, Doubao Pro 256K and Doubao Lite. Streaming responses, chat history, and the ability to switch models mid-conversation without losing context. One of the best free AI chat tools in 2026 for comparing models side by side.",
    useCases: [
      "Coding help and debugging across languages",
      "Instant translation (Chinese, English, Japanese, Spanish and more)",
      "Brainstorming and idea generation",
      "Homework help, math reasoning and study notes",
      "Writing emails, summaries and outlines",
    ],
    pricing: "1 credit per chat turn — about 50 free chats with the 50-credit welcome bonus",
    cta: "Start free AI chat",
    href: "/tools/chat",
  },
  {
    id: "ai-image-tools",
    icon: Image,
    name: "AI Image Generation Tools",
    tagline: "The best AI image generator 2026 — no watermark, no subscription",
    description:
      "Text-to-image generation powered by Seedream 5.0 Pro, DALL·E 3, GPT Image 1 and Imagen 4. Describe any scene in Chinese or English and get high-resolution images in seconds — no watermark on anything you create. Supports 1:1 square, 16:9 landscape and 9:16 portrait formats for social media, thumbnails, posters and wallpapers.",
    useCases: [
      "Social media art and thumbnails",
      "Product shots and marketing visuals",
      "Avatars, logos and branding mockups",
      "Wallpapers and concept art",
      "Illustrations for blog posts and videos",
    ],
    pricing: "8 credits per image — about 6 free HD images with the 50-credit welcome bonus",
    cta: "Generate images free",
    href: "/tools/image",
  },
  {
    id: "ai-writing-tools",
    icon: Pen,
    name: "AI Writing Tools",
    tagline: "The AI writing assistant free tier users love",
    description:
      "A complete AI writing assistant: long-form article generation, content rewriting and polishing, multi-language translation, and SEO-optimized writing. Choose a tone (professional, casual, academic), set a word count, and generate ready-to-publish content for blogs, newsletters, WeChat official accounts and product pages.",
    useCases: [
      "AI article generator with SEO optimization",
      "AI essay writer for students",
      "Rewriting and paraphrasing existing drafts",
      "Free AI translation between Chinese and English",
      "Marketing copy, ad headlines and social posts",
    ],
    pricing: "2 credits per request — about 25 free requests with the 50-credit welcome bonus",
    cta: "Open the AI writer",
    href: "/tools/writing",
  },
  {
    id: "ai-data-tools",
    icon: BarChart3,
    name: "AI Data Analysis Tools",
    tagline: "AI data analysis upload CSV or Excel — no SQL required",
    description:
      "Upload a CSV or Excel file and the AI reads your data, spots trends, detects anomalies and writes a plain-language report — with charts generated automatically. No spreadsheets skills, no SQL, no pivot tables. Ideal for sales data, financial reports, survey results and operational metrics.",
    useCases: [
      "AI data analysis upload CSV in seconds",
      "Excel analysis for non-technical users",
      "Trend detection and anomaly spotting",
      "Automatic charts and data visualization",
      "Business reports and summaries",
    ],
    pricing: "3 credits per report — about 16 free analyses with the 50-credit welcome bonus",
    cta: "Analyze your data free",
    href: "/tools/analysis",
  },
  {
    id: "ai-video-tools",
    icon: Video,
    name: "AI Video Generation Tools",
    tagline: "The free AI video generator text to video in 2026",
    description:
      "Turn a sentence into a short video clip with Seedance, the Volcano Engine text-to-video model. Describe your scene — a cinematic product ad, a nature shot, an anime moment — and the AI renders a video in minutes. Supports 16:9 and other aspect ratios, with style presets for cinematic, anime and documentary looks.",
    useCases: [
      "Short videos for social platforms (TikTok, Reels, Shorts)",
      "Product promo clips and ads",
      "Explainers and scene concepting",
      "Backgrounds and B-roll",
      "Creative experiments and storyboards",
    ],
    pricing: "20 credits per video — about 2 free videos with the 50-credit welcome bonus",
    cta: "Make your first AI video",
    href: "/tools/video",
  },
];

const keywordChips = [
  "free AI chat tool",
  "best AI image generator 2026",
  "AI writing assistant free",
  "free AI video generator text to video",
  "AI data analysis upload CSV",
  "AI article generator with SEO optimization",
  "AI essay writer free",
  "AI translation free",
  "AI tools no signup",
  "free AI tools no credit card",
  "AI tools 2026",
  "multi-model AI chat",
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Complete AI Tools Directory 2026",
  description:
    "Every AI tool available on zicisi.fun, categorized with use cases and credit pricing.",
  numberOfItems: categories.length,
  itemListElement: categories.map((category, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: category.name,
    url: `https://zicisi.fun${category.href}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://zicisi.fun" },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Tools Directory",
      item: "https://zicisi.fun/ai-tools-directory",
    },
  ],
};

export default function AiToolsDirectoryPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1 mb-5">
          <LayoutGrid className="h-3.5 w-3.5" />
          5 categories · every tool in one place
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Complete AI Tools Directory 2026
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
          The fastest way to find the right AI tool: a free AI chat tool, the best AI image
          generator 2026, a free AI writing assistant, AI data analysis and a free AI video
          generator text to video — every category below, one account, one credit balance.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 gap-2 px-8 text-sm font-semibold transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Get 50 free credits
          </Link>
          <a
            href="#categories"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card hover:bg-muted h-11 px-6 text-sm font-medium transition-colors"
          >
            <Search className="h-4 w-4 mr-1.5" />
            Browse categories
          </a>
        </div>
      </section>

      {/* Keyword chips */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4">
          People search for
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {keywordChips.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      {/* Category nav */}
      <nav className="flex flex-wrap justify-center gap-2 mb-12" aria-label="Tool categories">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </a>
        ))}
      </nav>

      {/* Category sections */}
      <section id="categories" className="space-y-10 mb-14">
        {categories.map((category) => (
          <article
            key={category.id}
            id={category.id}
            className="rounded-3xl border bg-card p-6 md:p-8 scroll-mt-20"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-sm font-medium text-primary mt-0.5">{category.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90 mb-5">
              {category.description}
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-5">
              <div className="rounded-2xl bg-muted/50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Popular use cases
                </h3>
                <ul className="space-y-2">
                  {category.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex flex-col">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
                  Pricing
                </h3>
                <p className="text-sm leading-relaxed flex-1">{category.pricing}</p>
              </div>
            </div>

            <Link
              href={category.href}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-5 text-sm font-semibold transition-colors"
            >
              {category.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>

      {/* How it works */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          How the directory&apos;s credit system works
        </h2>
        <div className="grid gap-4 md:grid-cols-4 text-center">
          {[
            {
              step: "1",
              title: "Sign in with Google",
              body: "Free, no credit card — 50 credits land instantly.",
            },
            {
              step: "2",
              title: "Pick any tool",
              body: "Each tool shows its credit cost up front: 1 for chat, 2 for writing, 3 for analysis, 8 for images, 20 for video.",
            },
            {
              step: "3",
              title: "Use it or lose it — never",
              body: "Credits never expire and there's no monthly reset.",
            },
            {
              step: "4",
              title: "Top up only if you want",
              body: "Packs from $1 (75 credits) with no auto-renewal, ever.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border bg-card p-5">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {item.step}
              </div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Your directory. Your balance. Every tool unlocked.
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          No category on this directory is locked behind a paid plan. The 50 free credits work on
          every tool listed above — try them all and keep the ones you love.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 gap-2 px-10 text-sm font-bold transition-all"
          >
            Sign in with Google
            <ArrowRight className="h-4 w-4" />
            50 free credits
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card hover:bg-muted h-12 px-8 text-sm font-medium transition-colors"
          >
            Read the AI tools FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
