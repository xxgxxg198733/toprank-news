import { NextResponse } from "next/server";
import { getEnabledProviders } from "@/lib/ai/providers";
import { MODEL_CATALOG, getDefaultModel } from "@/lib/ai/models";

export async function GET() {
  const providers = getEnabledProviders();
  const enabledProviderIds = new Set(
    providers.filter((p) => p.enabled).map((p) => p.id)
  );

  const models = MODEL_CATALOG.filter((m) =>
    enabledProviderIds.has(m.provider)
  );

  return NextResponse.json({
    providers: providers.filter((p) => p.enabled),
    defaultProvider: providers.find((p) => p.enabled)?.id || "deepseek",
    models,
    defaults: Object.fromEntries(
      providers
        .filter((p) => p.enabled)
        .map((p) => [p.id, getDefaultModel(p.id)])
    ),
  });
}
