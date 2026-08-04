import "server-only";
import { db } from "./db";
import { creditBalances, creditTransactions } from "./db/schema";
import { eq, sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";

// Credit costs per tool
export const CREDIT_COSTS: Record<string, number> = {
  chat: 1,       // 1 credit per chat message
  image: 5,      // 5 credits per image generation
  writing: 2,    // 2 credits per writing request
  analysis: 3,   // 3 credits per analysis
  video: 10,     // 10 credits per video generation
};

export async function getCreditBalance(userId: string): Promise<number> {
  const result = await db
    .select({ balance: creditBalances.balance })
    .from(creditBalances)
    .where(eq(creditBalances.userId, userId))
    .limit(1);

  return result[0]?.balance ?? 0;
}

export async function ensureCreditBalance(userId: string): Promise<number> {
  const existing = await getCreditBalance(userId);
  if (existing === 0 && !(await hasCreditRecord(userId))) {
    // Create initial balance record with 10 free credits
    await db.insert(creditBalances).values({
      id: uuid(),
      userId,
      balance: 10,
    });
    await db.insert(creditTransactions).values({
      id: uuid(),
      userId,
      amount: 10,
      type: "bonus",
      description: "新用户注册赠送",
    });
    return 10;
  }
  return existing;
}

async function hasCreditRecord(userId: string): Promise<boolean> {
  const result = await db
    .select({ id: creditBalances.id })
    .from(creditBalances)
    .where(eq(creditBalances.userId, userId))
    .limit(1);
  return result.length > 0;
}

export async function deductCredits(
  userId: string,
  tool: keyof typeof CREDIT_COSTS
): Promise<{ success: boolean; remaining: number; message: string }> {
  const cost = CREDIT_COSTS[tool] || 1;
  const balance = await getCreditBalance(userId);

  if (balance < cost) {
    return {
      success: false,
      remaining: balance,
      message: `积分不足！需要 ${cost} 积分，当前余额 ${balance} 积分。请购买积分后继续使用。`,
    };
  }

  await db
    .update(creditBalances)
    .set({
      balance: sql`${creditBalances.balance} - ${cost}`,
      updatedAt: new Date(),
    })
    .where(eq(creditBalances.userId, userId));

  await db.insert(creditTransactions).values({
    id: uuid(),
    userId,
    amount: -cost,
    type: "usage",
    description: `使用 ${tool} 工具`,
  });

  return {
    success: true,
    remaining: balance - cost,
    message: `已消耗 ${cost} 积分`,
  };
}

export async function addCredits(
  userId: string,
  amount: number,
  type: string = "purchase",
  description: string = "购买积分",
  paypalOrderId?: string
): Promise<number> {
  await ensureCreditBalance(userId);

  await db
    .update(creditBalances)
    .set({
      balance: sql`${creditBalances.balance} + ${amount}`,
      updatedAt: new Date(),
    })
    .where(eq(creditBalances.userId, userId));

  await db.insert(creditTransactions).values({
    id: uuid(),
    userId,
    amount,
    type,
    description,
    paypalOrderId: paypalOrderId || null,
  });

  return getCreditBalance(userId);
}

export async function getTransactionHistory(userId: string) {
  return db
    .select()
    .from(creditTransactions)
    .where(eq(creditTransactions.userId, userId))
    .orderBy(sql`${creditTransactions.createdAt} DESC`)
    .limit(50);
}
