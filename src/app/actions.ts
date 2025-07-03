'use server';

import { summarizeProductReviews } from '@/ai/flows/summarize-product-reviews';

export async function summarizeReviewsAction(
  productName: string,
  reviews: string
) {
  try {
    const result = await summarizeProductReviews({
      productName,
      reviews,
      realWorldFilters: 'efficacy, common usage errors, best use cases',
    });
    return { summary: result.summary, error: null };
  } catch (error) {
    console.error('Error summarizing reviews:', error);
    return {
      summary: null,
      error: 'Failed to generate summary. Please try again.',
    };
  }
}
