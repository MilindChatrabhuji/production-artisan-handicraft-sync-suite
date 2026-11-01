/**
 * Production Artisan Handicraft Store Catalog & Multi-Channel Inventory Sync Suite
 * Core TypeScript Definitions
 */

export interface MasterArtisanProduct {
  masterSku: string;
  title: string;
  artisanName: string;
  provenanceRegion: string;
  craftTechnique: 'HAND_THROWN_CERAMIC' | 'CARVED_TEAK_WOOD' | 'HAND_LOOM_WEAVE' | 'BRASS_LOST_WAX_CAST';
  totalPhysicalStock: number;
  reservedStock: number;
  availableStock: number;
  basePriceUsd: number;
  basePriceInr: number;
  materialsUsed: string[];
  isNonToxicCertified: boolean;
  ergonomicScore: number; // 0 - 100
  channels: ChannelMapping[];
}

export interface ChannelMapping {
  channelName: 'SHOPIFY' | 'ETSY' | 'WOOCOMMERCE' | 'AMAZON_HANDMADE';
  channelListingId: string;
  channelSku: string;
  channelPrice: number;
  lastSyncedTimestamp: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'ERROR';
}

export interface StockReservationRequest {
  requestId: string;
  masterSku: string;
  channelSource: 'SHOPIFY' | 'ETSY' | 'WOOCOMMERCE';
  quantityToReserve: number;
  orderReference: string;
  timestamp: string;
}

export interface StockReservationResult {
  success: boolean;
  masterSku: string;
  remainingAvailableStock: number;
  lockedQuantity: number;
  message: string;
}

export interface ChannelSyncPayload {
  channel: 'SHOPIFY' | 'ETSY' | 'WOOCOMMERCE';
  channelListingId: string;
  updatedStock: number;
  price: number;
  title: string;
  descriptionHtml: string;
  tags: string[];
}
