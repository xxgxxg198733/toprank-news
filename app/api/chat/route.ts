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
  const creditCheck = await deductCredits("chat");
  if (!creditCheck.success) {
    return new Response(creditCheck.message, { status: 402 });
  }

  // Rate limit
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, { interval: 60000, maxRequests: 30 });
  if (!rateLimit.allowed) {
    return new Response("请求过于频繁，请稍后再试。", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
    });
  }

  try {
    const body = await request.json();
    const { messages, providerId, modelId } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response("缺少 messages 参数", { status: 400 });
    }

    const prov = providerId ? getProvider(providerId) : getDefaultProvider();
    if (!prov) {
      return new Response("没有可用的 AI 提供商，请在服务端配置 API Key。", { status: 500 });
    }

    const effectiveProviderId = providerId || "doubao";
    const effectiveModelId = modelId || getDefaultModel(effectiveProviderId);
    if (modelId && !isModelIdValid(modelId, effectiveProviderId)) {
      return new Response(`无效的模型 ID: ${modelId}`, { status: 400 });
    }

    const result = streamText({
      model: prov(effectiveModelId),
      messages: await convertToModelMessages(messages),
      system: "你是一个有帮助的 AI 助手。请用中文回复用户的问题，保持友好、专业、简洁的风格。",
      temperature: 0.7,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("AI 服务暂时不可用，请检查 API Key 配置或稍后再试。", { status: 500 });
  }
}
