import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from "ai";
import { getProvider, getDefaultProvider } from "@/lib/ai/providers";
import { isModelIdValid, getDefaultModel } from "@/lib/ai/models";
import { writingPrompts } from "@/lib/ai/prompts";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, { interval: 60000, maxRequests: 20 });
  if (!rateLimit.allowed) {
    return new Response("Too many requests. Please try again later.", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
    });
  }

  try {
    const body = await request.json();
    const { messages, tool, providerId, modelId } = body;

    if (!tool || !writingPrompts[tool]) {
      return new Response("Invalid writing tool type", { status: 400 });
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response("Missing messages", { status: 400 });
    }

    const prov = providerId ? getProvider(providerId) : getDefaultProvider();
    if (!prov) {
      return new Response("No AI provider available", { status: 500 });
    }

    const effectiveProviderId = providerId || "deepseek";
    const effectiveModelId = modelId || getDefaultModel(effectiveProviderId);

    if (modelId && !isModelIdValid(modelId, effectiveProviderId)) {
      return new Response(`Invalid model ID: ${modelId}`, { status: 400 });
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
