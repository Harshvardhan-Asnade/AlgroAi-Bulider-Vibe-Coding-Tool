'use server';

/**
 * @fileOverview An AI agent that suggests security features based on user prompts.
 *
 * - suggestSecurityFeatures - A function that handles the security feature suggestion process.
 * - SuggestSecurityFeaturesInput - The input type for the suggestSecurityFeatures function.
 * - SuggestSecurityFeaturesOutput - The return type for the suggestSecurityFeatures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSecurityFeaturesInputSchema = z.object({
  prompt: z.string().describe('The user prompt describing the application idea.'),
});
export type SuggestSecurityFeaturesInput = z.infer<typeof SuggestSecurityFeaturesInputSchema>;

const SuggestSecurityFeaturesOutputSchema = z.object({
  securitySuggestions: z
    .array(z.string())
    .describe('An array of security features suggested for the application.'),
  reasoning: z.string().describe('The reasoning behind suggesting these security features.'),
});
export type SuggestSecurityFeaturesOutput = z.infer<typeof SuggestSecurityFeaturesOutputSchema>;

export async function suggestSecurityFeatures(
  input: SuggestSecurityFeaturesInput
): Promise<SuggestSecurityFeaturesOutput> {
  return suggestSecurityFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSecurityFeaturesPrompt',
  input: {schema: SuggestSecurityFeaturesInputSchema},
  output: {schema: SuggestSecurityFeaturesOutputSchema},
  prompt: `You are a security expert who analyzes user prompts for application ideas and suggests relevant security features.

  Based on the following user prompt, suggest a list of security features that should be implemented in the application. Also, provide a brief reasoning for each suggested feature.

  Prompt: {{{prompt}}}

  Format your response as a JSON object with 'securitySuggestions' (an array of strings) and 'reasoning' (a string explaining the suggestions).
  `,
});

const suggestSecurityFeaturesFlow = ai.defineFlow(
  {
    name: 'suggestSecurityFeaturesFlow',
    inputSchema: SuggestSecurityFeaturesInputSchema,
    outputSchema: SuggestSecurityFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
