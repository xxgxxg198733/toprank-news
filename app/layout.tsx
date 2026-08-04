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
    default: "Zicisi AI — All-in-One AI Toolkit",
    template: "%s | Zicisi AI",
  },
  description: "Free online AI tools: Chat, Image Generation, Writing Assistant, Data Analysis, and Video Creation. Multi-model support.",
  keywords: ["AI tools", "AI chat", "AI image generator", "AI writing", "AI data analysis", "AI video", "ChatGPT", "Claude", "DeepSeek", "Doubao"],
  openGraph: {
    title: "Zicisi AI — All-in-One AI Toolkit",
    description: "Free online AI tools: Chat, Image Generation, Writing Assistant, Data Analysis, and Video Creation.",
    url: "https://zicisi.fun",
    siteName: "Zicisi AI",
    locale: "en_US",
    type: "website",
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
