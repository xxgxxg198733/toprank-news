import { generateImage } from "ai";
import { getProvider, getDefaultProvider } from "@/lib/ai/providers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, { interval: 60000, maxRequests: 10 });
  if (!rateLimit.allowed) {
    return new Response("请求过于频繁，请稍后再试。", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
    });
  }

  try {
    const body = await request.json();
    const { prompt, providerId = "openai", modelId = "gpt-image-1", size = "1024x1024", n = 1 } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response("请输入图片描述", { status: 400 });
    }

    const prov = getProvider(providerId) || getDefaultProvider();
    if (!prov) {
      return new Response("没有可用的 AI 提供商", { status: 500 });
    }

    const { images } = await generateImage({
      model: prov.imageModel(modelId),
      prompt: prompt.trim(),
      n: Math.min(n, 4),
      size,
    });

    const results = images.map((img) => ({
      base64: img.base64,
      mediaType: img.mediaType || "image/png",
    }));

    return Response.json({ images: results });
  } catch (error) {
    console.error("Image generate error:", error);
    return new Response(
      "图片生成失败，请检查 API Key 是否支持图片生成功能。",
      { status: 500 }
    );
  }
}
