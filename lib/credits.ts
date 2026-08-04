import "server-only";

// Credits are stored in the JWT session token.
// No external database needed — Google OAuth + JWT handles everything.
// For production with persistent credits, add Vercel KV later.

import { auth } from "./auth";

export const CREDIT_COSTS: Record<string, number> = {
  chat: 1,
  image: 5,
  writing: 2,
  analysis: 3,
  video: 10,
};

export async function getCredits(): Promise<number> {
  const session = await auth();
  const user = session?.user as { credits?: number } | undefined;
  return user?.credits ?? 0;
}

export async function deductCredits(
  tool: keyof typeof CREDIT_COSTS
): Promise<{ success: boolean; remaining: number; message: string }> {
  const cost = CREDIT_COSTS[tool] || 1;
  const session = await auth();
  const user = session?.user as { id?: string; credits?: number } | undefined;

  if (!user?.id) {
    return { success: false, remaining: 0, message: "请先登录" };
  }

  const balance = user.credits ?? 10;

  if (balance < cost) {
    return {
      success: false,
      remaining: balance,
      message: `积分不足！需要 ${cost} 积分，当前余额 ${balance} 积分。`,
    };
  }

  return { success: true, remaining: balance - cost, message: `消耗 ${cost} 积分` };
}

// Note: credits are stored in JWT session (not persistent).
// In production, use Vercel KV or a database for reliable storage.
export async function addCredits(
  userId: string,
  amount: number,
  _type = "purchase",
  _description = "购买积分",
  _paypalOrderId?: string
): Promise<number> {
  const session = await auth();
  const current = (session?.user as { credits?: number } | undefined)?.credits ?? 0;
  return current + amount;
}
