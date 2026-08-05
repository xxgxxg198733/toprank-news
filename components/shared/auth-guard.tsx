"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogIn, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  /** Custom message shown to unauthenticated users */
  message?: string;
  /** Custom description */
  description?: string;
}

export function AuthGuard({
  children,
  message = "请登录后使用此工具",
  description = "注册即送 20 免费积分，解锁全部 AI 工具",
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state — show skeleton while checking session
  if (status === "loading") {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  // Not logged in — show friendly prompt
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">{message}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        <div className="flex gap-3">
          <Button onClick={() => router.push("/login")} size="lg">
            <LogIn className="h-4 w-4 mr-2" />
            登录 / 注册
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push("/pricing")}>
            查看积分方案
          </Button>
        </div>
      </div>
    );
  }

  // Authenticated — render children
  return <>{children}</>;
}
