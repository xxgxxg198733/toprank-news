"use client";

import { useState, useCallback } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColumnInfo {
  name: string;
  type: "number" | "string" | "date" | "unknown";
  sampleValues: string[];
}

interface Props {
  onDataParsed: (columns: ColumnInfo[], rows: Record<string, unknown>[]) => void;
}

export function UploadDropzone({ onDataParsed }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");

  const parseFile = useCallback(async (file: File) => {
    setParsing(true);
    setError("");
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let rows: Record<string, unknown>[] = [];

      if (ext === "csv") {
        const text = await file.text();
        const Papa = (await import("papaparse")).default;
        const result = Papa.parse<Record<string, unknown>>(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });
        rows = result.data;
      } else if (ext === "xlsx" || ext === "xls") {
        const XLSX = await import("xlsx");
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        rows = XLSX.utils.sheet_to_json(sheet);
      } else {
        setError("Unsupported file format. Please upload a CSV or Excel file.");
        setParsing(false);
        return;
      }

      if (rows.length === 0) {
        setError("No data found in the file.");
        setParsing(false);
        return;
      }

      const columns = Object.keys(rows[0]).map((name) => {
        const sampleValues = rows.slice(0, 10).map((r) => String(r[name] ?? ""));
        const type = inferColumnType(rows.map((r) => r[name]));
        return { name, type, sampleValues };
      });

      onDataParsed(columns, rows);
    } catch {
      setError("文件解析失败，请检查文件格式。");
    } finally {
      setParsing(false);
    }
  }, [onDataParsed]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
        )}
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {parsing ? (
            <div className="space-y-2">
              <FileSpreadsheet className="h-10 w-10 mx-auto text-primary animate-pulse" />
              <p className="text-sm text-muted-foreground">Parsing file...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-10 w-10 mx-auto text-primary/60" />
              <p className="text-sm font-medium">Drag & drop your file here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports CSV, Excel (.xlsx/.xls) formats</p>
            </div>
          )}
        </label>
      </div>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

function inferColumnType(values: unknown[]): "number" | "string" | "date" | "unknown" {
  const nonNull = values.filter((v) => v !== null && v !== undefined && v !== "");
  if (nonNull.length === 0) return "unknown";
  const numbers = nonNull.filter((v) => !isNaN(Number(v)));
  if (numbers.length / nonNull.length > 0.8) return "number";
  return "string";
}
