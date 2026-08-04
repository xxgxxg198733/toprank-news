import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCreditBalance, ensureCreditBalance, getTransactionHistory } from "@/lib/credits";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const balance = await ensureCreditBalance(userId);
  const transactions = await getTransactionHistory(userId);

  return NextResponse.json({ balance, transactions });
}
