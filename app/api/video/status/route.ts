import { env } from "@/lib/env";

const VOLC_BASE = "https://ark.cn-beijing.volces.com/api/v3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("id");

  if (!taskId) {
    return new Response("Missing task ID", { status: 400 });
  }

  if (!env.DOUBAO_API_KEY) {
    return new Response("Please configure DOUBAO_API_KEY", { status: 500 });
  }

  try {
    const res = await fetch(`${VOLC_BASE}/contents/generations/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${env.DOUBAO_API_KEY}` },
    });

    if (!res.ok) {
      return new Response("Failed to query status", { status: 500 });
    }

    const data = await res.json();
    return Response.json({
      status: data.status,
      videoUrl: data.video_url || data.output?.video_url || null,
    });
  } catch (error) {
    console.error("Video status error:", error);
    return new Response("Failed to query status", { status: 500 });
  }
}
