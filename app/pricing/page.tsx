import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — 积分定价 | 按量付费，无需订阅",
  description: "AI工具积分定价：$1体验50积分，首购额外+50%。支持PayPal支付，按量付费无订阅。AI聊天1积分/次，生图8积分/张。",
};

const packages = [
  {
    id: "trial",
    name: "Trial",
    credits: 50,
    bonusCredits: 75,
    price: 1,
    desc: "超低价体验全部功能",
    badge: "首购送50%",
    popular: false,
    highlight: true,
  },
  {
    id: "basic",
    name: "Starter",
    credits: 100,
    bonusCredits: 150,
    price: 20.1,
    desc: "适合尝试所有工具",
    badge: "首购送50%",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    credits: 500,
    bonusCredits: 750,
    price: 45,
    desc: "性价比最高之选",
    badge: "首购送50%",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    credits: 1500,
    bonusCredits: 2250,
    price: 80,
    desc: "创作者和重度用户",
    badge: "首购送50%",
    popular: false,
  },
];

const costs = [
  { tool: "AI Chat", cost: "1 credit / 次" },
  { tool: "AI Writing", cost: "2 credits / 次" },
  { tool: "Data Analysis", cost: "3 credits / 次" },
  { tool: "Image Generation", cost: "8 credits / 张" },
  { tool: "Video Generation", cost: "20 credits / 个" },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 mb-4">
          🔥 限时优惠：首次购买额外赠送 50% 积分
        </div>
        <h1 className="text-3xl font-extrabold mb-3">买积分，用 AI — 简单透明</h1>
        <p className="text-muted-foreground text-lg">
          一次购买，随时使用。无需订阅，积分永不过期。注册即送 50 免费积分。
        </p>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative rounded-2xl border p-5 flex flex-col ${
              pkg.popular
                ? "border-primary bg-primary/5 shadow-lg lg:scale-105"
                : pkg.highlight
                  ? "border-amber-500/50 bg-amber-500/5"
                  : "border-border bg-card"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                最受欢迎
              </div>
            )}
            {pkg.highlight && !pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                🔥 新手首选
              </div>
            )}
            <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{pkg.desc}</p>
            <div className="text-3xl font-extrabold mb-1">
              ${pkg.price}
              {pkg.price === 1 && (
                <span className="text-xs font-normal text-muted-foreground ml-1 line-through">$1.50</span>
              )}
            </div>
            <p className="text-sm font-medium mb-1">{pkg.credits} credits</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mb-4">
              首购实得 {pkg.bonusCredits} credits (+50%)
            </p>
            <Link
              href="/profile"
              className={`mt-auto inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all h-9 px-4 ${
                pkg.highlight
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-primary text-primary-foreground hover:bg-primary/80"
              }`}
            >
              {pkg.price === 1 ? "立即体验" : "立即购买"}
            </Link>
          </div>
        ))}
      </div>

      {/* Credit usage */}
      <div className="max-w-md mx-auto mb-12">
        <h2 className="text-xl font-bold text-center mb-4">积分消耗说明</h2>
        <div className="rounded-xl border bg-card overflow-hidden">
          {costs.map((item) => (
            <div
              key={item.tool}
              className="flex justify-between px-4 py-3 border-b last:border-0 text-sm"
            >
              <span>{item.tool}</span>
              <span className="font-medium text-muted-foreground">{item.cost}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          $1 体验套餐 = 50次AI对话 或 6张AI图片 或 25次AI写作
        </p>
      </div>

      {/* Value prop */}
      <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border bg-card p-4">
            <div className="text-2xl mb-1">🔓</div>
            <div className="font-semibold">无订阅</div>
            <div className="text-xs text-muted-foreground">一次购买，永不续费</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-2xl mb-1">💎</div>
            <div className="font-semibold">不过期</div>
            <div className="text-xs text-muted-foreground">积分永久有效</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-2xl mb-1">🎁</div>
            <div className="font-semibold">50免费积分</div>
            <div className="text-xs text-muted-foreground">注册即送，无需付费</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
        <h2 className="text-xl font-bold mb-2">$1 即可体验全部 AI 功能</h2>
        <p className="text-muted-foreground mb-4">
          Google 登录即送 50 免费积分，选 Trial 套餐只需 $1 继续使用
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-10 gap-1.5 px-8 text-sm font-medium transition-all"
        >
          免费注册并购买
        </Link>
      </div>
    </div>
  );
}
