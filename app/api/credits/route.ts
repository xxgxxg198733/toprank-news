import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const user = session.user as { credits?: number };
  return NextResponse.json({
    balance: user.credits ?? 0,
    transactions: [],
  });
}
