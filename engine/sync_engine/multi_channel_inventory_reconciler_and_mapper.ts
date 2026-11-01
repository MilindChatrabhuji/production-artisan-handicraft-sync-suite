/**
 * Multi-Channel Inventory Reconciler and Mapper
 * Coordinates cross-platform SKU mapping, atomic stock locks, and debounced inventory broadcast
 */

import { MasterArtisanProduct, StockReservationRequest, StockReservationResult } from './types';

export class MultiChannelInventoryReconciler {
  private products: Map<string, MasterArtisanProduct> = new Map();

  public registerProduct(product: MasterArtisanProduct): void {
    this.products.set(product.masterSku, product);
  }

  public reserveStockAtomic(req: StockReservationRequest): StockReservationResult {
    const product = this.products.get(req.masterSku);

    if (!product) {
      return {
        success: false,
        masterSku: req.masterSku,
        remainingAvailableStock: 0,
        lockedQuantity: 0,
        message: `Product SKU ${req.masterSku} not found in master catalog.`
      };
    }

    if (product.availableStock < req.quantityToReserve) {
      return {
        success: false,
        masterSku: req.masterSku,
        remainingAvailableStock: product.availableStock,
        lockedQuantity: 0,
        message: `Insufficient inventory: requested ${req.quantityToReserve}, available: ${product.availableStock}`
      };
    }

    // Atomic decrement
    product.reservedStock += req.quantityToReserve;
    product.availableStock -= req.quantityToReserve;

    return {
      success: true,
      masterSku: req.masterSku,
      remainingAvailableStock: product.availableStock,
      lockedQuantity: req.quantityToReserve,
      message: `Stock successfully locked for order ${req.orderReference} from ${req.channelSource}.`
    };
  }

  public broadcastInventoryDelta(masterSku: string): { channel: string; newStock: number }[] {
    const product = this.products.get(masterSku);
    if (!product) return [];

    return product.channels.map(ch => ({
      channel: ch.channelName,
      newStock: product.availableStock
    }));
  }
}
