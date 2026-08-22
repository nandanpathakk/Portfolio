import { ChatMessage, AIStreamResult } from "./types";
import { streamOpenAIResponse } from "./providers/openai";
import { streamGeminiResponse } from "./providers/gemini";
import { AI_CONFIG } from "@/config/ai";

export async function streamAIResponse(
    systemPrompt: string,
    messages: ChatMessage[]
): Promise<AIStreamResult> {
    const provider = AI_CONFIG.provider || "gemini"

    if (provider === "gemini") {
        return streamGeminiResponse(systemPrompt, messages);
    }

    if (provider === "openai") {
        return streamOpenAIResponse(systemPrompt, messages);
    }

    return {
        error: `Unsupported AI provider configured: ${provider}`,
        status: 500,
    };
}

export type { ChatMessage, AIStreamResult };
