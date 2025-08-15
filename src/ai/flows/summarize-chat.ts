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
  title: z.string().describe('A short, clear, and descriptive title for the conversation.'),
});
export type SummarizeChatOutput = z.infer<typeof SummarizeChatOutputSchema>;

export async function summarizeChat(input: SummarizeChatInput): Promise<SummarizeChatOutput> {
  return summarizeChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatPrompt',
  input: {schema: SummarizeChatInputSchema},
  output: {schema: SummarizeChatOutputSchema},
  prompt: `You are an assistant that generates short, clear, and descriptive titles for conversations.
Rules:
- Maximum 5 words
- No punctuation unless necessary
- Capitalize main words
- Make it specific, not generic
- Do not include the words "chat", "conversation", or "discussion"

Example:
User: "Explain closures in JavaScript" → "JavaScript Closures Explained"
User: "Help me debug this React hook" → "Debugging React Hook"
User: "Summarize World War 2 in short" → "WW2 Summary"

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
