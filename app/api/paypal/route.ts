import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addCredits } from "@/lib/credits";

// Credit packages
const PACKAGES: Record<string, { credits: number; price: number; name: string }> = {
  "basic": { credits: 100, price: 20.10, name: "Starter - 100 Credits" },
  "standard": { credits: 500, price: 45, name: "Standard - 500 Credits" },
  "premium": { credits: 1500, price: 80, name: "Premium - 1500 Credits" },
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, pkg, orderId } = body;

    if (action === "create-order") {
      const pkgInfo = PACKAGES[pkg];
      if (!pkgInfo) {
        return NextResponse.json({ error: "无效的套餐" }, { status: 400 });
      }

      // Create PayPal order
      const paypalRes = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [{
            amount: { currency_code: "USD", value: pkgInfo.price.toString() },
            description: pkgInfo.name,
          }],
        }),
      });

      if (!paypalRes.ok) {
        const err = await paypalRes.text();
        console.error("PayPal create order error:", err);
        return NextResponse.json({ error: "PayPal 下单失败" }, { status: 500 });
      }

      const order = await paypalRes.json();
      return NextResponse.json({ orderId: order.id });
    }

    if (action === "capture-order") {
      if (!orderId) {
        return NextResponse.json({ error: "缺少订单 ID" }, { status: 400 });
      }

      // Capture PayPal payment
      const captureRes = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
        },
      });

      if (!captureRes.ok) {
        return NextResponse.json({ error: "支付确认失败" }, { status: 500 });
      }

      const capture = await captureRes.json();
      if (capture.status !== "COMPLETED") {
        return NextResponse.json({ error: "支付未完成" }, { status: 400 });
      }

      // Find which package based on amount
      const amount = Number(capture.purchase_units[0].payments.captures[0].amount.value);
      const pkgEntry = Object.entries(PACKAGES).find(([, v]) => v.price === amount);
      const credits = pkgEntry ? pkgEntry[1].credits : Math.floor(amount * 20); // fallback

      const userId = (session.user as { id: string }).id;
      const newBalance = await addCredits(userId, credits, "purchase", `PayPal 购买 ${credits} 积分`, orderId);

      return NextResponse.json({ success: true, balance: newBalance, credits });
    }

    return NextResponse.json({ error: "无效的操作" }, { status: 400 });
  } catch (error) {
    console.error("PayPal API error:", error);
    return NextResponse.json({ error: "支付处理失败" }, { status: 500 });
  }
}
