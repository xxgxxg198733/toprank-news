import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Image, Pen, BarChart3, Video, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools FAQ — 80+ Common Questions Answered",
  description:
    "80+ AI tool questions answered: DeepSeek vs ChatGPT, free AI image generators without watermark, AI essay writers, CSV data analysis, text-to-video tools and more. Get fast, practical answers.",
  keywords: [
    "AI tools FAQ",
    "is DeepSeek free",
    "best free AI chatbot no signup",
    "best free AI image generator without watermark",
    "best AI essay writer free",
    "free AI video generator text to video",
    "AI data analysis upload CSV",
    "DeepSeek vs ChatGPT",
    "Seedream vs Midjourney",
    "AI tools questions answered",
  ],
  alternates: {
    canonical: "https://zicisi.fun/faq",
  },
  openGraph: {
    title: "AI Tools FAQ — 80+ Common Questions Answered",
    description:
      "DeepSeek pricing, free image generators, AI writers, CSV analysis, text-to-video — 80+ practical AI questions answered in one place.",
    url: "https://zicisi.fun/faq",
    type: "website",
    siteName: "Zicisi AI",
  },
};

const categories = [
  {
    id: "ai-chat",
    icon: MessageCircle,
    label: "AI Chat",
    intro:
      "Questions about AI chatbots, DeepSeek, ChatGPT, Claude and Gemini — pricing, limits, coding ability, context windows and streaming.",
    link: "/tools/chat",
    linkText: "Try multi-model AI chat",
    questions: [
      {
        q: "Is DeepSeek free?",
        a: "Yes. DeepSeek's official web chat is free to use, and DeepSeek's open-source models are free to download. You can also use DeepSeek inside Zicisi AI's AI Chat tool, where one credit covers a full conversation turn across any supported model.",
      },
      {
        q: "DeepSeek vs ChatGPT for coding — which is better?",
        a: "Both are excellent for coding, but they shine differently. DeepSeek is known for strong reasoning at a very low price and a generous free tier, while ChatGPT has a more mature ecosystem of plugins and tooling. Many developers keep both — which is easy with multi-model chat that lets you switch between DeepSeek, GPT, Claude and Gemini mid-conversation.",
      },
      {
        q: "What is the best free AI chatbot with no signup?",
        a: "Most capable chatbots require at least an email. A lightweight no-signup option is quickest for one-off questions. If you want persistent history, multiple models and no subscription, Zicisi AI's AI Chat lets you sign in once with Google and switch freely between DeepSeek, GPT, Claude and Gemini.",
      },
      {
        q: "What is AI chat with streaming responses?",
        a: "Streaming means the AI writes its reply word-by-word in real time instead of making you wait for the full response. It feels faster and lets you interrupt early if the answer is going the wrong direction. Zicisi AI's AI Chat streams responses by default across all supported models.",
      },
      {
        q: "How do I use a DeepSeek API key?",
        a: "Sign up at the DeepSeek platform, create an API key, and send requests to https://api.deepseek.com with the model name like deepseek-chat. For a key-free experience, use DeepSeek directly in a multi-model chat tool like Zicisi AI, which manages the API for you server-side.",
      },
      {
        q: "What is DeepSeek pricing per token?",
        a: "DeepSeek's API is famously cheap — roughly a tenth of the cost of comparable frontier models, with input tokens costing far less than output tokens. Exact per-token rates change periodically, so check the official DeepSeek pricing page. The official web chat remains free, and Zicisi AI's credits cover DeepSeek usage with no per-token math.",
      },
      {
        q: "What is the best AI for Chinese language?",
        a: "For Chinese, DeepSeek and Doubao (ByteDance) are widely considered top-tier for fluency, idioms and cultural nuance. They handle mixed Chinese-English prompts naturally. You can test both side by side in one conversation with Zicisi AI's multi-model chat.",
      },
      {
        q: "What is the DeepSeek context window size?",
        a: "DeepSeek's main chat models support a 64K token context window (some variants extend further), which is enough for long documents and multi-turn conversations. For context-heavy tasks like summarizing entire reports, models with 128K–200K windows such as Claude or Gemini are also available in Zicisi AI's chat.",
      },
      {
        q: "Does DeepSeek support images?",
        a: "DeepSeek's flagship chat model is text-based and does not natively accept image inputs, though it can analyze text descriptions of images. It also cannot generate images — that is what dedicated text-to-image models like Seedream are for. Pair DeepSeek chat with Zicisi AI's Image Generation tool for the full workflow.",
      },
      {
        q: "What is the DeepSeek rate limit on the free tier?",
        a: "The official DeepSeek web app throttles usage during peak hours and may show capacity warnings, though there is no hard daily cap for normal use. API usage is billed per token. In Zicisi AI, DeepSeek is available any time without peak-hour throttling — just spend a credit per conversation turn.",
      },
      {
        q: "What is the best AI chatbot for students?",
        a: "Students get the most from a chatbot with strong reasoning and long context. DeepSeek is great for math and budget-conscious users, Claude excels at essays and explanations, and GPT is a solid all-rounder. Multi-model chat lets students compare approaches to the same homework problem across all of them.",
      },
      {
        q: "Can AI chatbots write code?",
        a: "Yes. Modern chatbots generate, explain, review and debug code across most languages. DeepSeek and GPT are especially strong for code generation and algorithm work. Describe your bug or requirement in natural language and the AI will produce working code — then paste it back to ask for improvements.",
      },
      {
        q: "How do I switch between AI models in one chat?",
        a: "Multi-model chat platforms let you pick a model per message or per conversation. You can start with DeepSeek for quick reasoning and switch to Claude or GPT for long-form writing without losing context. That is the core workflow of Zicisi AI's AI Chat tool.",
      },
      {
        q: "Is Claude better than GPT for writing?",
        a: "Many writers prefer Claude for long-form prose, tone consistency and nuanced summaries, while GPT is praised for versatility and structured output. The best answer is to compare them on your own text — try both in one chat session and judge the results yourself.",
      },
      {
        q: "What is the Gemini context window?",
        a: "Google Gemini models offer some of the largest context windows in the industry, ranging from 128K up to 1M tokens on certain variants — enough to process entire books or large codebases in one go. That makes Gemini a strong choice for big-document tasks inside a multi-model chat.",
      },
      {
        q: "How can I chat with AI in Chinese?",
        a: "All major models handle Chinese well, but DeepSeek and Doubao are the most natural for everyday Chinese. You can mix English and Chinese in the same prompt. In Zicisi AI's AI Chat, switch to DeepSeek or Doubao for the most fluent Chinese conversations.",
      },
      {
        q: "What is the best free alternative to ChatGPT Plus?",
        a: "The best free alternatives include DeepSeek's web chat, Google Gemini's free tier, Claude's free plan, and multi-model platforms like Zicisi AI where one free conversation credit system gives you access to all of them without a subscription.",
      },
      {
        q: "How do I get AI answers in real time?",
        a: "Enable streaming responses in your chat tool so tokens appear as they are generated. Pair this with a fast reasoning model like DeepSeek and you get near-instant answers. Zicisi AI's AI Chat streams by default for the fastest possible feel.",
      },
      {
        q: "Which AI model is best for math problems?",
        a: "Reasoning-focused models like DeepSeek-R1 and the advanced GPT and Claude reasoning variants lead the pack for step-by-step math. Show your work to the AI, ask it to do the same, and verify each step — a workflow that works well in any multi-model chat.",
      },
      {
        q: "Can I use multiple AI models in one app?",
        a: "Yes. Multi-model platforms consolidate DeepSeek, GPT, Claude, Gemini and Doubao under one interface so you never juggle tabs or subscriptions. Zicisi AI's AI Chat is built exactly around this — pick the right model for each question.",
      },
    ],
  },
  {
    id: "ai-image-generation",
    icon: Image,
    label: "AI Image Generation",
    intro:
      "Text-to-image questions: free generators without watermarks, Seedream vs Midjourney, commercial use, Chinese prompts, styles and upscaling.",
    link: "/tools/image",
    linkText: "Try AI image generation",
    questions: [
      {
        q: "What is the best free AI image generator without watermark?",
        a: "Seedream (ByteDance) delivers exceptional quality at no watermark, and Zicisi AI's Image Generation tool lets you generate with Seedream and other top models for just 8 credits per image — no watermark on anything you create.",
      },
      {
        q: "How do I get AI text-to-image in high resolution?",
        a: "Choose a generator that supports high-res output or upscale after generation. Seedream produces detailed, high-resolution images natively, and platforms like Zicisi AI offer multiple output sizes so you can render at the resolution your project needs.",
      },
      {
        q: "Seedream vs Midjourney — which has better quality?",
        a: "Midjourney is beloved for artistic aesthetics, but requires a paid subscription and a Discord workflow. Seedream delivers comparable — often sharper — results, supports Chinese prompts natively, and is free or credit-based, making it the better value for most users in 2026.",
      },
      {
        q: "What is Volcano Engine image generation pricing?",
        a: "Volcano Engine (ByteDance's cloud) bills image models like Seedream per generated image, with prices varying by model tier and resolution. For most users, using a platform that bundles Seedream with a simple credit system — like Zicisi AI at 8 credits per image — is easier than managing cloud bills.",
      },
      {
        q: "Can I use AI-generated images for commercial use?",
        a: "Most major models, including Seedream and Zicisi AI's generation tools, allow commercial use of generated images. Always check the specific terms of the model or platform you use — and avoid generating trademarked characters for commercial products.",
      },
      {
        q: "Can AI image generators understand Chinese prompts?",
        a: "Yes. Models like Seedream and Doubao were trained with heavy Chinese data and follow Chinese prompts accurately — including idioms and cultural references that English-first models often mangle. Zicisi AI's Image Generation supports Chinese and English prompts.",
      },
      {
        q: "What is the best AI art generator for beginners in 2026?",
        a: "The best beginner pick is a straightforward web tool with style presets, no Discord, and no subscription. Seedream-based generators like Zicisi AI's Image Generation give beginners professional-looking results from a simple text box in seconds.",
      },
      {
        q: "What is an AI image generator with style reference?",
        a: "Style reference lets you feed the AI one or more example images and generate new images in the same aesthetic. It is ideal for brand consistency and character design. Look for generators that accept reference images alongside text prompts.",
      },
      {
        q: "How do I write good AI image prompts?",
        a: "Structure prompts as subject + action + environment + style + details. Example: a red fox reading a book in a cozy library, warm lighting, oil painting. Specify composition, lighting and camera style for photo prompts. Describe your scene and Zicisi AI will generate it.",
      },
      {
        q: "Is there a free unlimited AI image generator?",
        a: "Truly unlimited free generation is rare because image models cost more to run than chatbots. The practical answer is a credit-based platform like Zicisi AI where you control spending per image, or free tiers with daily limits on major platforms.",
      },
      {
        q: "How much does AI image generation cost?",
        a: "Costs vary wildly: free tiers exist, Midjourney starts around $10/month, and API pricing is per image. On Zicisi AI, an image costs 8 credits — for example, 800 images on a $10 credit pack, making it one of the cheapest quality options around.",
      },
      {
        q: "What is Seedream 3.0?",
        a: "Seedream 3.0 is ByteDance's latest text-to-image model generation, known for strong Chinese text rendering, prompt adherence and photorealistic detail at a fraction of the cost of comparable closed models. It is the engine behind Zicisi AI's Image Generation.",
      },
      {
        q: "What is the best AI image generator for YouTube thumbnails?",
        a: "The best thumbnail generator produces bold, high-contrast images with accurate text rendering and strong composition at 16:9. Seedream handles text in images unusually well, making Zicisi AI's Image Generation a strong choice for thumbnail creators.",
      },
      {
        q: "Can AI generate product images from text?",
        a: "Yes — describe the product, background and lighting and the AI renders a studio-quality shot. This works especially well for concept mockups, e-commerce listings and social posts. Generate product shots with Zicisi AI and iterate until the angle matches your vision.",
      },
      {
        q: "Is there an AI image generator that doesn't use Discord?",
        a: "Yes. Unlike Midjourney, most modern generators are plain web tools. Zicisi AI's Image Generation runs entirely in the browser — no Discord, no server invites, just a text box and your prompt.",
      },
      {
        q: "What is the best aspect ratio for AI images?",
        a: "Match the ratio to the platform: 16:9 for videos and thumbnails, 4:3 for presentations and slides, 1:1 for social feeds, 3:4 for Pinterest and portrait content. Zicisi AI's Image Generation supports multiple sizes so you can render the exact ratio you need.",
      },
      {
        q: "How can I upscale AI images for free?",
        a: "Re-generate at a higher resolution, or use an upscaler if your generator includes one. Some tools bundle upscaling with generation — check whether your platform offers 2K or 4K output directly, which avoids the upscale step entirely.",
      },
      {
        q: "Is there an AI art generator with no monthly fee?",
        a: "Yes. Pay-as-you-go platforms avoid monthly subscriptions entirely. Zicisi AI sells credit packs with no recurring fee — buy credits once, generate images, and never pay again until you want to. That beats any subscription for light usage.",
      },
      {
        q: "Which AI image model is best for photorealism?",
        a: "Seedream, Flux and the latest Midjourney versions all produce stunning photorealism. Seedream stands out for combining realism with accurate Chinese prompts and cheap credits. Try the same photo prompt on a couple of models in Zicisi AI and compare.",
      },
      {
        q: "How do I generate consistent character images with AI?",
        a: "Keep the character description identical in every prompt — same appearance, outfit, style keywords — and use a reference image if your tool supports it. Stable style reference settings produce recognizable recurring characters across a series of images.",
      },
    ],
  },
  {
    id: "ai-writing",
    icon: Pen,
    label: "AI Writing",
    intro:
      "Writing assistant questions: essay writers, SEO article generators, human-like rewriting, translation, paraphrasing and marketing copy.",
    link: "/tools/writing",
    linkText: "Try AI writing tools",
    questions: [
      {
        q: "What is the best free AI essay writer?",
        a: "ChatGPT, Claude and DeepSeek all write strong essays for free. For structure — outline, thesis, paragraphs, citations — a dedicated writing tool adds templates and polish. Zicisi AI's Writing tool bundles generation, rewriting and SEO optimization under one credit system.",
      },
      {
        q: "What is an AI article generator with SEO optimization?",
        a: "It drafts complete articles while suggesting target keywords for titles, headings and body copy. The best workflow: generate the draft, then use an SEO checklist to refine. Zicisi AI's Writing tool includes article generation and SEO optimization in one place.",
      },
      {
        q: "How do I make AI rewriting sound human-like?",
        a: "Provide context, ask for a natural conversational tone, and add your own anecdotes and sentence rhythms. Rewrite tools that take a draft and rephrase it usually beat generating from scratch. Use Zicisi AI's rewrite feature to vary wording while keeping meaning intact.",
      },
      {
        q: "What is the best AI translation tool in 2026?",
        a: "For general text, DeepSeek and Doubao handle Chinese-English exceptionally well, while GPT and Claude excel at nuanced creative translation. A writing tool with translation built in — like Zicisi AI's — lets you switch languages without switching apps.",
      },
      {
        q: "What is an AI blog post writer with keywords?",
        a: "It generates SEO-ready blog posts by weaving your target keywords into titles, headings, meta descriptions and body text naturally. It saves hours per post. Start with a keyword list and let Zicisi AI's Writing tool draft the full article.",
      },
      {
        q: "Is there a free SEO content generator AI?",
        a: "Yes. Free tiers of ChatGPT and Claude can produce SEO-optimized drafts if you give them a keyword brief. Zicisi AI's Writing tool wraps generation, rewriting and SEO optimization together, and a single credit covers a full request.",
      },
      {
        q: "What is the best AI paraphrasing tool for academic work?",
        a: "Look for tools that keep citations intact and avoid over-stuffing synonyms. Claude and GPT handle academic paraphrasing intelligently. Always keep your original sources and check for plagiarism after paraphrasing — the AI changes wording, not factual attribution.",
      },
      {
        q: "What is a multilingual AI writing assistant?",
        a: "It generates and rewrites content across many languages with native-level fluency — Chinese, English, Spanish, Japanese and more. Zicisi AI's Writing tool is multilingual, so you can draft, translate and polish content in one place.",
      },
      {
        q: "What is the best AI copywriting tool for marketing?",
        a: "The best tool turns a product description into ad copy, landing pages, email subject lines and social posts. DeepSeek and GPT are strong raw engines; Zicisi AI's Writing tool adds templates and polish so your copy is ready to publish.",
      },
      {
        q: "What is the best AI writing tool for students?",
        a: "Students benefit most from tools that outline, draft, explain and cite. Claude is excellent at nuanced essays, DeepSeek at math and reasoning, and a combined platform gives you both plus rewriting — all on one credit balance in Zicisi AI.",
      },
      {
        q: "How do I use AI for SEO writing?",
        a: "Feed the AI a keyword cluster, title options and a target reader, then ask for an outline first. Approve the structure, generate the draft, and refine headings and meta descriptions. Zicisi AI's Writing tool includes SEO optimization as a built-in step.",
      },
      {
        q: "Can AI write a 5,000-word article?",
        a: "Yes, but generate it in sections to keep quality high and context stable. Draft an outline, write 500–800 words per section, then stitch and smooth transitions. This section-by-section method with Zicisi AI's Writing tool produces long-form content reliably.",
      },
      {
        q: "What is the best AI for rewriting Chinese text?",
        a: "DeepSeek and Doubao are the strongest for Chinese rewriting — they preserve tone, idioms and cultural nuance better than English-first models. Use them through Zicisi AI's Writing tool to polish or vary Chinese copy without losing the original voice.",
      },
      {
        q: "Can AI write in my own style?",
        a: "Yes, if you teach it your patterns: show it 2–3 examples of your writing and tell it what to copy — sentence length, tone, formatting habits. Rewriting your own drafts in your voice is the most reliable approach with any AI writer.",
      },
      {
        q: "How many words can AI generate at once?",
        a: "Most models comfortably produce 500–2,000 quality words per request, limited by context and output caps. For longer pieces, generate section by section. Zicisi AI's Writing tool handles per-request generation plus rewriting so you can extend drafts progressively.",
      },
      {
        q: "Is there a free AI writer with no word limit?",
        a: "Word limits are practical necessities for all AI platforms — output is capped per request, not per day. DeepSeek's web chat is among the most generous. For structured long-form work, Zicisi AI's credit-based Writing tool avoids subscription word caps entirely.",
      },
      {
        q: "What is the best AI for academic paraphrasing?",
        a: "GPT and Claude give the most natural academic paraphrases, and DeepSeek is a strong free alternative. Rewrite sentence by sentence, keep technical terms intact, and verify against the original. Zicisi AI's Writing tool rewrites in one click with your choice of tone.",
      },
      {
        q: "How accurate is AI translation compared to human translation?",
        a: "AI matches human quality for everyday and technical text, and keeps improving on creative nuance. For legal, medical or literary work, human review remains essential. Use AI for speed and consistency, then have a bilingual editor review — Zicisi AI can translate then you polish.",
      },
      {
        q: "How can I make AI content pass originality checks?",
        a: "Originality comes from your input: add your own experience, data and examples, then rewrite AI drafts in your voice. Avoid prompt boilerplate that thousands of users share. Rewriting with Zicisi AI after adding your perspective yields genuinely original content.",
      },
      {
        q: "What are the best AI writing tools for bloggers in 2026?",
        a: "The strongest stack is a reasoning chatbot for outlines (DeepSeek or Claude), an SEO-aware writer for drafts, and a rewriter for variations. Zicisi AI combines all three in one credit system — generate, optimize and rewrite without switching tabs.",
      },
    ],
  },
  {
    id: "ai-video-analysis",
    icon: Video,
    label: "AI Video & Data Analysis",
    intro:
      "Text-to-video and data questions: free video generators, CSV and spreadsheet analysis, pricing, video length, charts and non-technical workflows.",
    link: "/tools/video",
    linkText: "Try AI video generation",
    questions: [
      {
        q: "What is a free AI video generator for text to video?",
        a: "Text-to-video generators turn a sentence into a short animated clip in seconds. Volcano Engine's video models deliver strong quality, and Zicisi AI's Video Generation tool makes them available for 20 credits per video — free to try with new-account credits.",
      },
      {
        q: "How do I analyze data by uploading a CSV to AI?",
        a: "Upload your CSV or Excel file to an AI analysis tool and it inspects columns, finds trends, flags anomalies and explains everything in plain language. Zicisi AI's Data Analysis tool does exactly this — upload, ask questions, get charts and insights.",
      },
      {
        q: "What is the best AI spreadsheet analyzer?",
        a: "The best analyzers read your file, summarize what matters and answer follow-up questions without formula skills. Zicisi AI's Data Analysis handles CSV and Excel uploads, generates charts automatically and explains each finding in plain language.",
      },
      {
        q: "Is there an AI text-to-video tool with a free trial?",
        a: "Many video platforms offer starter credits rather than time-limited trials. Zicisi AI includes video generation at 20 credits per clip with every credit purchase — no subscription, so you only pay for what you actually generate.",
      },
      {
        q: "What is Volcano Engine video generation pricing?",
        a: "Volcano Engine bills video models per generated clip, with price varying by model, resolution and length. For most users, a bundled credit system like Zicisi AI (20 credits per video) is far easier to budget than metered cloud billing.",
      },
      {
        q: "What is a free AI data visualization tool?",
        a: "The fastest way to get charts from raw data is an AI analysis tool that renders visuals automatically. Zicisi AI's Data Analysis generates trend lines, bar charts and summaries from your upload, so you never touch chart software.",
      },
      {
        q: "How do I generate AI videos longer than 10 seconds?",
        a: "Most text-to-video models generate clips of a few seconds per generation. To go longer, generate multiple clips from a consistent scene description and stitch them. Some platforms support longer generations at higher credit costs — check the tool's clip length options.",
      },
      {
        q: "Can AI analyze Excel files?",
        a: "Yes. Upload .xlsx or .csv files and the AI reads sheets, columns and formulas, then answers questions about totals, trends and outliers. Zicisi AI's Data Analysis accepts both formats and produces charts plus written insights.",
      },
      {
        q: "What is the best AI for analyzing survey data?",
        a: "Any model with strong data reasoning works, but upload-based tools are fastest: they ingest the raw responses and cluster themes, compute percentages and summarize open-ended answers. That is the workflow Zicisi AI's Data Analysis tool is built for.",
      },
      {
        q: "Is there a free AI video generator without watermark?",
        a: "Watermark-free generation is a differentiator — many free tools stamp their logo on output. Zicisi AI's Video Generation produces clean, watermark-free videos with every credit purchase, and new accounts get starter credits to test it.",
      },
      {
        q: "How do I make AI videos with a Chinese voiceover?",
        a: "Generate the visuals first, then add narration from a TTS tool that supports Chinese. For scene description, write prompts in Chinese if your generator understands it. Combine Zicisi AI's Video Generation with a Chinese TTS for a full pipeline.",
      },
      {
        q: "Which AI model is good for data analysis?",
        a: "Reasoning models like DeepSeek and GPT excel at data analysis — they can compute, explain methodology and catch edge cases. For file uploads, Zicisi AI's Data Analysis bundles a capable model with automatic chart generation, so you do not need prompt expertise.",
      },
      {
        q: "How do I create charts from data with AI?",
        a: "Upload your data and ask for the chart you want — line for trends, bar for comparison, pie for composition. The AI selects, builds and labels the visualization for you. Zicisi AI's Data Analysis renders charts automatically from your file.",
      },
      {
        q: "How long does AI video generation take?",
        a: "Typical clips take one to a few minutes depending on length, resolution and model load — far faster than filming and editing. You can queue multiple generations and check back. Zicisi AI shows generation progress in the tool.",
      },
      {
        q: "What is a free AI tool to summarize spreadsheets?",
        a: "Upload the spreadsheet and ask for a plain-language summary: what the data shows, key trends and anything unusual. Zicisi AI's Data Analysis produces both a written summary and charts from CSV or Excel files at 3 credits per report.",
      },
      {
        q: "What resolution options do AI video generators offer?",
        a: "Most platforms offer 720p to 1080p, with some reaching higher. Higher resolution costs more credits per video. For social clips, 1080p is the sweet spot — match your platform's requirements when picking a resolution in Zicisi AI's Video Generation.",
      },
      {
        q: "Can AI generate videos with subtitles?",
        a: "Some generators burn in subtitles directly; otherwise add them in any editor. If your video includes speech or scene text, describe that in the prompt and check the output. Pair Zicisi AI video clips with a simple editor for subtitles.",
      },
      {
        q: "What is the best free AI for data insights?",
        a: "The best free data AI reads your file and explains findings in plain language without statistics training. Zicisi AI's Data Analysis costs just 3 credits per report — new accounts get starter credits, making the first few analyses effectively free.",
      },
      {
        q: "Is AI data analysis easy for non-technical users?",
        a: "Yes — that is the point. You upload a file, ask questions in plain English (or Chinese), and get answers and charts back. No SQL, no pivot tables. Zicisi AI's Data Analysis is designed for non-technical users from the first upload.",
      },
      {
        q: "How do I choose the right AI video style?",
        a: "Match the style to your audience: cinematic for product films, anime or cartoon for entertainment, documentary for education. Most generators, including Zicisi AI's Video Generation, offer style presets so you can preview and pick before generating.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((category) =>
    category.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          AI Tools FAQ
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          AI Tools FAQ — 80+ Questions Answered
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Practical answers to the questions we hear most about AI chat, image generation, AI
          writing, data analysis and text-to-video tools — updated for 2026.
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Updated August 2026 · 80+ questions across 4 categories
        </p>
      </div>

      {/* Category nav */}
      <nav className="flex flex-wrap justify-center gap-2 mb-12" aria-label="FAQ categories">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <cat.icon className="h-4 w-4" />
            {cat.label}
          </a>
        ))}
      </nav>

      {categories.map((category) => (
        <section key={category.id} id={category.id} className="mb-14">
          <div className="flex items-start gap-3 mb-2">
            <div className="rounded-xl bg-primary/10 p-2.5 shrink-0">
              <category.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{category.label} Questions</h2>
              <p className="text-muted-foreground mt-1">{category.intro}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 mt-6">
            {category.questions.map((item) => (
              <div key={item.q} className="rounded-2xl border bg-card p-5 flex flex-col">
                <h3 className="font-bold text-base leading-snug mb-2">{item.q}</h3>
                <p className="text-sm leading-relaxed text-foreground/90 flex-1">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={category.link}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 text-sm font-medium transition-colors"
            >
              {category.linkText}
              <ChevronDown className="h-4 w-4 rotate-270" />
            </Link>
          </div>
        </section>
      ))}

      {/* Cross-links */}
      <section className="rounded-2xl border bg-muted/40 p-8">
        <h2 className="text-xl font-bold mb-4">Explore the AI Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <Link href="/tools/chat" className="font-medium hover:text-primary transition-colors">
            AI Chat — DeepSeek, GPT, Claude, Gemini
          </Link>
          <Link href="/tools/image" className="font-medium hover:text-primary transition-colors">
            Image Generation — Seedream text-to-image
          </Link>
          <Link href="/tools/writing" className="font-medium hover:text-primary transition-colors">
            AI Writing — Articles, rewrite, SEO
          </Link>
          <Link href="/tools/analysis" className="font-medium hover:text-primary transition-colors">
            Data Analysis — Upload CSV & Excel
          </Link>
          <Link href="/tools/video" className="font-medium hover:text-primary transition-colors">
            Video Generation — Text-to-video
          </Link>
          <Link href="/use-cases" className="font-medium hover:text-primary transition-colors">
            Use Cases — AI for students, creators & more
          </Link>
        </div>
      </section>
    </div>
  );
}
