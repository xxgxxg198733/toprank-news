import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addCredits } from "@/lib/credits";

// Credit packages
const PACKAGES: Record<string, { credits: number; price: number; name: string }> = {
  basic: { credits: 100, price: 20.1, name: "Starter - 100 Credits" },
  standard: { credits: 500, price: 45, name: "Standard - 500 Credits" },
  premium: { credits: 1500, price: 80, name: "Premium - 1500 Credits" },
};

// Auto-detect sandbox vs production based on client ID prefix
function getPayPalBase(): string {
  const clientId = process.env.PAYPAL_CLIENT_ID || "";
  // Sandbox client IDs start with "SB" or "BA" (sandbox REST app)
  // Production client IDs start with "AQ" or "AR" or similar
  if (clientId.startsWith("SB") || clientId.startsWith("BA")) {
    return "https://api-m.sandbox.paypal.com";
  }
  return "https://api-m.paypal.com";
}

function getPayPalAuth(): string {
  return Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, pkg, orderId } = body;
    const base = getPayPalBase();
    const auth = getPayPalAuth();

    // Step 1: Create PayPal order
    if (action === "create-order") {
      const pkgInfo = PACKAGES[pkg];
      if (!pkgInfo) {
        return NextResponse.json({ error: "无效的套餐" }, { status: 400 });
      }

      const paypalRes = await fetch(`${base}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: "USD", value: pkgInfo.price.toFixed(2) },
              description: pkgInfo.name,
            },
          ],
          payment_source: {
            paypal: {
              experience_context: {
                return_url: `${getOrigin(request)}/profile?paypal=success`,
                cancel_url: `${getOrigin(request)}/profile?paypal=cancelled`,
              },
            },
          },
        }),
      });

      if (!paypalRes.ok) {
        const errText = await paypalRes.text();
        console.error("PayPal create order error:", paypalRes.status, errText);
        return NextResponse.json(
          { error: `PayPal 下单失败: ${paypalRes.status}` },
          { status: 500 }
        );
      }

      const order = await paypalRes.json();
      // Find the approval URL — PayPal returns rel="payer-action" (v2 REST API)
      const approveLink =
        order.links?.find((l: { rel: string; href: string }) =>
          l.rel === "payer-action" || l.rel === "approve"
        )?.href || null;

      return NextResponse.json({
        orderId: order.id,
        approveUrl: approveLink,
        status: order.status,
      });
    }

    // Step 2: Capture PayPal order (after user approval)
    if (action === "capture-order") {
      if (!orderId) {
        return NextResponse.json({ error: "缺少订单 ID" }, { status: 400 });
      }

      const captureRes = await fetch(
        `${base}/v2/checkout/orders/${orderId}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
        }
      );

      if (!captureRes.ok) {
        const errText = await captureRes.text();
        console.error("PayPal capture error:", captureRes.status, errText);
        return NextResponse.json(
          { error: `支付确认失败: ${captureRes.status}` },
          { status: 500 }
        );
      }

      const capture = await captureRes.json();
      if (capture.status !== "COMPLETED") {
        return NextResponse.json(
          { error: `支付状态: ${capture.status}` },
          { status: 400 }
        );
      }

      // Determine credits from purchase amount
      const paidAmount = parseFloat(
        capture.purchase_units[0].payments.captures[0].amount.value
      );
      const pkgEntry = Object.entries(PACKAGES).find(
        ([, v]) => v.price === paidAmount
      );
      const credits = pkgEntry ? pkgEntry[1].credits : Math.floor(paidAmount * 20);

      const userId = (session.user as { id: string }).id;
      const newBalance = await addCredits(
        userId,
        credits,
        "purchase",
        `PayPal 购买 ${credits} 积分`,
        orderId
      );

      return NextResponse.json({
        success: true,
        balance: newBalance,
        credits,
      });
    }

    return NextResponse.json({ error: "无效的操作" }, { status: 400 });
  } catch (error) {
    console.error("PayPal API error:", error);
    return NextResponse.json({ error: "支付处理失败" }, { status: 500 });
  }
}

function getOrigin(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}
