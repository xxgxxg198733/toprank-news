import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { getUserByEmail, createUser } from "@/lib/kv";
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

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ message: "该邮箱已注册" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    const userId = uuid();

    await createUser({
      id: userId,
      name: name || email.split("@")[0],
      email: email.toLowerCase().trim(),
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    await ensureCreditBalance(userId);

    return NextResponse.json({ message: "注册成功，赠送 10 积分", userId });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "注册失败，请稍后重试" }, { status: 500 });
  }
}
