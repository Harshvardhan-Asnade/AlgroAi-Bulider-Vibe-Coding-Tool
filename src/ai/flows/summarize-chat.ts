'use server';
/**
 * @fileOverview An AI agent that summarizes a chat message into a short title.
 *
 * - summarizeChat - A function that generates a short title for a chat conversation.
 * - SummarizeChatInput - The input type for the summarizeChat function.
 * - SummarizeChatOutput - The return type for the summarizeChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChatInputSchema = z.object({
  message: z.string().describe('The initial message from the user.'),
});
export type SummarizeChatInput = z.infer<typeof SummarizeChatInputSchema>;

const SummarizeChatOutputSchema = z.object({
  title: z.string().describe('A short, concise title for the chat (3-5 words).'),
});
export type SummarizeChatOutput = z.infer<typeof SummarizeChatOutputSchema>;

export async function summarizeChat(input: SummarizeChatInput): Promise<SummarizeChatOutput> {
  return summarizeChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatPrompt',
  input: {schema: SummarizeChatInputSchema},
  output: {schema: SummarizeChatOutputSchema},
  prompt: `Generate a short, concise title (3-5 words) for a chat conversation that starts with the following message.

  Message: {{{message}}}
  `,
});

const summarizeChatFlow = ai.defineFlow(
  {
    name: 'summarizeChatFlow',
    inputSchema: SummarizeChatInputSchema,
    outputSchema: SummarizeChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
