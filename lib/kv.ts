import "server-only";
import { kv } from "@vercel/kv";

// User storage
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  emailVerified?: string;
  createdAt: string;
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  return kv.get<StoredUser>(`user:email:${email.toLowerCase().trim()}`);
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  return kv.get<StoredUser>(`user:id:${id}`);
}

export async function createUser(user: StoredUser): Promise<void> {
  await Promise.all([
    kv.set(`user:id:${user.id}`, user),
    kv.set(`user:email:${user.email.toLowerCase().trim()}`, user),
  ]);
}

export async function linkOAuthAccount(
  provider: string,
  providerAccountId: string,
  userId: string
): Promise<void> {
  await kv.set(`oauth:${provider}:${providerAccountId}`, { userId });
}

export async function getUserIdByOAuth(
  provider: string,
  providerAccountId: string
): Promise<string | null> {
  const data = await kv.get<{ userId: string }>(`oauth:${provider}:${providerAccountId}`);
  return data?.userId || null;
}

// Credits storage
const CREDIT_KEY = (userId: string) => `credits:${userId}`;
const TX_KEY = (userId: string) => `transactions:${userId}`;

export async function getCreditBalance(userId: string): Promise<number> {
  return (await kv.get<number>(CREDIT_KEY(userId))) ?? 0;
}

export async function setCreditBalance(userId: string, balance: number): Promise<void> {
  await kv.set(CREDIT_KEY(userId), balance);
}

export interface CreditTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  paypalOrderId?: string;
  createdAt: string;
}

export async function addTransaction(
  userId: string,
  tx: CreditTransaction
): Promise<void> {
  const key = TX_KEY(userId);
  const existing = (await kv.get<CreditTransaction[]>(key)) || [];
  existing.unshift(tx);
  // Keep last 100 transactions
  await kv.set(key, existing.slice(0, 100));
}

export async function getTransactions(
  userId: string
): Promise<CreditTransaction[]> {
  return (await kv.get<CreditTransaction[]>(TX_KEY(userId))) || [];
}
