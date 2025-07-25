'use server';

import { summarizeProductReviews } from '@/ai/flows/summarize-product-reviews';
import { travelAssistant } from '@/ai/flows/travel-assistant';

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

export async function travelAssistantAction(query: string) {
  try {
    const result = await travelAssistant({ query });
    return { response: result.response, error: null };
  } catch (error) {
    console.error('Error in travel assistant:', error);
    return {
      response: null,
      error: 'Failed to get travel assistance. Please try again.',
    };
  }
}
