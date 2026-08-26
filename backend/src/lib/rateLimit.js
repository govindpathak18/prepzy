import { rateLimit, ipKeyGenerator } from "express-rate-limit";

// express-rate-limit exports SECOND/MINUTE/HOUR/DAY constants, but they're
// marked @deprecated with no replacement announced yet - using plain
// milliseconds here instead so this doesn't break on a future major version.
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

// Prefer the authenticated Clerk user id over IP, so limits are tied to an
// account rather than a shared/rotating network address. clerkMiddleware()
// always runs before either limiter below, so req.auth() is available here
// even when the request turns out to be unauthenticated.
const keyGenerator = (req) => {
  const userId = req.auth?.()?.userId;
  return userId || ipKeyGenerator(req.ip);
};

// Keep error responses in the same { message } shape as the rest of the API.
const jsonRateLimitHandler = (_req, res) => {
  res.status(429).json({ message: "Too many requests, please try again later." });
};

// Baseline limiter for the consumer-facing API (/api/chat, /api/sessions).
// Generous on purpose - this is a safety net against runaway loops or
// scraping, not a throttle on normal use. /api/inngest is intentionally not
// covered by this: that's Inngest's own signature-verified webhook traffic,
// not a consumer-facing route.
export const generalLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_MS,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: jsonRateLimitHandler,
});

// Stricter limiter for the two endpoints with a real cost/abuse profile:
// creating a session spins up a Stream video call + chat channel (Stream
// bills on usage), and join-by-code is a code lookup worth guarding against
// brute-force enumeration.
export const sensitiveActionLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_MS,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: jsonRateLimitHandler,
});
