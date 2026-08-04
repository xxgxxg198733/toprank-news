import "server-only";

export const env = {
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  FAL_KEY: process.env.FAL_KEY,
} as const;

export function hasProvider(key: keyof typeof env): boolean {
  return !!env[key];
}
