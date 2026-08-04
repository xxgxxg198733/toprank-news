import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from "ai";
import { getProvider, getDefaultProvider } from "@/lib/ai/providers";
import { isModelIdValid, getDefaultModel } from "@/lib/ai/models";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, { interval: 60000, maxRequests: 15 });
  if (!rateLimit.allowed) {
    return new Response("请求过于频繁，请稍后再试。", { status: 429 });
  }

  try {
    const body = await request.json();
    const { messages, columns, sampleRows, question, providerId, modelId } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response("请上传数据文件", { status: 400 });
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
      system: `你是一个专业的数据分析师。分析用户提供的数据并给出有价值的洞察。

${dataSummary}

分析要求：
- 数据概览：行数、列数、数据类型
- 描述性统计：数值列的均值、中位数、范围等
- 趋势和模式：发现数据中的规律
- 异常值检测：指出可能的异常
- 业务建议：基于数据的可操作建议
- 用表格展示关键数据
- 用中文回复`,
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
