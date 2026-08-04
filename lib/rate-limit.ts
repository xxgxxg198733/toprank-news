import "server-only";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  interval?: number; // milliseconds
  maxRequests?: number;
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const { interval = 60000, maxRequests = 20 } = options;
  const now = Date.now();

  let entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + interval };
    rateLimitMap.set(ip, entry);
  }

  entry.count++;
  const remaining = Math.max(0, maxRequests - entry.count);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  return {
    allowed: entry.count <= maxRequests,
    remaining,
    resetAt: entry.resetAt,
  };
}

export function getClientIp(request: Request): string {
  // Try common headers for real IP
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
