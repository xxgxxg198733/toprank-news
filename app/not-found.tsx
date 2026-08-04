import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-20">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">页面未找到</h2>
        <p className="text-muted-foreground mb-8">
          这个页面可能已被移除或地址有误。我们已从 TopRank 内容站升级为 AI 工具箱。
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-8 gap-1.5 px-2.5 text-sm font-medium transition-all">
            <Home className="mr-2 h-4 w-4" /> 返回首页
        </Link>
      </div>
    </div>
  );
}
