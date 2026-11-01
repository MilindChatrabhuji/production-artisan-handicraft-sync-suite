# Deployment Manual - Production Artisan Handicraft Sync Suite

## Prerequisites
- Node.js v18+ LTS
- Cloudflare Wrangler CLI (`npm install -g wrangler`)
- Cloudflare Free Tier Account

## Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/MilindChatrabhuji/production-artisan-handicraft-sync-suite.git
   cd production-artisan-handicraft-sync-suite
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run verification test runner:
   ```bash
   node engine/sync_engine/demo_runner.js
   ```

## Cloudflare Workers Edge Deployment
1. Initialize Cloudflare D1 database:
   ```bash
   npx wrangler d1 create handicraft_db
   ```
2. Apply SQL schema migration:
   ```bash
   npx wrangler d1 execute handicraft_db --file=engine/edge_sync_gateway/schema.sql
   ```
3. Deploy edge worker:
   ```bash
   npx wrangler deploy
   ```
