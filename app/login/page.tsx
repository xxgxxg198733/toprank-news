"use client";

import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-20">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">欢迎使用 Zicisi AI</CardTitle>
          <CardDescription>登录即可使用所有 AI 工具，新用户赠送 10 积分</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            size="lg"
            onClick={() => signIn("google", { callbackUrl: "/tools/chat" })}
          >
            <Globe className="h-5 w-5 mr-2" />
            使用 Google 账号登录
          </Button>
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              登录即送 <strong className="text-primary">10 积分</strong>，可用于所有 AI 工具。
              积分用完后可通过 PayPal 购买。
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
