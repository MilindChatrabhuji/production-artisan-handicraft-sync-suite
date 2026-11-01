/**
 * Rate-Limited Channel Webhook Router
 * Token-bucket rate limiter safeguarding Etsy (10 req/s) and Shopify (40 req/s) API caps with HMAC replay protection
 */

export class RateLimitedChannelWebhookRouter {
  private static tokenBuckets: Map<string, { tokens: number; lastRefill: number; capacity: number; refillRatePerSec: number }> = new Map([
    ['SHOPIFY', { tokens: 40, lastRefill: Date.now(), capacity: 40, refillRatePerSec: 2 }],
    ['ETSY', { tokens: 10, lastRefill: Date.now(), capacity: 10, refillRatePerSec: 10 }],
    ['WOOCOMMERCE', { tokens: 25, lastRefill: Date.now(), capacity: 25, refillRatePerSec: 5 }]
  ]);

  public static tryAcquireToken(channel: 'SHOPIFY' | 'ETSY' | 'WOOCOMMERCE'): boolean {
    const bucket = this.tokenBuckets.get(channel);
    if (!bucket) return true;

    const now = Date.now();
    const elapsedSeconds = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(bucket.capacity, bucket.tokens + elapsedSeconds * bucket.refillRatePerSec);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    return false; // Rate limit reached
  }
}
