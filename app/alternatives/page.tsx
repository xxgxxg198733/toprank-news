import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  Minus,
  Star,
  TrendingDown,
  Zap,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best ChatGPT Alternatives in 2026 — Compared & Reviewed",
  description:
    "Best ChatGPT alternatives in 2026, tested and compared: Zicisi AI, DeepSeek, Claude, Gemini and Perplexity. Compare pricing, features and free tiers. Switch from ChatGPT and save $240/year with a $1 trial and 50 free credits.",
  keywords: [
    "ChatGPT alternatives",
    "best ChatGPT alternatives 2026",
    "ChatGPT alternative free",
    "ChatGPT alternative no subscription",
    "DeepSeek vs ChatGPT",
    "Claude vs ChatGPT",
    "Gemini vs ChatGPT",
    "AI chat without subscription",
    "ChatGPT cheaper alternative",
    "ChatGPT替代",
    "DeepSeek替代ChatGPT",
  ],
  alternates: {
    canonical: "https://zicisi.fun/alternatives",
  },
  openGraph: {
    title: "Best ChatGPT Alternatives in 2026 — Compared & Reviewed",
    description:
      "Six ChatGPT alternatives compared on price, features and free tiers. Zicisi AI's $1 trial + 50 free credits replaces a $20/month ChatGPT Plus plan — save $240/year.",
    url: "https://zicisi.fun/alternatives",
    type: "website",
    siteName: "Zicisi AI",
    locale: "en_US",
  },
};

const mainComparison = [
  {
    feature: "Entry price",
    zicisi: "$1 trial (75 credits)",
    chatgpt: "$20 / month (Plus)",
    claude: "$20 / month (Pro)",
    gemini: "$19.99 / month (Pro)",
  },
  {
    feature: "Free credits on sign-in",
    zicisi: "50 — no card required",
    chatgpt: "Free tier, rate-limited",
    claude: "Free tier, daily caps",
    gemini: "Free tier, limited",
  },
  {
    feature: "Subscription required?",
    zicisi: "No — pay-as-you-go",
    chatgpt: "Yes",
    claude: "Yes",
    gemini: "Yes",
  },
  {
    feature: "Chat models available",
    zicisi: "8 (GPT, Claude, DeepSeek, Gemini, Doubao)",
    chatgpt: "GPT family",
    claude: "Claude family",
    gemini: "Gemini family",
  },
  {
    feature: "AI image generation",
    zicisi: "Seedream 5.0, DALL·E 3, GPT Image 1, Imagen 4",
    chatgpt: "DALL·E / GPT Image",
    claude: "—",
    gemini: "Imagen",
  },
  {
    feature: "AI writing + SEO tools",
    zicisi: "Built-in (articles, rewrite, SEO)",
    chatgpt: "Chat prompts only",
    claude: "Chat prompts only",
    gemini: "Docs integration",
  },
  {
    feature: "Data analysis (CSV / Excel)",
    zicisi: "Built-in upload + auto charts",
    chatgpt: "File uploads",
    claude: "Long-context only",
    gemini: "File uploads",
  },
  {
    feature: "AI video generation",
    zicisi: "Built-in (Seedance)",
    chatgpt: "Not included",
    claude: "Not included",
    gemini: "Separate product",
  },
  {
    feature: "Credits / usage expire?",
    zicisi: "Never",
    chatgpt: "Monthly billing cycle",
    claude: "Monthly billing cycle",
    gemini: "Monthly billing cycle",
  },
];

const featureMatrix = [
  { feature: "Multi-model chat (switch mid-conversation)", zicisi: true, chatgpt: false, claude: false, gemini: false },
  { feature: "Pay-as-you-go (no subscription)", zicisi: true, chatgpt: false, claude: false, gemini: false },
  { feature: "Built-in image generation", zicisi: true, chatgpt: true, claude: false, gemini: true },
  { feature: "Built-in video generation", zicisi: true, chatgpt: false, claude: false, gemini: false },
  { feature: "Built-in writing / SEO assistant", zicisi: true, chatgpt: false, claude: false, gemini: false },
  { feature: "Upload-based data analysis", zicisi: true, chatgpt: true, claude: false, gemini: true },
  { feature: "Credits never expire", zicisi: true, chatgpt: false, claude: false, gemini: false },
  { feature: "$1 trial to test everything", zicisi: true, chatgpt: false, claude: false, gemini: false },
];

