import { ChatMessage, AIProviderResponse } from "./types";
import { generateOpenAIResponse } from "./providers/openai";
import { generateGeminiResponse } from "./providers/gemini";
import { AI_CONFIG } from "@/config/ai";

export async function generateAIResponse(
    systemPrompt: string,
    messages: ChatMessage[]
): Promise<AIProviderResponse> {
    const provider = AI_CONFIG.provider || "gemini"

    if (provider === "gemini") {
        return generateGeminiResponse(systemPrompt, messages);
    }

    if (provider === "openai") {
        return generateOpenAIResponse(systemPrompt, messages);
    }

    return {
        error: `Unsupported AI provider configured: ${provider}`,
        status: 500,
    };
}

export type { ChatMessage, AIProviderResponse };
