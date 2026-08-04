import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";
import { Wrench } from "lucide-react";

const navLinks = [
  { href: "/tools/chat", label: "Chat" },
  { href: "/tools/image", label: "Image" },
  { href: "/tools/writing", label: "Writing" },
  { href: "/tools/analysis", label: "Analysis" },
  { href: "/tools/video", label: "Video" },
];

const pricingLink = { href: "/pricing", label: "Pricing" };

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-6xl">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Wrench className="h-5 w-5" />
          <span>Zicisi AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={pricingLink.href}
            className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors"
          >
            {pricingLink.label}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <UserMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
