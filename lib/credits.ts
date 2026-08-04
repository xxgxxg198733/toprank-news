import "server-only";

// Credits are stored in the JWT session token.
// No external database needed — Google OAuth + JWT handles everything.
// For production with persistent credits, add Vercel KV later.

import { auth } from "./auth";

export const CREDIT_COSTS: Record<string, number> = {
  chat: 1,
  writing: 3,
  analysis: 5,
  image: 10,
  video: 25,
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
    return { success: false, remaining: 0, message: "Please sign in first" };
  }

  const balance = user.credits ?? 0;

  if (balance < cost) {
    return {
      success: false,
      remaining: balance,
      message: `Insufficient credits! Need ${cost}, current balance: ${balance}. Please purchase more.`,
    };
  }

  return { success: true, remaining: balance - cost, message: `${cost} credits used` };
}

// Note: credits are stored in JWT session (not persistent).
// In production, use Vercel KV or a database for reliable storage.
export async function addCredits(
  userId: string,
  amount: number,
  _type = "purchase",
  _description = "Purchased credits",
  _paypalOrderId?: string
): Promise<number> {
  const session = await auth();
  const current = (session?.user as { credits?: number } | undefined)?.credits ?? 0;
  return current + amount;
}
