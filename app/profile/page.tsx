"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, History, ShoppingCart, Loader2 } from "lucide-react";

const PACKAGES = [
  { id: "basic", credits: 100, price: 5, name: "基础包" },
  { id: "standard", credits: 500, price: 20, name: "标准包" },
  { id: "premium", credits: 1500, price: 50, name: "高级包" },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<unknown[]>([]);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/credits")
        .then((r) => r.json())
        .then((data) => {
          setBalance(data.balance);
          setTransactions(data.transactions || []);
        })
        .catch(() => setError("获取积分信息失败"));
    }
  }, [status, router]);

  const handleBuy = async (pkgId: string) => {
    setBuying(true);
    setError("");
    try {
      // Create PayPal order
      const orderRes = await fetch("/api/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create-order", pkg: pkgId }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        setError(err.error || "创建订单失败");
        setBuying(false);
        return;
      }

      const { orderId } = await orderRes.json();

      // In production, redirect to PayPal checkout
      // For now, simulate capture
      const captureRes = await fetch("/api/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "capture-order", orderId }),
      });

      if (!captureRes.ok) {
        setError("支付确认失败");
        setBuying(false);
        return;
      }

      const result = await captureRes.json();
      setBalance(result.balance);
      // Refresh transactions
      const creditsRes = await fetch("/api/credits");
      const creditsData = await creditsRes.json();
      setTransactions(creditsData.transactions || []);
    } catch {
      setError("支付失败，请重试");
    } finally {
      setBuying(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 space-y-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const creditUsageCosts = [
    { tool: "AI 对话", cost: "1 积分/次" },
    { tool: "AI 写作", cost: "2 积分/次" },
    { tool: "数据分析", cost: "3 积分/次" },
    { tool: "图片生成", cost: "5 积分/次" },
    { tool: "视频生成", cost: "10 积分/次" },
  ];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>
      )}

      {/* Credit balance */}
      <Card className="mb-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">积分余额</p>
              <p className="text-4xl font-extrabold text-primary">
                {balance !== null ? balance : "..."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">新用户注册赠送 10 积分</p>
            </div>
            <div className="text-right">
              <Coins className="h-10 w-10 text-primary/50 ml-auto" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buy credits */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" /> 购买积分
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {PACKAGES.map((pkg) => (
              <Button
                key={pkg.id}
                variant="outline"
                className="h-auto py-4 flex flex-col gap-1"
                disabled={buying}
                onClick={() => handleBuy(pkg.id)}
              >
                <span className="text-lg font-bold text-primary">{pkg.credits}</span>
                <span className="text-xs text-muted-foreground">积分</span>
                <Badge variant="secondary" className="mt-1">${pkg.price}</Badge>
              </Button>
            ))}
          </div>
          {buying && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> 正在处理 PayPal 支付...
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">通过 PayPal 安全支付，即时到账</p>
        </CardContent>
      </Card>

      {/* Usage costs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">积分消耗规则</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {creditUsageCosts.map((item) => (
              <div key={item.tool} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.tool}</span>
                <span className="font-medium">{item.cost}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction history */}
      {transactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <History className="h-5 w-5" /> 积分记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(transactions as Array<{ id: string; type: string; amount: number; description: string | null; createdAt: string }>).slice(0, 20).map((tx) => (
                <div key={tx.id} className="flex justify-between items-center text-sm py-1.5 border-b last:border-0">
                  <div>
                    <span className="text-muted-foreground">{tx.description || tx.type}</span>
                  </div>
                  <div className="text-right">
                    <span className={tx.amount > 0 ? "text-green-600 font-medium" : "text-destructive"}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(tx.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
