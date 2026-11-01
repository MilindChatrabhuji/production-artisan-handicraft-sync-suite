-- Cloudflare D1 SQL Schema for Artisan Handicraft Multi-Channel Sync Suite

CREATE TABLE IF NOT EXISTS artisan_products (
    master_sku TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    artisan_name TEXT NOT NULL,
    provenance_region TEXT NOT NULL,
    craft_technique TEXT NOT NULL,
    total_physical_stock INTEGER DEFAULT 0,
    reserved_stock INTEGER DEFAULT 0,
    available_stock INTEGER DEFAULT 0,
    base_price_usd REAL NOT NULL,
    base_price_inr REAL NOT NULL,
    is_non_toxic_certified INTEGER DEFAULT 1,
    ergonomic_score INTEGER DEFAULT 85,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory_channels (
    channel_id TEXT PRIMARY KEY,
    master_sku TEXT NOT NULL,
    channel_name TEXT NOT NULL,
    channel_listing_id TEXT NOT NULL,
    channel_sku TEXT NOT NULL,
    last_synced_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sync_events (
    event_id TEXT PRIMARY KEY,
    master_sku TEXT NOT NULL,
    source_channel TEXT NOT NULL,
    quantity_change INTEGER NOT NULL,
    remaining_stock INTEGER NOT NULL,
    timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agency_retainers (
    retainer_id TEXT PRIMARY KEY,
    cooperative_name TEXT NOT NULL,
    tier TEXT NOT NULL,
    monthly_fee_usd REAL NOT NULL,
    active_channel_count INTEGER DEFAULT 3,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_artisan ON artisan_products(artisan_name);
CREATE INDEX IF NOT EXISTS idx_sync_sku ON sync_events(master_sku);
