import { env } from "@/lib/env";

const VOLC_BASE = "https://ark.cn-beijing.volces.com/api/v3";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      prompt,
      modelId = "doubao-seedance-2-0-260128",
      duration = 5,
      ratio = "16:9",
      referenceImages,
      referenceVideos,
      referenceAudios,
      generateAudio = false,
    } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response("Please enter a video description", { status: 400 });
    }

    if (!env.DOUBAO_API_KEY) {
      return new Response("Please configure DOUBAO_API_KEY", { status: 500 });
    }

    // Build content array per Volcano Engine API format
    const content: Array<Record<string, unknown>> = [
      { type: "text", text: prompt.trim() },
    ];

    // Add reference images
    if (referenceImages && Array.isArray(referenceImages)) {
      for (const url of referenceImages) {
        content.push({
          type: "image_url",
          image_url: { url },
          role: "reference_image",
        });
      }
    }

    // Add reference videos
    if (referenceVideos && Array.isArray(referenceVideos)) {
      for (const url of referenceVideos) {
        content.push({
          type: "video_url",
          video_url: { url },
          role: "reference_video",
        });
      }
    }

    // Add reference audio
    if (referenceAudios && Array.isArray(referenceAudios)) {
      for (const url of referenceAudios) {
        content.push({
          type: "audio_url",
          audio_url: { url },
          role: "reference_audio",
        });
      }
    }

    const res = await fetch(`${VOLC_BASE}/contents/generations/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.DOUBAO_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelId,
        content,
        generate_audio: generateAudio,
        ratio,
        duration,
        watermark: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Video generation error:", err);
      return new Response(`Video generation failed: ${err}`, { status: 500 });
    }

    const data = await res.json();
    return Response.json({ taskId: data.id, status: "submitted" });
  } catch (error) {
    console.error("Video API error:", error);
    return new Response("Video generation failed. Please try again.", { status: 500 });
  }
}
