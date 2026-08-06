"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";

const PACKAGES = [
  { id: "trial", credits: 50, price: 1, name: "Trial", badge: "新手首选" },
  { id: "basic", credits: 100, price: 20.1, name: "Starter" },
  { id: "standard", credits: 500, price: 45, name: "Standard" },
  { id: "premium", credits: 1500, price: 80, name: "Premium" },
];

const creditUsageCosts = [
  { tool: "AI Chat", cost: "1 credit" },
  { tool: "AI Writing", cost: "2 credits" },
  { tool: "Data Analysis", cost: "3 credits" },
  { tool: "Image Generation", cost: "8 credits" },
  { tool: "Video Generation", cost: "20 credits" },
];

function ProfileContent() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [balance, setBalance] = useState<number | null>(null);
  const [buying, setBuying] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load balance
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/credits")
        .then((r) => r.json())
        .then((data) => setBalance(data.balance))
        .catch(() => setError("无法加载积分信息"));
    }
  }, [status, router]);

  // Handle PayPal return — capture the order
  useEffect(() => {
    const paypalResult = searchParams.get("paypal");
    const token = searchParams.get("token");

    if (paypalResult === "success" && token && !capturing) {
      setCapturing(true);
      // PayPal redirects back with ?paypal=success&token=<orderId>
      // Actually PayPal uses token=PayerID, not orderId. We need the orderId.
      // PayPal redirect: ?paypal=success&token=<EC-token>&PayerID=<id>
      // For REST API v2, the redirect includes: ?token=<orderId>&PayerID=<id>
      const orderId = token;

      fetch("/api/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "capture-order", orderId }),
      })
        .then(async (r) => {
          const data = await r.json();
          if (!r.ok) throw new Error(data.error || "支付确认失败");
          return data;
        })
        .then(async (result) => {
          setBalance(result.balance);
          if (result.isFirstPurchase) {
            setSuccessMsg(`🎉 首购成功！获得 ${result.credits} 积分 (含 +50% 赠送)`);
          } else {
            setSuccessMsg(`购买成功！获得 ${result.credits} 积分`);
          }
          // Refresh session to update JWT credits
          await update();
          // Clean URL
          router.replace("/profile");
        })
        .catch((err) => {
          setError(err.message || "支付确认失败");
        })
        .finally(() => {
          setCapturing(false);
        });
    } else if (paypalResult === "cancelled") {
      setError("支付已取消");
      router.replace("/profile");
    }
  }, [searchParams, capturing, router, update]);

  // Step 1: Create order & redirect to PayPal
  const handleBuy = async (pkgId: string) => {
    setBuying(pkgId);
    setError("");
    setSuccessMsg("");

    try {
      const orderRes = await fetch("/api/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create-order", pkg: pkgId }),
      });

      if (!orderRes.ok) {
        const data = await orderRes.json().catch(() => ({}));
        setError(data.error || "创建订单失败");
        setBuying(null);
        return;
      }

      const { approveUrl, error: orderError } = await orderRes.json();
      if (orderError || !approveUrl) {
        setError(orderError || "无法获取支付链接");
        setBuying(null);
        return;
      }

      // Redirect to PayPal for user approval
      window.location.href = approveUrl;
    } catch {
      setError("支付失败，请重试");
      setBuying(null);
    }
  };

  if (status === "loading" || capturing) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 space-y-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        {capturing && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> 正在确认支付...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {successMsg}
        </div>
      )}

      <Card className="mb-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">积分余额</p>
              <p className="text-4xl font-extrabold text-primary">
                {balance !== null ? balance : "..."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                新用户登录即送 50 免费积分
              </p>
            </div>
            <Coins className="h-10 w-10 text-primary/50" />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" /> 购买积分 (PayPal)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PACKAGES.map((pkg) => (
              <Button
                key={pkg.id}
                variant={pkg.badge ? "default" : "outline"}
                className={`h-auto py-3 flex flex-col gap-0.5 relative ${
                  pkg.badge ? "bg-amber-500 hover:bg-amber-600 text-white" : ""
                }`}
                disabled={buying !== null}
                onClick={() => handleBuy(pkg.id)}
              >
                {pkg.badge && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                    {pkg.badge}
                  </span>
                )}
                {buying === pkg.id ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className={`text-lg font-bold ${pkg.badge ? "" : "text-primary"}`}>
                    {pkg.credits}
                  </span>
                )}
                <span className="text-[10px] opacity-70">credits</span>
                <span className="text-xs font-medium mt-0.5">${pkg.price}</span>
              </Button>
            ))}
          </div>
          {buying !== null && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> 正在跳转到 PayPal...
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            点击套餐后将跳转到 PayPal 完成支付，支付成功后自动返回。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">积分消耗</CardTitle>
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
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-2xl px-4 py-12 space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
