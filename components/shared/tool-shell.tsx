"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Image, Pen, BarChart3, Video } from "lucide-react";
import type { ReactNode } from "react";

const tools = [
  { href: "/tools/chat", label: "AI 对话", icon: MessageCircle, desc: "多模型智能聊天" },
  { href: "/tools/image", label: "图片生成", icon: Image, desc: "文本转图片" },
  { href: "/tools/writing", label: "AI 写作", icon: Pen, desc: "文章改写翻译" },
  { href: "/tools/analysis", label: "数据分析", icon: BarChart3, desc: "文件智能分析" },
  { href: "/tools/video", label: "视频生成", icon: Video, desc: "AI 视频创作" },
];

export function ToolShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 max-w-6xl py-6">
      <div className="flex gap-6">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <nav className="sticky top-20 space-y-1">
            {tools.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <tool.icon className="h-4 w-4" />
                  <span>{tool.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Top nav — mobile */}
        <div className="lg:hidden w-full overflow-x-auto mb-4">
          <div className="flex gap-1 min-w-max">
            {tools.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  <tool.icon className="h-3.5 w-3.5" />
                  {tool.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
