import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-20">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          This page may have been removed or the URL is incorrect. We've upgraded from TopRank to an AI toolkit.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-8 gap-1.5 px-2.5 text-sm font-medium transition-all">
            <Home className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
