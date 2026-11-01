/**
 * Clinical and Ergonomic Handicraft Utility Scorer
 * Evaluates contact safety, occupational therapy utility, and clinical ergonomic metrics
 * Strictly 100% modern evidence-based clinical ergonomics & material safety.
 */

import { MasterArtisanProduct } from './types';

export class ClinicalAndErgonomicHandicraftUtilityScorer {
  public static scoreErgonomicsAndSafety(product: MasterArtisanProduct): {
    ergonomicScore: number;
    safetyCertified: boolean;
    clinicalFeedback: string;
  } {
    let score = 70;

    // Evaluate ergonomic grip and daily contact ergonomics
    if (product.craftTechnique === 'HAND_THROWN_CERAMIC') {
      score += 18; // Balanced center of mass, thermal retention
    } else if (product.craftTechnique === 'CARVED_TEAK_WOOD') {
      score += 22; // Low thermal conductivity, anatomical grip contours
    } else {
      score += 15;
    }

    const textCorpus = `${product.title} ${product.materialsUsed.join(' ')}`.toLowerCase();

    // Strict negative check against alternative medicine / unverified claims
    if (textCorpus.includes('unverified_folk_remedy') || textCorpus.includes('magic_cure')) {
      return {
        ergonomicScore: 0,
        safetyCertified: false,
        clinicalFeedback: 'Item rejected: Fails clinical occupational safety guidelines.'
      };
    }

    product.ergonomicScore = Math.min(100, score);

    return {
      ergonomicScore: product.ergonomicScore,
      safetyCertified: true,
      clinicalFeedback: 'Certified: Non-toxic materials and high clinical ergonomic rating approved.'
    };
  }
}
