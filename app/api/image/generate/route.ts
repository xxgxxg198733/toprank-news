import { env } from "@/lib/env";
import { auth } from "@/lib/auth";
import { deductCredits } from "@/lib/credits";

export async function POST(request: Request) {
  // Auth check
  const session = await auth();
  if (!session?.user) {
    return new Response("请先登录后再使用 AI 工具。", { status: 401 });
  }

  // Credit check
  const creditCheck = await deductCredits("image");
  if (!creditCheck.success) {
    return new Response(creditCheck.message, { status: 402 });
  }

  try {
    const body = await request.json();
    const { prompt, providerId = "doubao", modelId = "doubao-seedream-5-0-pro-260628", size = "1024x1024", n = 1 } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response("Please enter an image description", { status: 400 });
    }

    // 豆包 uses direct API call (returns URL, not base64)
    if (providerId === "doubao") {
      if (!env.DOUBAO_API_KEY) {
        return new Response("Please configure DOUBAO_API_KEY environment variable", { status: 500 });
      }

      const doubaoRes = await fetch("https://ark.cn-beijing.volces.com/api/v3/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.DOUBAO_API_KEY}`,
        },
        body: JSON.stringify({
          model: modelId,
          prompt: prompt.trim(),
          response_format: "url",
          size,
          n: Math.min(n, 4),
          watermark: true,
        }),
      });

      if (!doubaoRes.ok) {
        const err = await doubaoRes.text();
        console.error("Doubao image error:", err);
        return new Response(`Doubao image generation failed: ${err}`, { status: 500 });
      }

      const doubaoData = await doubaoRes.json();
      const images = (doubaoData.data || []).map((img: { url: string }) => ({
        base64: null,
        url: img.url,
        mediaType: "image/png",
      }));

      return Response.json({ images });
    }

    // Other providers use AI SDK generateImage
    const { generateImage } = await import("ai");
    const { getProvider, getDefaultProvider } = await import("@/lib/ai/providers");

    const prov = getProvider(providerId) || getDefaultProvider();
    if (!prov) {
      return new Response("No AI provider available", { status: 500 });
    }

    const result = await generateImage({
      model: prov.imageModel(modelId),
      prompt: prompt.trim(),
      n: Math.min(n, 4),
      size,
    });

    const results = result.images.map((img) => ({
      base64: img.base64,
      url: null,
      mediaType: img.mediaType || "image/png",
    }));

    return Response.json({ images: results });
  } catch (error) {
    console.error("Image generate error:", error);
    return new Response("图片生成失败，请检查 API Key 配置。", { status: 500 });
  }
}
