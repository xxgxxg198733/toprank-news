"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, CreditCard, LogOut, LogIn } from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => router.push("/login")}>
        <LogIn className="h-3.5 w-3.5" />
        登录
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer">
          {(session.user.name || session.user.email || "U")[0].toUpperCase()}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-2">
          <p className="text-sm font-medium truncate">{session.user.name || "用户"}</p>
          <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="h-4 w-4 mr-2" /> 个人中心
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <CreditCard className="h-4 w-4 mr-2" /> 积分余额
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4 mr-2" /> 退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
