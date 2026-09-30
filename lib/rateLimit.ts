// Simple in-memory fixed-window rate limiter, keyed by caller IP.
// Good enough for a portfolio-scale chat widget on a single warm instance;
// it resets on cold start and isn't shared across instances, so it's a
// best-effort throttle rather than a hard guarantee. If this endpoint ever
// needs to survive real abuse at scale, swap this for a shared store
// (Upstash Redis / Vercel KV) instead of scaling this module up.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;
const MAX_TRACKED_KEYS = 5_000;

type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  // Without a reverse proxy in front of it, local dev has no x-forwarded-for
  // header, so every request would share one bucket and rate-limit each
  // other. This endpoint only needs protecting once it's actually public.
  if (process.env.NODE_ENV !== "production") {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [k, b] of buckets) {
      if (now - b.windowStart >= WINDOW_MS) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
