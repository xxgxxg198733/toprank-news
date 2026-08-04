import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from "ai";
import { getProvider, getDefaultProvider } from "@/lib/ai/providers";
import { isModelIdValid, getDefaultModel } from "@/lib/ai/models";
import { writingPrompts } from "@/lib/ai/prompts";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, { interval: 60000, maxRequests: 20 });
  if (!rateLimit.allowed) {
    return new Response("请求过于频繁，请稍后再试。", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
    });
  }

  try {
    const body = await request.json();
    const { messages, tool, providerId, modelId } = body;

    if (!tool || !writingPrompts[tool]) {
      return new Response("无效的写作工具类型", { status: 400 });
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response("缺少 messages", { status: 400 });
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

    const systemPrompt = writingPrompts[tool];

    const result = streamText({
      model: prov(effectiveModelId),
      messages: await convertToModelMessages(messages),
      system: systemPrompt,
      temperature: 0.8,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Writing API error:", error);
    return new Response("AI 服务暂时不可用", { status: 500 });
  }
}
