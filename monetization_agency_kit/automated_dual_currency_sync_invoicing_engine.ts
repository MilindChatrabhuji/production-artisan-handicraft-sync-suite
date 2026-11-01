/**
 * Automated Dual-Currency Sync Invoicing Engine
 * Generates compliant commercial pro-forma and tax invoices for Sync software packs and agency retainers
 */

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  currency: 'USD' | 'INR';
}

export interface InvoiceRecord {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceLineItem[];
  currency: 'USD' | 'INR';
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paymentHandle: string;
  notes: string;
}

export class AutomatedDualCurrencySyncInvoicingEngine {
  public static generateInvoice(
    clientName: string,
    clientEmail: string,
    tier: 'SINGLE_PACK' | 'MASTER_SUITE' | 'STARTER_RETAINER' | 'PRO_RETAINER' | 'GLOBAL_RETAINER',
    currency: 'USD' | 'INR'
  ): InvoiceRecord {
    const invoiceNum = `INV-SYNC-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];

    let unitPrice = 0;
    let description = '';

    if (currency === 'USD') {
      switch (tier) {
        case 'SINGLE_PACK':
          unitPrice = 9.00;
          description = 'Artisan Handicraft Sync Suite Component Pack (Single License)';
          break;
        case 'MASTER_SUITE':
          unitPrice = 19.00;
          description = 'Artisan Handicraft Store & Multi-Channel Sync Suite Master Suite (Commercial License)';
          break;
        case 'STARTER_RETAINER':
          unitPrice = 500.00;
          description = 'Monthly Agency Handicraft Sync Starter Retainer (2 Channels / 50 SKUs)';
          break;
        case 'PRO_RETAINER':
          unitPrice = 1500.00;
          description = 'Monthly Agency Handicraft Sync Professional Retainer (4 Channels / 250 SKUs)';
          break;
        case 'GLOBAL_RETAINER':
          unitPrice = 3000.00;
          description = 'Monthly Agency Handicraft Sync Global Cooperative Retainer (Unlimited Channels)';
          break;
      }
    } else {
      switch (tier) {
        case 'SINGLE_PACK':
          unitPrice = 750.00;
          description = 'Artisan Handicraft Sync Suite Component Pack (Single License)';
          break;
        case 'MASTER_SUITE':
          unitPrice = 1599.00;
          description = 'Artisan Handicraft Store & Multi-Channel Sync Suite Master Suite (Commercial License)';
          break;
        case 'STARTER_RETAINER':
          unitPrice = 41500.00;
          description = 'Monthly Agency Handicraft Sync Starter Retainer';
          break;
        case 'PRO_RETAINER':
          unitPrice = 124500.00;
          description = 'Monthly Agency Handicraft Sync Professional Retainer';
          break;
        case 'GLOBAL_RETAINER':
          unitPrice = 249000.00;
          description = 'Monthly Agency Handicraft Sync Global Cooperative Retainer';
          break;
      }
    }

    const paymentHandle = currency === 'USD'
      ? 'PayPal: milind.chatrabhuji@gmail.com'
      : 'UPI: milind.chatrabhuji@okhdfcbank';

    return {
      invoiceNumber: invoiceNum,
      date: date,
      clientName: clientName,
      clientEmail: clientEmail,
      items: [{ description, quantity: 1, unitPrice, currency }],
      currency: currency,
      subtotal: unitPrice,
      taxAmount: 0,
      totalAmount: unitPrice,
      paymentHandle: paymentHandle,
      notes: 'Full 30-day money-back guarantee if duplicate overselling occurs due to sync latency.'
    };
  }
}
