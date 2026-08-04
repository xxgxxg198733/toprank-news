import "server-only";
import { v4 as uuid } from "uuid";
import {
  getCreditBalance as kvGetBalance,
  setCreditBalance as kvSetBalance,
  addTransaction,
} from "./kv";

export const CREDIT_COSTS: Record<string, number> = {
  chat: 1,
  image: 5,
  writing: 2,
  analysis: 3,
  video: 10,
};

export async function getCreditBalance(userId: string): Promise<number> {
  return kvGetBalance(userId);
}

export async function ensureCreditBalance(userId: string): Promise<number> {
  const balance = await kvGetBalance(userId);
  if (balance === 0) {
    // Give 10 free credits to new users
    await kvSetBalance(userId, 10);
    await addTransaction(userId, {
      id: uuid(),
      amount: 10,
      type: "bonus",
      description: "新用户注册赠送",
      createdAt: new Date().toISOString(),
    });
    return 10;
  }
  return balance;
}

export async function deductCredits(
  userId: string,
  tool: keyof typeof CREDIT_COSTS
): Promise<{ success: boolean; remaining: number; message: string }> {
  const cost = CREDIT_COSTS[tool] || 1;
  const balance = await kvGetBalance(userId);

  if (balance < cost) {
    return {
      success: false,
      remaining: balance,
      message: `积分不足！需要 ${cost} 积分，当前余额 ${balance} 积分。请购买积分后继续使用。`,
    };
  }

  const newBalance = balance - cost;
  await kvSetBalance(userId, newBalance);
  await addTransaction(userId, {
    id: uuid(),
    amount: -cost,
    type: "usage",
    description: `使用 ${tool} 工具`,
    createdAt: new Date().toISOString(),
  });

  return { success: true, remaining: newBalance, message: `已消耗 ${cost} 积分` };
}

export async function addCredits(
  userId: string,
  amount: number,
  type = "purchase",
  description = "购买积分",
  paypalOrderId?: string
): Promise<number> {
  const balance = await kvGetBalance(userId);
  const newBalance = balance + amount;
  await kvSetBalance(userId, newBalance);
  await addTransaction(userId, {
    id: uuid(),
    amount,
    type,
    description,
    paypalOrderId,
    createdAt: new Date().toISOString(),
  });
  return newBalance;
}

export async function getTransactionHistory(userId: string) {
  const { getTransactions } = await import("./kv");
  return getTransactions(userId);
}
