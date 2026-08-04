"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { getMessageText } from "@/lib/utils";
import { UploadDropzone } from "./upload-dropzone";
import { AnalysisReport } from "./analysis-report";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Square, Table } from "lucide-react";

interface ColumnInfo {
  name: string;
  type: "number" | "string" | "date" | "unknown";
  sampleValues: string[];
}

export function AnalysisShell() {
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [reportContent, setReportContent] = useState("");
  const [question, setQuestion] = useState("");

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/analysis/analyze",
      body: () => ({
        columns: columns.map((c) => c.name),
        sampleRows: rows.slice(0, 30),
        question: question || undefined,
      }),
    }),
  });

  // Collect assistant messages as report
  useEffect(() => {
    const text = [...messages]
      .filter((m) => m.role !== "user")
      .map((m) => getMessageText(m.parts))
      .join("\n\n");
    if (text) setReportContent(text);
  }, [messages]);

  const handleAnalyze = () => {
    if (rows.length === 0) return;
    setReportContent("");
    const msg = question || "Please analyze the data and provide insights";
    sendMessage({ text: msg });
  };

  const handleDataParsed = (cols: ColumnInfo[], data: Record<string, unknown>[]) => {
    setColumns(cols);
    setRows(data);
    setReportContent("");
    setQuestion("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="space-y-4">
      <UploadDropzone onDataParsed={handleDataParsed} />

      {columns.length > 0 && (
        <div className="space-y-3">
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b">
              <Table className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Data Preview ({columns.length} columns, {rows.length} rows)
              </span>
            </div>
            <div className="overflow-x-auto max-h-64">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-muted/30">
                    {columns.map((col) => (
                      <th key={col.name} className="px-3 py-2 text-left font-medium text-muted-foreground">
                        <div>{col.name}</div>
                        <span className="text-[10px] text-muted-foreground/60">{col.type}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                      {columns.map((col) => (
                        <td key={col.name} className="px-3 py-1.5 whitespace-nowrap">
                          {String(row[col.name] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask AI a question (optional, e.g. What are the trends?)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            {isLoading ? (
              <Button type="button" variant="destructive" size="sm" onClick={() => stop()}>
                <Square className="h-4 w-4 mr-1" /> Stop
              </Button>
            ) : (
              <Button type="button" size="sm" disabled={rows.length === 0} onClick={handleAnalyze}>
                <Send className="h-4 w-4 mr-1" /> Analyze
              </Button>
            )}
          </div>

          <AnalysisReport content={reportContent} loading={isLoading && !reportContent} />
        </div>
      )}
    </div>
  );
}
