import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-sm mb-3">AI 工具</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/chat" className="hover:text-foreground transition-colors">AI 对话</Link></li>
              <li><Link href="/tools/image" className="hover:text-foreground transition-colors">图片生成</Link></li>
              <li><Link href="/tools/writing" className="hover:text-foreground transition-colors">AI 写作</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">更多工具</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/analysis" className="hover:text-foreground transition-colors">数据分析</Link></li>
              <li><Link href="/tools/video" className="hover:text-foreground transition-colors">视频生成</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">关于</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">关于我们</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">隐私政策</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">联系</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>zicisi.fun</span></li>
              <li><span>© 2026</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-4 text-center text-xs text-muted-foreground">
          © 2026 zicisi.fun — 一站式 AI 工具箱
        </div>
      </div>
    </footer>
  );
}
