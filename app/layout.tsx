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
    default: "Zicisi AI — 一站式 AI 工具箱",
    template: "%s | Zicisi AI",
  },
  description: "免费的在线 AI 工具集合：AI 对话、图片生成、写作助手、数据分析和视频生成。支持多个 AI 模型自由切换。",
  keywords: ["AI工具", "AI对话", "AI图片生成", "AI写作", "AI数据分析", "AI视频生成", "ChatGPT", "Claude", "DeepSeek"],
  openGraph: {
    title: "Zicisi AI — 一站式 AI 工具箱",
    description: "免费的在线 AI 工具集合：AI 对话、图片生成、写作助手、数据分析和视频生成。",
    url: "https://zicisi.fun",
    siteName: "Zicisi AI",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
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