const reviews = [
  {
    name: "Zicisi AI",
    rating: "9.4 / 10",
    bestFor: "The best all-round ChatGPT alternative — one credit balance for every AI tool",
    verdict:
      "Zicisi AI replaces not just ChatGPT but also your image generator, writing tool, spreadsheet analyst and video maker. Eight chat models — GPT, Claude, DeepSeek, Gemini and Doubao — in one conversation, 50 free credits on sign-in, and a $1 trial. For most people this is the highest-value ChatGPT alternative in 2026.",
    pros: "8 chat models in one window; image + video + writing + data analysis built in; 50 free credits; $1 trial; no subscription",
    cons: "Newer platform; credit packs require a top-up once the free balance runs out",
  },
  {
    name: "DeepSeek",
    rating: "8.8 / 10",
    bestFor: "Free coding and math reasoning",
    verdict:
      "DeepSeek's open-weight models deliver frontier-level reasoning at near-zero cost, and its official web chat is free. It's especially strong at code, math and logic — and it's one of the models you can use inside Zicisi AI's chat for the same quality without the peak-hour hiccups.",
    pros: "Excellent reasoning; free official chat; open-source models; great for coding",
    cons: "Peak-hour availability issues; text-only chat; no image or video generation",
  },
  {
    name: "Claude (Anthropic)",
    rating: "9.0 / 10",
    bestFor: "Long-form writing and nuanced analysis",
    verdict:
      "Claude remains the benchmark for long-context writing — essays, reports, code review — with a 200K context window. The free tier is generous, but heavy users will hit daily caps and Pro's $20/month starts to add up. Use Claude inside Zicisi AI's multi-model chat to avoid a second subscription.",
    pros: "Best-in-class writing; huge context window; gentle, thoughtful tone",
    cons: "No built-in image generation; $20/month for Pro; daily caps on free tier",
  },
  {
    name: "Google Gemini",
    rating: "8.7 / 10",
    bestFor: "Google Workspace users and large-context research",
    verdict:
      "Gemini shines when embedded in your Google account — summarizing Gmail, drafting in Docs, searching the web. Its 1M-token context can swallow entire books. For standalone AI work, Gemini Pro's $19.99/month is hard to justify when a multi-model toolkit gives you the same model plus four others.",
    pros: "Deep Google integration; huge context window; free tier with image understanding",
    cons: "Verbose answers; Pro is another subscription; video generation sold separately",
  },
  {
    name: "Perplexity",
    rating: "8.2 / 10",
    bestFor: "Research and answers with citations",
    verdict:
      "Perplexity is the best search-first AI: answers with sources and live web results. It's a research companion, not a creative toolkit — no image or video generation, and Pro costs $20/month. For research it's great; for a full ChatGPT replacement you'll still need a second tool.",
    pros: "Cited, up-to-date answers; excellent for research; clean interface",
    cons: "Creates nothing but text; $20/month for Pro; no image or video tools",
  },
  {
    name: "Doubao (ByteDance)",
    rating: "8.5 / 10",
    bestFor: "Chinese-language content and native fluency",
    verdict:
      "Doubao is arguably the most fluent Chinese AI model, with a 256K context window and strong image generation via Seedream. For non-Chinese users it's less familiar — but it's one of the eight models you can switch to inside Zicisi AI's chat when a Chinese-native voice is exactly what you need.",
    pros: "Best-in-class Chinese fluency; huge context; Seedream image model",
    cons: "English experience less polished; access friction outside China",
  },
];

