'use server';
/**
 * @fileOverview A conversational AI agent for the chatbot.
 *
 * - generateChatResponse - A function that generates a response based on the chat history.
 * - GenerateChatInput - The input type for the generateChatResponse function.
 * - GenerateChatOutput - The return type for the generateChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {MessageData, z} from 'genkit';

const GenerateChatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ),
});
export type GenerateChatInput = z.infer<typeof GenerateChatInputSchema>;

const GenerateChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user.'),
});
export type GenerateChatOutput = z.infer<typeof GenerateChatOutputSchema>;

export async function generateChatResponse(input: GenerateChatInput): Promise<GenerateChatOutput> {
  return generateChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatResponsePrompt',
  input: {schema: GenerateChatInputSchema},
  output: {schema: GenerateChatOutputSchema},
  prompt: `You are a helpful AI assistant named AlgroAI. Your goal is to provide accurate and helpful responses to the user.
  
  History:
  {{#each messages}}
  {{role}}: {{{content}}}
  {{/each}}
  `,
});

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatInputSchema,
    outputSchema: GenerateChatOutputSchema,
  },
  async input => {
    const history: MessageData[] = input.messages.map(msg => ({
      role: msg.role,
      content: [{text: msg.content}],
    }));

    const {output} = await prompt(input);
    return { response: output!.response };
  }
);
