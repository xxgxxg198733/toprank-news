import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addCredits } from "@/lib/credits";

// Credit packages
const PACKAGES: Record<string, { credits: number; price: number; name: string }> = {
  basic: { credits: 100, price: 20.1, name: "Starter - 100 Credits" },
  standard: { credits: 500, price: 45, name: "Standard - 500 Credits" },
  premium: { credits: 1500, price: 80, name: "Premium - 1500 Credits" },
};

/**
 * Get PayPal API base URL.
 * Priority: PAYPAL_API_BASE env var > auto-detect from client ID > sandbox fallback
 */
function getPayPalBase(): string {
  // Explicit override
  if (process.env.PAYPAL_API_BASE) {
    return process.env.PAYPAL_API_BASE;
  }

  const clientId = process.env.PAYPAL_CLIENT_ID || "";

  // PayPal Sandbox client IDs: start with "SB" or have "sandbox" in them
  // PayPal Live client IDs: start with "AQ", "AR", "Ab", "Af", etc.
  if (clientId.startsWith("SB")) {
    return "https://api-m.sandbox.paypal.com";
  }

  // For any other prefix (BA, A*, etc.) — default to sandbox since
  // sandbox apps can have various prefixes depending on when they were created.
  // Only use production if explicitly set via PAYPAL_API_BASE.
  return "https://api-m.sandbox.paypal.com";
}

async function getPayPalAccessToken(base: string): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || "";
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PayPal auth failed: ${res.status} ${errText}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  let accessToken: string;

  try {
    const base = getPayPalBase();
    accessToken = await getPayPalAccessToken(base);

    const body = await request.json();
    const { action, pkg, orderId } = body;

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
          Authorization: `Bearer ${accessToken}`,
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

      const base = getPayPalBase();
      // Refresh token for capture
      const captureToken = await getPayPalAccessToken(base);

      const captureRes = await fetch(
        `${base}/v2/checkout/orders/${orderId}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${captureToken}`,
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
    const message = error instanceof Error ? error.message : "支付处理失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getOrigin(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}