const faqs = [
  {
    q: "Is Zicisi AI a real ChatGPT alternative?",
    a: "Yes — and then some. Zicisi AI includes the same class of frontier models (GPT-5.1, Claude, DeepSeek, Gemini, Doubao) plus image generation, writing tools, data analysis and video generation. Everything runs on one credit balance with no subscription, and new accounts get 50 free credits to test all of it.",
  },
  {
    q: "How much can I save by switching from ChatGPT?",
    a: "ChatGPT Plus costs $20/month — $240/year. Zicisi AI gives you 50 free credits on sign-in, a $1 trial pack with 75 credits, and then pay-as-you-go packs from about $20 that last months for light users. Many users spend $20–45 per year instead of $240.",
  },
  {
    q: "Does the $1 trial auto-renew?",
    a: "No. Zicisi AI has no subscriptions at all. The $1 trial is a one-time pack of 75 credits. When you run out, you buy another pack if you want to — nothing is ever charged automatically.",
  },
  {
    q: "Can I still use GPT models on Zicisi AI?",
    a: "Yes. GPT-5.1, GPT-5 and GPT-4.1 are all available in the AI Chat tool, alongside Claude, DeepSeek, Gemini and Doubao. You can even switch models mid-conversation and keep the context.",
  },
  {
    q: "Which ChatGPT alternative is best for writing?",
    a: "Claude is the strongest pure writer, but it costs $20/month and has no image or video tools. Zicisi AI bundles Claude-class chat with a dedicated writing tool (articles, rewriting, translation, SEO) at 2 credits per request — the best value for writers.",
  },
  {
    q: "Which alternative is best for coding?",
    a: "DeepSeek is the standout for budget coding help, and GPT and Claude are both excellent all-rounders. Zicisi AI's multi-model chat lets you switch between all of them on the same problem without juggling tabs.",
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

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best ChatGPT Alternatives in 2026",
  itemListElement: reviews.map((review, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: review.name,
  })),
};

function MatrixCell({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/10">
      <Check className="h-3.5 w-3.5 text-emerald-500" />
    </span>
  ) : (
    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted">
      <Minus className="h-3.5 w-3.5 text-muted-foreground" />
    </span>
  );
}

