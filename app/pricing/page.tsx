import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Buy credits to use all AI tools — Chat, Image, Writing, Analysis, Video.",
};

const packages = [
  {
    name: "Starter",
    credits: 50,
    price: 5,
    desc: "Perfect for trying out all tools",
    popular: false,
  },
  {
    name: "Standard",
    credits: 200,
    price: 15,
    desc: "Best value for regular users",
    popular: true,
  },
  {
    name: "Premium",
    credits: 600,
    price: 35,
    desc: "For power users and creators",
    popular: false,
  },
];

const costs = [
  { tool: "AI Chat", cost: "1 credit / message" },
  { tool: "AI Writing", cost: "3 credits / request" },
  { tool: "Data Analysis", cost: "5 credits / report" },
  { tool: "Image Generation", cost: "10 credits / image" },
  { tool: "Video Generation", cost: "25 credits / video" },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold mb-3">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Buy credits once. Use them anytime. No subscription, no expiry.
        </p>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative rounded-2xl border p-6 flex flex-col ${
              pkg.popular
                ? "border-primary bg-primary/5 shadow-lg scale-105"
                : "border-border bg-card"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
            <div className="text-4xl font-extrabold mb-1">
              ${pkg.price}
            </div>
            <p className="text-sm text-muted-foreground mb-6">{pkg.credits} credits</p>
            <Link
              href="/profile"
              className="mt-auto inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-9 px-4 text-sm font-medium transition-all"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>

      {/* Cost table */}
      <div className="max-w-md mx-auto mb-12">
        <h2 className="text-xl font-bold text-center mb-4">Credit Usage</h2>
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
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
        <h2 className="text-xl font-bold mb-2">Ready to get started?</h2>
        <p className="text-muted-foreground mb-4">
          Sign in with Google, pick a package, and start using all AI tools.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/80 h-9 gap-1.5 px-8 text-sm font-medium transition-all"
        >
          Sign In & Buy Credits
        </Link>
      </div>
    </div>
  );
}
