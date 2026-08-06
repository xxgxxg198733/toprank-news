import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SessionProvider } from "@/components/layout/session-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zicisi AI — 免费在线AI工具箱 | AI聊天、生图、写作、数据分析、视频生成",
    template: "%s | Zicisi AI",
  },
  description: "Zicisi AI 一站式在线AI工具平台，免费使用AI聊天（DeepSeek/GPT/Claude/豆包）、AI图片生成、AI写作助手、AI数据分析和AI视频生成。多模型切换，按量付费，无需订阅。",
  keywords: [
    // 通用
    "免费AI工具", "在线AI工具箱", "AI工具网站", "一站式AI平台", "国内AI工具",
    // AI 聊天
    "AI聊天", "AI对话", "免费AI聊天", "DeepSeek聊天", "GPT免费使用", "Claude中文", "豆包AI", "多模型AI对话", "AI智能客服",
    // AI 图片
    "AI图片生成", "AI绘画", "文字转图片", "免费AI生图", "豆包Seedream", "DALL-E生图", "AI生成头像", "AI生成海报",
    // AI 写作
    "AI写作", "AI写文章", "AI写作助手", "AI改写", "AI翻译", "AI写公众号", "AI写文案", "AI写SEO文章",
    // AI 数据分析
    "AI数据分析", "AI分析Excel", "AI分析CSV", "上传表格AI分析", "AI数据可视化", "AI生成数据报告",
    // AI 视频
    "AI视频生成", "文字生成视频", "AI视频制作", "火山引擎视频", "豆包Seedance",
    // 模型品牌
    "ChatGPT", "Claude", "DeepSeek", "Gemini", "Doubao", "GPT-4", "OpenAI",
  ],
  openGraph: {
    title: "Zicisi AI — 免费在线AI工具箱 | 一站式AI聊天、生图、写作、数据分析",
    description: "Zicisi AI 一站式AI工具平台，支持DeepSeek、GPT、Claude、豆包等多模型。AI聊天、图片生成、写作助手、数据分析、视频生成。按量付费，无需订阅。",
    url: "https://zicisi.fun",
    siteName: "Zicisi AI",
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    canonical: "https://zicisi.fun",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster richColors />
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