export default function AlternativesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1 mb-5">
          <Sparkles className="h-3.5 w-3.5" />
          Updated for 2026 · tested hands-on
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Best ChatGPT Alternatives in 2026
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Six serious alternatives to ChatGPT, compared on price, models and features. Want the
          short version? <strong className="text-foreground">Zicisi AI replaces ChatGPT Plus —
          and your image, writing and video tools — for a fraction of the cost.</strong>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 gap-2 px-8 text-sm font-semibold transition-all"
          >
            Try Zicisi AI — $1 trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#reviews"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card hover:bg-muted h-11 px-6 text-sm font-medium transition-colors"
          >
            Read the mini-reviews
          </a>
        </div>
      </section>

      {/* Savings banner */}
      <section className="mb-14">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-primary/10 to-amber-500/10 border border-emerald-500/30 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 mb-3">
                <TrendingDown className="h-3.5 w-3.5" />
                The math nobody shows you
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                Switch from ChatGPT and save $240/year
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                ChatGPT Plus: $20 × 12 = <strong className="text-foreground">$240 every year</strong>.
                Zicisi AI: 50 free credits on sign-in, a $1 trial pack, then pay-as-you-go credits
                that never expire and never auto-renew. Most users spend less in a year than
                ChatGPT charges in one month.
              </p>
            </div>
            <div className="text-center shrink-0 rounded-2xl border bg-card px-8 py-6">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                ChatGPT Plus / year
              </div>
              <div className="text-4xl font-black text-red-500 line-through">$240</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-3 mb-1">
                Zicisi AI / year (typical)
              </div>
              <div className="text-4xl font-black text-emerald-500">$21</div>
              <div className="text-xs text-muted-foreground mt-2">
                $1 trial + one small pack
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main comparison table */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          ChatGPT vs the alternatives — the full comparison
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Zicisi AI is the only option here that combines every model family with image, writing,
          data and video tools — with no subscription and no auto-renewal.
        </p>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3.5 font-semibold">Feature</th>
                <th className="px-4 py-3.5 font-bold text-primary">Zicisi AI</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">ChatGPT</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">Claude</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">Gemini</th>
              </tr>
            </thead>
            <tbody>
              {mainComparison.map((row) => (
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
          Competitor pricing and features are approximate as of August 2026 and subject to change.
        </p>
      </section>

      {/* Feature matrix */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Feature comparison — who actually has what
        </h2>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3.5 font-semibold">Feature</th>
                <th className="px-4 py-3.5 font-bold text-primary">Zicisi AI</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">ChatGPT</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">Claude</th>
                <th className="px-4 py-3.5 font-semibold text-muted-foreground">Gemini</th>
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3"><MatrixCell value={row.zicisi} /></td>
                  <td className="px-4 py-3"><MatrixCell value={row.chatgpt} /></td>
                  <td className="px-4 py-3"><MatrixCell value={row.claude} /></td>
                  <td className="px-4 py-3"><MatrixCell value={row.gemini} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Pricing comparison — the $1 trial wins
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Every subscription asks you to commit before you can judge the product. The $1 trial
          (50 credits + 50% bonus = 75 credits) is the cheapest way to test a full AI toolkit.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative rounded-2xl border-2 border-amber-500 bg-amber-500/5 p-6 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
              Save $240/year
            </div>
            <h3 className="font-bold text-lg">Zicisi AI</h3>
            <p className="text-xs text-muted-foreground mb-3">Pay-as-you-go, no subscription</p>
            <div className="text-3xl font-extrabold mb-1">
              $1<span className="text-sm font-normal text-muted-foreground"> trial</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">50 credits + 50% bonus = 75 credits</p>
            <div className="text-sm mb-4 flex-1">
              <span className="inline-flex items-center gap-1 font-semibold">
                <Zap className="h-4 w-4 text-amber-500" /> Best for everyone
              </span>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-white h-9 text-sm font-medium transition-colors"
            >
              Start the $1 trial
            </Link>
          </div>

          <div className="rounded-2xl border bg-card p-6 flex flex-col">
            <h3 className="font-bold text-lg">ChatGPT Plus</h3>
            <p className="text-xs text-muted-foreground mb-3">OpenAI</p>
            <div className="text-3xl font-extrabold mb-1">
              $20<span className="text-sm font-normal text-muted-foreground"> / month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">$240 / year · auto-renews</p>
            <div className="text-sm text-muted-foreground mb-4 flex-1">
              One model family, no video, no dedicated writing tools.
            </div>
            <div className="text-center text-xs text-muted-foreground">Requires a subscription</div>
          </div>

          <div className="rounded-2xl border bg-card p-6 flex flex-col">
            <h3 className="font-bold text-lg">Claude Pro</h3>
            <p className="text-xs text-muted-foreground mb-3">Anthropic</p>
            <div className="text-3xl font-extrabold mb-1">
              $20<span className="text-sm font-normal text-muted-foreground"> / month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">$240 / year · auto-renews</p>
            <div className="text-sm text-muted-foreground mb-4 flex-1">
              Superb writing, but no image or video generation.
            </div>
            <div className="text-center text-xs text-muted-foreground">Requires a subscription</div>
          </div>

          <div className="rounded-2xl border bg-card p-6 flex flex-col">
            <h3 className="font-bold text-lg">Gemini Pro</h3>
            <p className="text-xs text-muted-foreground mb-3">Google</p>
            <div className="text-3xl font-extrabold mb-1">
              $19.99<span className="text-sm font-normal text-muted-foreground"> / month</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">~$240 / year · auto-renews</p>
            <div className="text-sm text-muted-foreground mb-4 flex-1">
              Best inside Google apps; video generation sold separately.
            </div>
            <div className="text-center text-xs text-muted-foreground">Requires a subscription</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Competitor pricing approximate as of August 2026. Zicisi AI pricing is fixed on the{" "}
          <Link href="/pricing" className="text-primary underline underline-offset-2">
            pricing page
          </Link>
          .
        </p>
      </section>

      {/* Mini-reviews */}
      <section id="reviews" className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Mini-reviews of every alternative
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          We use every tool on this list. Here&apos;s who each one is actually best for.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-2xl border bg-card p-6 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {review.name}
                  {review.name === "Zicisi AI" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5">
                      <BadgeCheck className="h-3 w-3" /> Our pick
                    </span>
                  )}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {review.rating}
                </span>
              </div>
              <p className="text-xs font-semibold text-primary mb-3">{review.bestFor}</p>
              <p className="text-sm leading-relaxed text-foreground/90 mb-4">{review.verdict}</p>
              <div className="mt-auto space-y-2 text-xs">
                <p className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 px-3 py-2">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Pros: </span>
                  {review.pros}
                </p>
                <p className="rounded-lg bg-red-500/5 border border-red-500/20 px-3 py-2">
                  <span className="font-semibold text-red-500">Cons: </span>
                  {review.cons}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Switching FAQ
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

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Test everything for $1 — or nothing, with 50 free credits
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Sign in with Google for 50 free credits. Love it? The $1 trial adds 75 more. Still
          curious? Compare GPT-5.1, Claude, DeepSeek and Gemini side by side in one conversation —
          the only way to know which model suits you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 gap-2 px-10 text-sm font-bold transition-all"
          >
            Sign in with Google — free
          </Link>
          <Link
            href="/tools/chat"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card hover:bg-muted h-12 px-8 text-sm font-medium transition-colors"
          >
            See the multi-model chat
          </Link>
        </div>
      </section>
    </div>
  );
}
