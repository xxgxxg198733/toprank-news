import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { WritingShell } from "@/components/writing/writing-shell";

export const metadata: Metadata = {
  title: "AI Writing",
  description: "AI Writing Assistant: article generation, content rewriting, translation, and SEO optimization.",
};

export default function WritingPage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">AI Writing</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Article Generation · Rewriting · Translation · SEO
        </p>
        <WritingShell />
      </div>
    </ToolShell>
  );
}
