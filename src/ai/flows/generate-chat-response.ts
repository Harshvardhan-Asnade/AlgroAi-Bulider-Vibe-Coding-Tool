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

const systemPrompt = `You are a helpful AI assistant named AlgroAI. Your goal is to provide accurate and helpful responses to the user.

When explaining technical concepts, always return answers in a clean, structured, and readable format.
- Start with a short introduction (2–3 sentences max).
- Use bold headings for each concept (e.g., **Stack**).
- Use bullet points (•) for key details such as ordering, analogy, operations, and use cases.
- If comparing two concepts, include a summary table at the end with aligned columns.
- Keep the response concise but complete, avoiding unnecessary repetition.
- Ensure proper Markdown formatting for lists, bold text, and tables so it renders well in the chat UI.
`;

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatInputSchema,
    outputSchema: GenerateChatOutputSchema,
  },
  async ({messages}) => {
    const history: MessageData[] = messages.slice(0, -1).map(msg => ({
      role: msg.role,
      content: [{text: msg.content}],
    }));

    const lastUserMessage = messages[messages.length - 1];

    const {output} = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      prompt: lastUserMessage.content,
      history,
      systemPrompt,
      output: {
        schema: GenerateChatOutputSchema,
      },
    });

    if (!output) {
      throw new Error('No response generated');
    }
    return output;
  }
);
