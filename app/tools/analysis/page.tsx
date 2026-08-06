import type { Metadata } from "next";
import { ToolShell } from "@/components/shared/tool-shell";
import { AuthGuard } from "@/components/shared/auth-guard";
import { AnalysisShell } from "@/components/analysis/analysis-shell";

export const metadata: Metadata = {
  title: "Data Analysis — AI数据分析 | 上传表格自动生成分析报告",
  description: "免费AI数据分析工具，上传CSV/Excel文件即可自动分析。AI自动识别趋势、检测异常、生成洞察报告和业务建议。无需编程，3积分/次。支持销售数据、财务数据、运营数据分析。",
  keywords: ["AI数据分析", "AI分析Excel", "AI分析CSV", "上传表格AI分析", "AI数据可视化", "AI生成数据报告", "数据趋势分析", "异常检测", "数据分析工具免费", "不用编程数据分析", "AI解读数据"],
  alternates: { canonical: "https://zicisi.fun/tools/analysis" },
};

export default function AnalysisPage() {
  return (
    <ToolShell>
      <AuthGuard
        message="请登录后使用数据分析"
        description="登录即可上传 CSV/Excel 文件，AI 自动分析数据趋势并生成洞察报告"
      >
        <div>
          <h2 className="text-xl font-bold mb-1">Data Analysis</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Upload → AI Analysis → Insight Report
          </p>
          <AnalysisShell />
        </div>
      </AuthGuard>
    </ToolShell>
  );
}
