import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Clapperboard,
  Code2,
  Briefcase,
  Presentation,
  Palette,
  Microscope,
  MessageCircle,
  Image,
  Pen,
  BarChart3,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools by Use Case — For Students, Creators, Developers & More",
  description:
    "Find the right AI tool for your job: essay writing and research for students, thumbnails and scripts for creators, code review for developers, marketing copy for small business, lesson plans for teachers, moodboards for designers and literature reviews for researchers.",
  keywords: [
    "AI tools for students",
    "AI for content creators",
    "AI tools for developers",
    "AI for small business",
    "AI for teachers",
    "AI tools for designers",
    "AI for researchers",
    "AI essay writing",
    "AI thumbnails",
    "AI code review",
    "AI lesson plans",
    "AI literature review",
  ],
  alternates: {
    canonical: "https://zicisi.fun/use-cases",
  },
  openGraph: {
    title: "AI Tools by Use Case — For Students, Creators, Developers & More",
    description:
      "Seven practical AI workflows: students, content creators, developers, small business, teachers, designers and researchers — each with the exact tools to use.",
    url: "https://zicisi.fun/use-cases",
    type: "website",
    siteName: "Zicisi AI",
  },
};

const sections = [
  {
    id: "students",
    icon: GraduationCap,
    title: "AI Tools for Students",
    intro:
      "From essays and research to study notes and math problems, AI gives students a tireless study partner. The key is using it to learn, not to bypass learning — draft with AI, then rewrite in your own words.",
    useCases: [
      {
        icon: Pen,
        title: "Essay Writing and Outlining",
        body:
          "Turn a vague assignment into a structured essay: ask the AI for a thesis, an outline and paragraph-by-paragraph drafts. Then revise each section in your own voice. The Writing tool generates, rewrites and polishes essays in one place.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: MessageCircle,
        title: "Research and Source Summarization",
        body:
          "Paste articles, chapters or lecture notes into a chat and get plain-language summaries, key arguments and study questions. Long-context models handle whole documents — perfect for reading-heavy courses.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: BarChart3,
        title: "Study Notes from Class Data",
        body:
          "Export grade spreadsheets, survey results or experiment data as CSV and let AI find trends, gaps and patterns — turning raw numbers into insight you can quote in papers and presentations.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
      {
        icon: MessageCircle,
        title: "Homework Help and Math Reasoning",
        body:
          "Reasoning models like DeepSeek work through math and logic problems step by step. Ask for the method, not just the answer — then verify by solving it yourself. Multi-model chat lets you compare approaches.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: Pen,
        title: "Translation of Academic Papers",
        body:
          "Reading a paper in another language? AI translates academic text accurately while preserving terminology. The Writing tool translates and rewrites, so foreign-language sources stop being a barrier.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
    ],
  },
  {
    id: "content-creators",
    icon: Clapperboard,
    title: "AI for Content Creators",
    intro:
      "Creators juggle thumbnails, scripts, captions, edits and analytics. AI handles the repetitive parts so you can focus on ideas and personality — the parts viewers actually subscribe for.",
    useCases: [
      {
        icon: Image,
        title: "YouTube Thumbnails in Seconds",
        body:
          "Describe the scene, emotion and style and get high-contrast thumbnail images with accurate text rendering. Generate a few variations and A/B test. Seedream-based generation nails the bold, readable look thumbnails need.",
        links: [{ href: "/tools/image", label: "Image Generation" }],
      },
      {
        icon: Pen,
        title: "Video Scripts and Hooks",
        body:
          "Turn a topic into a full script with a strong hook, pacing and a call to action. Generate the outline first, approve it, then draft section by section — then rewrite any section in your voice.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: Pen,
        title: "SEO Articles and Show Notes",
        body:
          "Draft SEO-optimized blog posts and show notes that push keywords naturally into titles, headings and meta descriptions. A 15-minute generation replaces an afternoon of typing.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: Video,
        title: "Short-Form Video Generation",
        body:
          "Describe a scene and generate an AI clip for shorts, b-roll or transitions. Multiple styles and resolutions mean you can match your channel's look without a camera or editor.",
        links: [{ href: "/tools/video", label: "Video Generation" }],
      },
      {
        icon: BarChart3,
        title: "Channel and Post Analytics",
        body:
          "Export watch-time, retention or engagement data as CSV and let AI surface the patterns — which topics repeat, what days perform, where viewers drop off — in plain language.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
    ],
  },
  {
    id: "developers",
    icon: Code2,
    title: "AI for Developers",
    intro:
      "AI won't replace developers, but developers using AI replace developers who don't. Use it for the parts of the job that are writing-shaped: reviews, docs, debugging and data spelunking.",
    useCases: [
      {
        icon: MessageCircle,
        title: "Code Review and Debugging",
        body:
          "Paste a function or a stack trace and get a structured review: edge cases, style issues, potential bugs and a suggested fix. Reasoning models like DeepSeek explain the why, not just the what.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: Pen,
        title: "Documentation and README Writing",
        body:
          "Feed the AI your code and let it produce API docs, READMEs and onboarding notes. The Writing tool drafts and rewrites so your docs stay current as code changes.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: MessageCircle,
        title: "Architecture and Algorithm Design",
        body:
          "Describe the problem — scale, constraints, tradeoffs — and compare solutions from different models. GPT, Claude, Gemini and DeepSeek each suggest different approaches; pick the best for your stack.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: BarChart3,
        title: "Log and Data Analysis",
        body:
          "Drop a CSV export of logs, metrics or user events into AI analysis and ask questions like which endpoint is slowest or which cohort churns. Charts and summaries come back instantly.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
    ],
  },
  {
    id: "small-business",
    icon: Briefcase,
    title: "AI for Small Business",
    intro:
      "Small teams have the same marketing, content and reporting load as big ones — but a fraction of the headcount. AI is the freelancer that never sleeps: copy, social posts, product visuals and data insights on demand.",
    useCases: [
      {
        icon: Pen,
        title: "Marketing Copy That Converts",
        body:
          "Turn a product description into landing page copy, email subject lines, ad variants and meta descriptions. Generate multiple angles, then A/B test the winners. Every request runs through the Writing tool.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: Pen,
        title: "Social Media Content at Scale",
        body:
          "One topic becomes a week of posts: a feed post, a carousel outline, a caption set and reply drafts — translated for multiple languages and platforms. Consistent voice, zero blank-page mornings.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: BarChart3,
        title: "Sales and Customer Data Analysis",
        body:
          "Upload sales CSVs, review exports or CRM data and get revenue trends, best sellers, seasonal patterns and anomalies — the numbers your next decision needs, explained in plain language.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
      {
        icon: Image,
        title: "Product Images and Mockups",
        body:
          "Generate product shots, packaging concepts and promotional imagery from text descriptions — no photoshoot or stock subscription required. Iterate on background, lighting and angle freely.",
        links: [{ href: "/tools/image", label: "Image Generation" }],
      },
      {
        icon: Video,
        title: "Promo Videos Without a Crew",
        body:
          "Turn a product highlight into a short promo clip with text-to-video generation. Match your brand style with preset styles and use the clip in ads, landing pages and social.",
        links: [{ href: "/tools/video", label: "Video Generation" }],
      },
    ],
  },
  {
    id: "teachers",
    icon: Presentation,
    title: "AI for Teachers",
    intro:
      "Lesson planning, differentiation, feedback and admin eat evenings and weekends. AI drafts the materials so teachers can spend their energy on the classroom — where it matters.",
    useCases: [
      {
        icon: Pen,
        title: "Lesson Plans and Handouts",
        body:
          "Describe the topic, grade level and time available, and get a structured lesson plan: objectives, activities, timing and homework. The Writing tool drafts and refines it until it fits your class.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: MessageCircle,
        title: "Quiz and Worksheet Generation",
        body:
          "Generate multiple-choice questions, short answers and vocabulary exercises from your lesson content — with answer keys and difficulty levels. Adapt the same content for different student levels.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: MessageCircle,
        title: "Grading Feedback Drafts",
        body:
          "Paste an assignment rubric and a student submission (anonymized) and get specific, constructive feedback you can personalize. AI drafts the comments; you add the human context.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: Pen,
        title: "Multilingual Materials",
        body:
          "Translate handouts, newsletters and permission slips into the languages your students' families speak. AI translation handles everyday classroom language reliably — just review before sending.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: BarChart3,
        title: "Grade and Assessment Analysis",
        body:
          "Upload grade spreadsheets and see class-wide patterns: which concepts need reteaching, which questions stumped everyone, and how cohorts compare — so interventions target the real gaps.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
    ],
  },
  {
    id: "designers",
    icon: Palette,
    title: "AI for Designers",
    intro:
      "AI is a first-draft machine for visual work: moodboards, variations and exploration happen in minutes, not days. It generates raw material — the designer's eye still shapes the final result.",
    useCases: [
      {
        icon: Image,
        title: "Moodboards and Style Exploration",
        body:
          "Describe a vibe — colors, textures, era, lighting — and generate a board of directions in one session. Seedream-quality output gives clients and teammates something concrete to react to.",
        links: [{ href: "/tools/image", label: "Image Generation" }],
      },
      {
        icon: Image,
        title: "Design Variations and Iterations",
        body:
          "Generate five visual variations of an idea and refine from there. Keep the prompt's core description stable while changing style keywords to explore options without redrawing by hand.",
        links: [{ href: "/tools/image", label: "Image Generation" }],
      },
      {
        icon: Image,
        title: "Upscaling and High-Resolution Output",
        body:
          "Generate at the resolution you need for print or large screens, and regenerate details until the image holds up at full size. No more pixelated concepts in client decks.",
        links: [{ href: "/tools/image", label: "Image Generation" }],
      },
      {
        icon: Pen,
        title: "Design Case Study Copy",
        body:
          "Draft the narrative behind your work: problem, process, outcome. The Writing tool turns your notes into a polished portfolio story or client presentation that matches the visual work.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: MessageCircle,
        title: "Critique and Alternatives",
        body:
          "Describe a layout or composition problem and get alternative approaches, spacing reasoning and accessibility checks. A second AI perspective often catches what long hours make invisible.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
    ],
  },
  {
    id: "researchers",
    icon: Microscope,
    title: "AI for Researchers",
    intro:
      "The literature scan, the data cleaning, the first draft — research is full of reading and writing-shaped bottlenecks. AI accelerates the process while you stay in control of the conclusions.",
    useCases: [
      {
        icon: MessageCircle,
        title: "Literature Review Assistance",
        body:
          "Paste abstracts, sections or full PDFs into a long-context chat and get structured summaries: key findings, methods, limitations and how sources relate. A conversation becomes a synthesis draft.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: BarChart3,
        title: "Research Data Analysis",
        body:
          "Upload experimental, survey or observational data as CSV and get descriptive statistics, trend detection and visualization suggestions — with the analysis steps explained so methods stay transparent.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
      {
        icon: MessageCircle,
        title: "Summarization of Long Documents",
        body:
          "Condense 50-page papers, grant guidelines or institutional reports into structured briefs with citations to the original passages, so nothing important gets lost in the compression.",
        links: [{ href: "/tools/chat", label: "AI Chat" }],
      },
      {
        icon: Pen,
        title: "Paper and Proposal Drafting",
        body:
          "Turn your notes and results into a structured draft — abstract, methods, results, discussion — then refine language and flow. AI drafts the scaffolding; you supply the insight.",
        links: [{ href: "/tools/writing", label: "AI Writing tool" }],
      },
      {
        icon: BarChart3,
        title: "Survey Response Analysis",
        body:
          "Upload raw survey exports and let AI cluster open-ended answers, compute distribution stats and flag surprising correlations — turning a spreadsheet of rows into findings you can present.",
        links: [{ href: "/tools/analysis", label: "Data Analysis" }],
      },
    ],
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Tools by Use Case",
  description: metadata.description,
  numberOfItems: sections.length,
  itemListElement: sections.map((section, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: section.title,
    description: section.intro,
    url: `https://zicisi.fun/use-cases#${section.id}`,
  })),
};

export default function UseCasesPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          AI Tools by Use Case
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Find the Right AI Tool for Your Job
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Seven practical workflows — for students, content creators, developers, small business,
          teachers, designers and researchers. Each one pairs a real task with the exact Zicisi AI
          tool that handles it.
        </p>
      </div>

      {/* Use case nav */}
      <nav className="flex flex-wrap justify-center gap-2 mb-12" aria-label="Use cases">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <section.icon className="h-4 w-4" />
            {section.title.replace("AI for ", "").replace("AI Tools for ", "")}
          </a>
        ))}
      </nav>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-14">
          <div className="flex items-start gap-3 mb-4">
            <div className="rounded-xl bg-primary/10 p-2.5 shrink-0">
              <section.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="text-muted-foreground mt-1 leading-relaxed">{section.intro}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            {section.useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-2xl border bg-card p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <useCase.icon className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="font-bold text-base leading-snug">{useCase.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 flex-1">{useCase.body}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {useCase.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Cross-links */}
      <section className="rounded-2xl border bg-muted/40 p-8">
        <h2 className="text-xl font-bold mb-4">Start with the Tools</h2>
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
          <Link href="/faq" className="font-medium hover:text-primary transition-colors">
            FAQ — 80+ AI questions answered
          </Link>
        </div>
      </section>
    </div>
  );
}
