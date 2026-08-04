import Link from "next/link";
import { ArrowRight, MessageCircle, Image, Pen, BarChart3, Video, Sparkles, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    href: "/tools/chat",
    icon: MessageCircle,
    title: "AI 对话",
    desc: "多模型智能对话，支持 DeepSeek、GPT、Claude、Gemini，流式实时回复。",
    features: ["多模型切换", "流式输出", "对话历史保存"],
    color: "from-blue-500 to-blue-600",
  },
  {
    href: "/tools/image",
    icon: Image,
    title: "图片生成",
    desc: "用文字描述生成精美图片，支持多种风格和尺寸，AI 创意尽在指尖。",
    features: ["文生图", "多种风格", "高清输出"],
    color: "from-purple-500 to-pink-500",
  },
  {
    href: "/tools/writing",
    icon: Pen,
    title: "AI 写作",
    desc: "文章生成、内容改写、多语言翻译、SEO 优化，一站式写作助手。",
    features: ["文章生成", "改写润色", "翻译", "SEO 优化"],
    color: "from-green-500 to-emerald-600",
  },
  {
    href: "/tools/analysis",
    icon: BarChart3,
    title: "数据分析",
    desc: "上传 CSV/Excel 文件，AI 自动分析趋势、生成洞察报告和可视化图表。",
    features: ["文件上传", "趋势分析", "图表生成"],
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/tools/video",
    icon: Video,
    title: "视频生成",
    desc: "用 AI 将文字创意转化为动态视频，支持多种风格和分辨率。",
    features: ["文生视频", "多种风格", "在线预览"],
    color: "from-cyan-500 to-blue-600",
  },
];

const features = [
  { icon: Sparkles, title: "多模型自由切换", desc: "集成 DeepSeek、GPT、Claude、Gemini 等主流 AI 模型，根据需求自由选择。" },
  { icon: Shield, title: "数据安全保障", desc: "你的 API Key 仅保存在服务端，不上传、不分享、不用于任何其他用途。" },
  { icon: Zap, title: "无需注册即用", desc: "配置好 API Key 即可使用所有工具，无需注册账号，即开即用。" },
];

const faqs = [
  { q: "使用这些工具需要付费吗？", a: "工具本身完全免费，你只需要提供 AI 服务商的 API Key，费用直接按用量向服务商支付。" },
  { q: "我的 API Key 安全吗？", a: "API Key 仅保存在你配置的环境变量中，所有 AI 请求通过服务端 API 转发，不会暴露到前端。" },
  { q: "支持哪些 AI 模型？", a: "目前支持 DeepSeek、OpenAI GPT、Anthropic Claude、Google Gemini 等主流模型，更多模型持续接入中。" },
  { q: "需要注册账号吗？", a: "不需要！配置好 API Key 就可以直接使用，没有任何注册流程。" },
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
              一站式 <span className="text-primary">AI 工具箱</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              集成主流 AI 模型的在线工具集合 — 对话、图片生成、写作、数据分析、视频创作。
              无需注册，配置即用。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/chat" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-9 gap-1.5 px-8 text-sm font-medium transition-all">
                  开始使用 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#features" className="inline-flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted hover:text-foreground h-9 gap-1.5 px-8 text-sm font-medium transition-all">了解更多</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">五大 AI 工具</h2>
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
                      开始使用 <ArrowRight className="inline h-3 w-3 ml-1" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">为什么选择 Zicisi AI</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">常见问题</h2>
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
