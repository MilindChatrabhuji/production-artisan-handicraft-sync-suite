/**
 * Channel Catalog Transformer and Enricher
 * Formats master catalog data into platform-specific structures for Etsy, Shopify, and WooCommerce
 */

import { MasterArtisanProduct, ChannelSyncPayload } from './types';

export class ChannelCatalogTransformer {
  public static toShopifyPayload(product: MasterArtisanProduct): ChannelSyncPayload {
    return {
      channel: 'SHOPIFY',
      channelListingId: product.channels.find(c => c.channelName === 'SHOPIFY')?.channelListingId || 'sh_0',
      updatedStock: product.availableStock,
      price: product.basePriceUsd,
      title: `${product.title} — Handcrafted by ${product.artisanName}`,
      descriptionHtml: `<p><strong>Artisan Origin:</strong> ${product.provenanceRegion}</p><p>Crafted using sustainable techniques. Ergonomic score: ${product.ergonomicScore}/100.</p>`,
      tags: ['handicraft', 'fair-trade', 'sustainable-craft', 'artisan-made']
    };
  }

  public static toEtsyPayload(product: MasterArtisanProduct): ChannelSyncPayload {
    return {
      channel: 'ETSY',
      channelListingId: product.channels.find(c => c.channelName === 'ETSY')?.channelListingId || 'etsy_0',
      updatedStock: product.availableStock,
      price: product.basePriceUsd,
      title: `${product.title} Hand Carved Artisan ${product.provenanceRegion}`,
      descriptionHtml: `Handcrafted collectible by ${product.artisanName}. Made with organic materials.`,
      tags: ['handmade', 'artisan', 'fair trade', 'natural materials']
    };
  }

  public static toWooCommercePayload(product: MasterArtisanProduct): ChannelSyncPayload {
    return {
      channel: 'WOOCOMMERCE',
      channelListingId: product.channels.find(c => c.channelName === 'WOOCOMMERCE')?.channelListingId || 'woo_0',
      updatedStock: product.availableStock,
      price: product.basePriceUsd,
      title: product.title,
      descriptionHtml: `<p>Authentic Artisan Collection. Material safety certified.</p>`,
      tags: ['artisan', 'craft', 'eco-friendly']
    };
  }
}
