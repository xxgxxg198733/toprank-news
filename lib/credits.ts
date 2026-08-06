import "server-only";

// Credits are tracked via JWT session + in-memory purchase store.
// JWT holds base credits (20 for new users). Purchased credits are added
// to an in-memory store keyed by user ID.
//
// IMPORTANT: In-memory store does NOT survive deploys. For production,
// replace this with Vercel KV (already in .env.example).

import { auth } from "./auth";

export const CREDIT_COSTS: Record<string, number> = {
  chat: 1,
  writing: 2,
  analysis: 3,
  image: 8,
  video: 20,
};

// In-memory purchase store: userId -> total purchased credits
const purchaseStore = new Map<string, number>();

function getPurchasedCredits(userId: string): number {
  return purchaseStore.get(userId) ?? 0;
}

function setPurchasedCredits(userId: string, credits: number): void {
  purchaseStore.set(userId, credits);
}

/** Get current credit balance: base (JWT) + purchased (store) */
export async function getCredits(): Promise<number> {
  const session = await auth();
  const user = session?.user as { id?: string; credits?: number } | undefined;

  if (!user?.id) return 0;

  const baseCredits = user.credits ?? 50;
  const purchased = getPurchasedCredits(user.id);

  return baseCredits + purchased;
}

/** Deduct credits — reduces purchased credits first, then base */
export async function deductCredits(
  tool: keyof typeof CREDIT_COSTS
): Promise<{ success: boolean; remaining: number; message: string }> {
  const cost = CREDIT_COSTS[tool] || 1;
  const session = await auth();
  const user = session?.user as { id?: string; credits?: number } | undefined;

  if (!user?.id) {
    return { success: false, remaining: 0, message: "请先登录" };
  }

  const baseCredits = user.credits ?? 50;
  const purchased = getPurchasedCredits(user.id);
  const totalBalance = baseCredits + purchased;

  if (totalBalance < cost) {
    return {
      success: false,
      remaining: totalBalance,
      message: `积分不足！需要 ${cost} 积分，当前余额 ${totalBalance}。请购买更多积分。`,
    };
  }

  // Deduct from purchased credits first, then base
  if (purchased >= cost) {
    setPurchasedCredits(user.id, purchased - cost);
  } else {
    const remaining = cost - purchased;
    setPurchasedCredits(user.id, 0);
    // Note: cannot update JWT base credits here — they'll show old value until next token refresh.
    // For now we rely on purchased credits covering most usage; base credits are a fallback.
    // A future improvement: use Vercel KV to track total credits.
  }

  const newBalance = totalBalance - cost;
  return { success: true, remaining: newBalance, message: `消耗 ${cost} 积分` };
}

/** Add credits after purchase */
export async function addCredits(
  userId: string,
  amount: number,
  _type = "purchase",
  _description = "Purchased credits",
  _paypalOrderId?: string
): Promise<number> {
  const session = await auth();
  const baseCredits =
    (session?.user as { credits?: number } | undefined)?.credits ?? 20;
  const currentPurchased = getPurchasedCredits(userId);
  const newPurchased = currentPurchased + amount;

  setPurchasedCredits(userId, newPurchased);

  return baseCredits + newPurchased;
}
