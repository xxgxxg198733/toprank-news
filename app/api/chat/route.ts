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
    return new Response("Please sign in to use AI tools.", { status: 401 });
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
    return new Response("Too many requests. Please try again later.", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
    });
  }

  try {
    const body = await request.json();
    const { messages, providerId, modelId } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response("Missing messages parameter", { status: 400 });
    }

    const prov = providerId ? getProvider(providerId) : getDefaultProvider();
    if (!prov) {
      return new Response("No AI provider available. Please configure an API key.", { status: 500 });
    }

    const effectiveProviderId = providerId || "doubao";
    const effectiveModelId = modelId || getDefaultModel(effectiveProviderId);
    if (modelId && !isModelIdValid(modelId, effectiveProviderId)) {
      return new Response(`Invalid model ID: ${modelId}`, { status: 400 });
    }

    const result = streamText({
      model: prov(effectiveModelId),
      messages: await convertToModelMessages(messages),
      system: "You are a helpful AI assistant. Respond to user questions in a friendly, professional, and concise manner.",
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
