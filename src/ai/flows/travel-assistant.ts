'use server';
/**
 * @fileOverview A travel assistant AI agent that can help with a variety of travel-related tasks.
 *
 * - travelAssistant - A function that handles the travel assistance process.
 * - TravelAssistantInput - The input type for the travelAssistant function.
 * - TravelAssistantOutput - The return type for the travelAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TravelAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s request for travel assistance.'),
});
export type TravelAssistantInput = z.infer<typeof TravelAssistantInputSchema>;

const TravelAssistantOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user\'s query.'),
});
export type TravelAssistantOutput = z.infer<
  typeof TravelAssistantOutputSchema
>;

export async function travelAssistant(
  input: TravelAssistantInput
): Promise<TravelAssistantOutput> {
  return travelAssistantFlow(input);
}

const travelAssistantPrompt = ai.definePrompt({
  name: 'travelAssistantPrompt',
  input: { schema: TravelAssistantInputSchema },
  output: { schema: TravelAssistantOutputSchema },
  prompt: `You are an expert travel assistant for the 304Beauty Navigator app, specializing in helping users plan safe and amazing trips. Your tone should be helpful, friendly, and street-smart.

You can handle a wide range of requests, including:
- Finding the best deals on hotels, flights, rental cars, and vacation packages.
- Recommending lodging: hotels, hostels, Airbnbs, motels, camping, lodges.
- Providing safety metrics for locations, with a special emphasis on safety for women and solo travelers. This includes neighborhood safety scores, local crime rates, and specific safety tips.
- Finding restaurants, parks, beaches, resorts, spas, malls, boutiques, and cinemas.
- Locating airports and rental car facilities.

When a user asks a question, provide a comprehensive and actionable response. Be conversational and engaging.

User query: {{{query}}}`,
});

const travelAssistantFlow = ai.defineFlow(
  {
    name: 'travelAssistantFlow',
    inputSchema: TravelAssistantInputSchema,
    outputSchema: TravelAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await travelAssistantPrompt(input);
    return output!;
  }
);
