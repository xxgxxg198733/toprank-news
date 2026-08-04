import "server-only";

import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { env } from "@/lib/env";

export interface ProviderInfo {
  id: string;
  name: string;
  enabled: boolean;
}

export function getEnabledProviders(): ProviderInfo[] {
  return [
    { id: "doubao", name: "豆包", enabled: !!env.DOUBAO_API_KEY },
    { id: "deepseek", name: "DeepSeek", enabled: !!env.DEEPSEEK_API_KEY },
    { id: "openai", name: "OpenAI", enabled: !!env.OPENAI_API_KEY },
    { id: "anthropic", name: "Anthropic", enabled: !!env.ANTHROPIC_API_KEY },
    { id: "google", name: "Google Gemini", enabled: !!env.GOOGLE_GENERATIVE_AI_API_KEY },
  ];
}

function getDoubaoModel() {
  if (!env.DOUBAO_API_KEY) return null;
  // 豆包 uses OpenAI-compatible API
  return createOpenAI({
    apiKey: env.DOUBAO_API_KEY,
    baseURL: "https://ark.cn-beijing.volces.com/api/v3",
  });
}

function getDeepSeekModel() {
  if (!env.DEEPSEEK_API_KEY) return null;
  return createDeepSeek({ apiKey: env.DEEPSEEK_API_KEY });
}

function getOpenAIModel() {
  if (!env.OPENAI_API_KEY) return null;
  return createOpenAI({ apiKey: env.OPENAI_API_KEY });
}

function getAnthropicModel() {
  if (!env.ANTHROPIC_API_KEY) return null;
  return createAnthropic({ apiKey: env.ANTHROPIC_API_KEY });
}

function getGoogleModel() {
  if (!env.GOOGLE_GENERATIVE_AI_API_KEY) return null;
  return createGoogleGenerativeAI({ apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY });
}

export function getProvider(providerId: string) {
  switch (providerId) {
    case "doubao": return getDoubaoModel();
    case "deepseek": return getDeepSeekModel();
    case "openai": return getOpenAIModel();
    case "anthropic": return getAnthropicModel();
    case "google": return getGoogleModel();
    default: return null;
  }
}

export function getDefaultProvider() {
  return getDoubaoModel() || getDeepSeekModel() || getOpenAIModel() || getAnthropicModel() || getGoogleModel();
}

export function getDefaultProviderId(): string {
  if (env.DOUBAO_API_KEY) return "doubao";
  if (env.DEEPSEEK_API_KEY) return "deepseek";
  if (env.OPENAI_API_KEY) return "openai";
  if (env.ANTHROPIC_API_KEY) return "anthropic";
  if (env.GOOGLE_GENERATIVE_AI_API_KEY) return "google";
  return "doubao"; // fallback
}
