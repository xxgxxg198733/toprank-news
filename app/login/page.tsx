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
          <CardTitle className="text-2xl">Welcome to Zicisi AI</CardTitle>
          <CardDescription>Log in to access AI tools. Purchase credits to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            size="lg"
            onClick={() => signIn("google", { callbackUrl: "/tools/chat" })}
          >
            <Globe className="h-5 w-5 mr-2" />
            Sign in with Google
          </Button>
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              New users get <strong className="text-primary">20 free credits</strong> to try all tools.
              Purchase more credits via PayPal when needed.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
