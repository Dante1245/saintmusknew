'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating mock purchase notifications from wealthy countries.
 *
 * The flow takes no input and returns a string containing a mock purchase notification.
 * - generateMockPurchaseNotification - A function that generates a mock purchase notification.
 * - GenerateMockPurchaseNotificationInput - The input type for the generateMockPurchaseNotification function (empty object).
 * - GenerateMockPurchaseNotificationOutput - The return type for the generateMockPurchaseNotification function (string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMockPurchaseNotificationInputSchema = z.object({});
export type GenerateMockPurchaseNotificationInput = z.infer<typeof GenerateMockPurchaseNotificationInputSchema>;

const GenerateMockPurchaseNotificationOutputSchema = z.string();
export type GenerateMockPurchaseNotificationOutput = z.infer<typeof GenerateMockPurchaseNotificationOutputSchema>;

export async function generateMockPurchaseNotification(): Promise<GenerateMockPurchaseNotificationOutput> {
  return generateMockPurchaseNotificationFlow({});
}

const wealthyCountries = ['USA', 'Switzerland', 'UAE', 'Norway', 'Germany'];

const prompt = ai.definePrompt({
  name: 'generateMockPurchaseNotificationPrompt',
  input: {schema: GenerateMockPurchaseNotificationInputSchema},
  output: {schema: GenerateMockPurchaseNotificationOutputSchema},
  prompt: `Generate a mock purchase notification from one of the following wealthy countries: {{{wealthyCountries}}}. The notification should sound realistic.`, 
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateMockPurchaseNotificationFlow = ai.defineFlow(
  {
    name: 'generateMockPurchaseNotificationFlow',
    inputSchema: GenerateMockPurchaseNotificationInputSchema,
    outputSchema: GenerateMockPurchaseNotificationOutputSchema,
  },
  async () => {
    const {text} = await prompt({wealthyCountries});
    return text!;
  }
);
