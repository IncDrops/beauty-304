'use server';
/**
 * @fileOverview Provides AI-powered summaries of product reviews, incorporating real-world filters.
 *
 * - summarizeProductReviews - A function that generates concise summaries of product reviews.
 * - SummarizeProductReviewsInput - The input type for the summarizeProductReviews function.
 * - SummarizeProductReviewsOutput - The return type for the summarizeProductReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductReviewsInputSchema = z.object({
  productName: z.string().describe('The name of the product to summarize reviews for.'),
  reviews: z.string().describe('The reviews of the product.'),
  realWorldFilters: z.string().describe('Real-world filters such as efficacy, common usage errors, and best use cases.'),
});
export type SummarizeProductReviewsInput = z.infer<typeof SummarizeProductReviewsInputSchema>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the product reviews incorporating real-world filters.'),
});
export type SummarizeProductReviewsOutput = z.infer<typeof SummarizeProductReviewsOutputSchema>;

export async function summarizeProductReviews(input: SummarizeProductReviewsInput): Promise<SummarizeProductReviewsOutput> {
  return summarizeProductReviewsFlow(input);
}

const summarizeProductReviewsPrompt = ai.definePrompt({
  name: 'summarizeProductReviewsPrompt',
  input: {schema: SummarizeProductReviewsInputSchema},
  output: {schema: SummarizeProductReviewsOutputSchema},
  prompt: `Summarize the following product reviews for {{productName}}, incorporating the following real-world filters: {{realWorldFilters}}:\n\nReviews: {{reviews}}`,
});

const summarizeProductReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeProductReviewsFlow',
    inputSchema: SummarizeProductReviewsInputSchema,
    outputSchema: SummarizeProductReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeProductReviewsPrompt(input);
    return output!;
  }
);
