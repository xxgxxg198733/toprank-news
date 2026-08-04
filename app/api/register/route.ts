import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { ensureCreditBalance } from "@/lib/credits";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "邮箱和密码不能为空" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "密码至少 6 位" }, { status: 400 });
    }

    // Check if user exists
    const existing = await db.select({ id: users.id }).from(users).where(
      (await import("drizzle-orm")).eq(users.email, email.toLowerCase().trim())
    ).limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ message: "该邮箱已注册" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    const userId = uuid();

    await db.insert(users).values({
      id: userId,
      name: name || email.split("@")[0],
      email: email.toLowerCase().trim(),
      passwordHash: hashedPassword,
      createdAt: new Date(),
    });

    // Give new user 10 free credits
    await ensureCreditBalance(userId);

    return NextResponse.json({ message: "注册成功", userId });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "注册失败，请稍后重试" }, { status: 500 });
  }
}
