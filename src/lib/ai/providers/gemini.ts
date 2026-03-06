import { ChatMessage, AIProviderResponse } from "../types";
import { AI_CONFIG } from "@/config/ai";

export async function generateGeminiResponse(
    systemPrompt: string,
    messages: ChatMessage[]
): Promise<AIProviderResponse> {
    const apiKey = AI_CONFIG.apiKey

    if (!apiKey) {
        return {
            error: "Gemini API key is missing.",
            status: 500,
        };
    }

    try {
        const formattedMessages = messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.model}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: systemPrompt }],
                    },
                    contents: formattedMessages,
                    generationConfig: {
                        maxOutputTokens: 400,
                        temperature: 0.45,
                    },
                }),
            }
        );

        if (!response.ok) {
            let message = "Failed to contact Gemini provider.";
            const providerStatus = response.status;

            try {
                const errorJson = await response.json();
                if (errorJson?.error?.message) {
                    message = errorJson.error.message;
                }
            } catch {
                // ignore JSON parse errors
            }

            const status =
                providerStatus === 401 ? 401 : providerStatus === 429 ? 429 : 502;

            return { error: message, providerStatus, status };
        }

        const data = await response.json();
        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ??
            "I couldn't generate a response right now. Please try again in a moment.";

        return { reply };
    } catch (err: unknown) {
        console.error("Gemini fetch error:", err);
        return {
            error: "Something went wrong while communicating with Gemini.",
            status: 500,
        };
    }
}
