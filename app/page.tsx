import Link from "next/link";
import { ArrowRight, MessageCircle, Image, Pen, BarChart3, Video, Sparkles, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    href: "/tools/chat",
    icon: MessageCircle,
    title: "AI Chat",
    desc: "Multi-model intelligent chat with DeepSeek, GPT, Claude, Gemini. Real-time streaming responses.",
    features: ["Multi-model switching", "Streaming output", "1 credit/msg"],
    color: "from-blue-500 to-blue-600",
  },
  {
    href: "/tools/image",
    icon: Image,
    title: "Image Generation",
    desc: "Create stunning images from text descriptions. Multiple styles and sizes supported.",
    features: ["Text to image", "Multiple styles", "8 credits/img"],
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/tools/writing",
    icon: Pen,
    title: "AI Writing",
    desc: "Article generation, content rewriting, multi-language translation, and SEO optimization.",
    features: ["Article generation", "Rewrite & polish", "2 credits/req", "SEO optimization"],
    color: "from-green-500 to-emerald-600",
  },
  {
    href: "/tools/analysis",
    icon: BarChart3,
    title: "Data Analysis",
    desc: "Upload CSV/Excel files. AI auto-analyzes trends, generates insights and charts.",
    features: ["File upload", "Trend analysis", "3 credits/report"],
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/tools/video",
    icon: Video,
    title: "Video Generation",
    desc: "Turn text ideas into dynamic videos with AI. Multiple styles and resolutions.",
    features: ["Text to video", "Multiple styles", "20 credits/video"],
    color: "from-cyan-500 to-blue-600",
  },
];

const features = [
  { icon: Sparkles, title: "Multi-Model Switching", desc: "Integrated DeepSeek, GPT, Claude, Gemini and more. Choose freely based on your needs." },
  { icon: Shield, title: "Data Security", desc: "Your API keys are server-side only. Never uploaded, shared, or used for any other purpose." },
  { icon: Zap, title: "Pay As You Go", desc: "Purchase credits via PayPal only when you need them. No subscription, no monthly fees." },
];

const faqs = [
  { q: "Is it free to use?", a: "You need to purchase credits to use the AI tools. The tools themselves don't charge per-use fees beyond the credits you buy — you're paying for the AI API usage." },
  { q: "Are my API keys safe?", a: "API keys are stored only in your environment variables. All AI requests are proxied through server-side API routes and never exposed to the frontend." },
  { q: "Which AI models are supported?", a: "Currently supporting Doubao, DeepSeek, OpenAI GPT, Anthropic Claude, Google Gemini, and more coming soon." },
  { q: "Do I need to register?", a: "Nope! Just sign in with Google, purchase credits, and you're ready to use all tools." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              All-in-One <span className="text-primary">AI Toolkit</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              An integrated collection of AI tools — Chat, Image Generation, Writing, Data Analysis, Video Creation.
              No subscription — purchase credits and pay as you go.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/chat" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-9 gap-1.5 px-8 text-sm font-medium transition-all">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted hover:text-foreground h-9 gap-1.5 px-8 text-sm font-medium transition-all">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Five AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${tool.color} text-white mb-3`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {tool.features.map((f) => (
                        <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      Try Now <ArrowRight className="inline h-3 w-3 ml-1" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Zicisi AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
