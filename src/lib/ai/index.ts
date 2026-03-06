import { ChatMessage, AIProviderResponse } from "./types";
import { generateOpenAIResponse } from "./providers/openai";
import { generateGeminiResponse } from "./providers/gemini";

export async function generateAIResponse(
    systemPrompt: string,
    messages: ChatMessage[]
): Promise<AIProviderResponse> {
    const provider = process.env.AI_PROVIDER || "openai";

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
