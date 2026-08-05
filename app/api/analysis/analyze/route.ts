import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from "ai";
import { getProvider, getDefaultProvider } from "@/lib/ai/providers";
import { isModelIdValid, getDefaultModel } from "@/lib/ai/models";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { auth } from "@/lib/auth";
import { deductCredits } from "@/lib/credits";

export async function POST(request: Request) {
  // Auth check
  const session = await auth();
  if (!session?.user) {
    return new Response("请先登录后再使用 AI 工具。", { status: 401 });
  }

  // Credit check
  const creditCheck = await deductCredits("analysis");
  if (!creditCheck.success) {
    return new Response(creditCheck.message, { status: 402 });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, { interval: 60000, maxRequests: 15 });
  if (!rateLimit.allowed) {
    return new Response("Too many requests. Please try again later.", { status: 429 });
  }

  try {
    const body = await request.json();
    const { messages, columns, sampleRows, question, providerId, modelId } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response("Please upload a data file", { status: 400 });
    }

    const prov = providerId ? getProvider(providerId) : getDefaultProvider();
    if (!prov) {
      return new Response("没有可用的 AI 提供商", { status: 500 });
    }

    const effectiveProviderId = providerId || "deepseek";
    const effectiveModelId = modelId || getDefaultModel(effectiveProviderId);
    if (modelId && !isModelIdValid(modelId, effectiveProviderId)) {
      return new Response(`无效的模型 ID: ${modelId}`, { status: 400 });
    }

    const dataSummary = columns && sampleRows ? buildDataSummary(columns, sampleRows) : "";

    const result = streamText({
      model: prov(effectiveModelId),
      messages: await convertToModelMessages(messages),
      system: `You are a professional data analyst. Analyze user-provided data and provide valuable insights.

${dataSummary}

Analysis requirements:
- Data overview: row count, column count, data types
- Descriptive statistics: mean, median, range for numeric columns
- Trends and patterns: discover regularities in the data
- Anomaly detection: identify potential outliers
- Business recommendations: actionable advice based on data
- Present key data in tables`,
      temperature: 0.3,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Analysis API error:", error);
    return new Response("分析服务暂时不可用", { status: 500 });
  }
}

function buildDataSummary(columns: string[], sampleRows: Record<string, unknown>[]): string {
  const parts: string[] = [];
  parts.push(`列数：${columns.length}`);
  parts.push(`列名：${columns.join("、")}`);
  parts.push(`样本行数：${sampleRows.length}`);
  parts.push("");
  parts.push("数据预览：");
  parts.push("| " + columns.join(" | ") + " |");
  parts.push("| " + columns.map(() => "---").join(" | ") + " |");
  for (const row of sampleRows.slice(0, 20)) {
    parts.push("| " + columns.map((c) => String(row[c] ?? "")).join(" | ") + " |");
  }
  return parts.join("\n");
}
