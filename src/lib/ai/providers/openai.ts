import { ChatMessage, AIProviderResponse } from "../types";

export async function generateOpenAIResponse(
    systemPrompt: string,
    messages: ChatMessage[]
): Promise<AIProviderResponse> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return {
            error: "OpenAI API key is missing.",
            status: 500,
        };
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: systemPrompt }, ...messages],
                max_tokens: 400,
                temperature: 0.45,
            }),
        });

        if (!response.ok) {
            let message = "Failed to contact OpenAI provider.";
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
            data?.choices?.[0]?.message?.content ??
            "I couldn't generate a response right now. Please try again in a moment.";

        return { reply };
    } catch (err: unknown) {
        console.error("OpenAI fetch error:", err);
        return {
            error: "Something went wrong while communicating with OpenAI.",
            status: 500,
        };
    }
}
