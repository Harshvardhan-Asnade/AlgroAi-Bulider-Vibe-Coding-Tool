"use server";

import { generateCode } from "@/ai/flows/generate-code-from-prompt";
import { suggestSecurityFeatures } from "@/ai/flows/suggest-security-features";
import { generateChatResponse } from "@/ai/flows/generate-chat-response";

import { z } from "zod";

const formSchema = z.object({
  prompt: z.string().min(1),
});

const chatSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['user', 'model']),
            content: z.string(),
        })
    ),
});

export async function handlePrompt(input: { prompt: string }) {
  try {
    const validatedInput = formSchema.parse(input);
    const prompt = validatedInput.prompt;

    const securityPromise = suggestSecurityFeatures({ prompt });
    const codePromise = generateCode({ prompt });

    const [securityResult, codeResult] = await Promise.all([securityPromise, codePromise]);
    
    if (!codeResult || !codeResult.code) {
        throw new Error("AI failed to generate code.");
    }

    if (!securityResult || !securityResult.securitySuggestions) {
        throw new Error("AI failed to generate security suggestions.");
    }
    
    return {
      success: true,
      data: {
        code: codeResult.code,
        securitySuggestions: securityResult.securitySuggestions,
        reasoning: securityResult.reasoning,
      },
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred. Please try again.";
    return { success: false, error: errorMessage };
  }
}


export async function handleChat(input: { messages: { role: 'user' | 'model', content: string }[] }) {
    try {
        const validatedInput = chatSchema.parse(input);
        const result = await generateChatResponse(validatedInput);
        
        if (!result || !result.response) {
            throw new Error("AI failed to generate a response.");
        }

        return {
            success: true,
            data: {
                response: result.response,
            },
        };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred. Please try again.";
        return { success: false, error: errorMessage };
    }
}
