import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AnalysisShell } from "@/components/analysis/analysis-shell";

export const metadata: Metadata = {
  title: "数据分析",
  description: "上传 CSV/Excel 文件，AI 自动分析数据趋势、生成洞察报告。",
};

export default function AnalysisPage() {
  return (
    <ToolShell>
      <div>
        <h2 className="text-xl font-bold mb-1">数据分析</h2>
        <p className="text-sm text-muted-foreground mb-4">
          上传文件 → AI 分析 → 洞察报告
        </p>
        <AnalysisShell />
      </div>
    </ToolShell>
  );
}
