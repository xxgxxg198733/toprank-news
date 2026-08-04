export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  category: "chat" | "image" | "all";
}

export const MODEL_CATALOG: ModelInfo[] = [
  // 豆包 (ByteDance)
  { id: "doubao-pro-256k", name: "豆包 Pro 256K", provider: "doubao", category: "chat" },
  { id: "doubao-lite-128k", name: "豆包 Lite 128K", provider: "doubao", category: "chat" },
  { id: "doubao-seedream-5-0-pro-260628", name: "豆包 Seedream 5.0 Pro", provider: "doubao", category: "image" },
  // DeepSeek
  { id: "deepseek-chat", name: "DeepSeek Chat", provider: "deepseek", category: "chat" },
  // OpenAI
  { id: "gpt-5.1", name: "GPT-5.1", provider: "openai", category: "all" },
  { id: "gpt-5", name: "GPT-5", provider: "openai", category: "all" },
  { id: "gpt-4.1", name: "GPT-4.1", provider: "openai", category: "chat" },
  { id: "gpt-image-1", name: "GPT Image 1", provider: "openai", category: "image" },
  { id: "dall-e-3", name: "DALL·E 3", provider: "openai", category: "image" },
  // Anthropic
  { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", provider: "anthropic", category: "chat" },
  { id: "claude-opus-4-5", name: "Claude Opus 4.5", provider: "anthropic", category: "chat" },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "anthropic", category: "chat" },
  // Google
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "google", category: "chat" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "google", category: "chat" },
  { id: "imagen-4", name: "Imagen 4", provider: "google", category: "image" },
];

export function getModelsByProvider(providerId: string): ModelInfo[] {
  return MODEL_CATALOG.filter((m) => m.provider === providerId);
}

export function getModelById(id: string): ModelInfo | undefined {
  return MODEL_CATALOG.find((m) => m.id === id);
}

export function isModelIdValid(id: string, providerId: string): boolean {
  const model = MODEL_CATALOG.find((m) => m.id === id);
  return !!model && model.provider === providerId;
}

export function getDefaultModel(providerId: string): string {
  const providerModels = MODEL_CATALOG.filter(
    (m) => m.provider === providerId && m.category !== "image"
  );
  if (providerModels.length > 0) return providerModels[0].id;

  // Fallback based on provider
  const defaults: Record<string, string> = {
    doubao: "doubao-pro-256k",
    deepseek: "deepseek-chat",
    openai: "gpt-5.1",
    anthropic: "claude-sonnet-4-5",
    google: "gemini-2.5-flash",
  };
  return defaults[providerId] || "deepseek-chat";
}
