import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AnalysisShell } from "@/components/analysis/analysis-shell";

export const metadata: Metadata = {
  title: "Data Analysis",
  description: "Upload CSV/Excel files. AI auto-analyzes data trends and generates insight reports.",
};

export default function AnalysisPage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">Data Analysis</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Upload → AI Analysis → Insight Report
        </p>
        <AnalysisShell />
      </div>
    </ToolShell>
  );
}
