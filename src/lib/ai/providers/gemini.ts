import { ChatMessage, AIStreamResult, AITextStream } from "../types";
import { AI_CONFIG } from "@/config/ai";

/** How long to wait for the upstream response headers. */
const HEADER_TIMEOUT_MS = 20_000;
/** How long a started stream may go silent before we give up on it. */
const IDLE_TIMEOUT_MS = 20_000;

type GeminiPart = { text?: string; thought?: boolean };

type GeminiUsage = {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
    /** Present when the provider served part of the prompt from its cache. */
    cachedContentTokenCount?: number;
};

type GeminiChunk = {
    candidates?: { content?: { parts?: GeminiPart[] }; finishReason?: string }[];
    promptFeedback?: { blockReason?: string };
    usageMetadata?: GeminiUsage;
};

/** The answer, minus any reasoning parts a thinking model emits alongside it. */
function textFromChunk(chunk: GeminiChunk): string {
    const parts = chunk.candidates?.[0]?.content?.parts ?? [];

    return parts
        .filter((part) => !part.thought && typeof part.text === "string")
        .map((part) => part.text)
        .join("");
}

/**
 * Gemini's SSE frames arrive as `data: {json}` lines that can be split across
 * network chunks, so lines are assembled in a buffer before being parsed.
 */
async function* readEventStream(
    body: ReadableStream<Uint8Array>,
    controller: AbortController,
): AITextStream {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let finishReason: string | undefined;
    let usage: GeminiUsage | undefined;
    let emitted = false;

    let idle = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS);
    const keepAlive = () => {
        clearTimeout(idle);
        idle = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS);
    };

    try {
        for (;;) {
            const { done, value } = await reader.read();
            if (done) break;

            keepAlive();
            buffer += decoder.decode(value, { stream: true });

            let newline: number;
            while ((newline = buffer.indexOf("\n")) !== -1) {
                const line = buffer.slice(0, newline).trim();
                buffer = buffer.slice(newline + 1);

                if (!line.startsWith("data:")) continue;

                const payload = line.slice(5).trim();
                if (!payload || payload === "[DONE]") continue;

                let chunk: GeminiChunk;
                try {
                    chunk = JSON.parse(payload);
                } catch {
                    continue; // A frame we can't read is not worth failing over.
                }

                finishReason =
                    chunk.promptFeedback?.blockReason ??
                    chunk.candidates?.[0]?.finishReason ??
                    finishReason;

                // Only the closing chunks carry usage; keep the latest.
                usage = chunk.usageMetadata ?? usage;

                const text = textFromChunk(chunk);
                if (text) {
                    emitted = true;
                    yield text;
                }
            }
        }

        if (!emitted) {
            console.error(
                "Gemini streamed no text. Reason:",
                finishReason ?? "EMPTY_RESPONSE",
            );
        }

        if (usage) {
            // What each answer actually costs. `cached` above zero means the
            // provider recognised the system prompt and billed it at a discount.
            console.info(
                `[chat] in=${usage.promptTokenCount ?? "?"} out=${usage.candidatesTokenCount ?? "?"
                } cached=${usage.cachedContentTokenCount ?? 0} finish=${finishReason ?? "?"}`,
            );
        }
    } finally {
        clearTimeout(idle);
        reader.cancel().catch(() => { });
    }
}

export async function streamGeminiResponse(
    systemPrompt: string,
    messages: ChatMessage[],
): Promise<AIStreamResult> {
    const apiKey = AI_CONFIG.apiKey;

    if (!apiKey) {
        return { error: "Gemini API key is missing.", status: 500 };
    }

    const controller = new AbortController();
    const headerTimeout = setTimeout(() => controller.abort(), HEADER_TIMEOUT_MS);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.model}:streamGenerateContent?alt=sse&key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                signal: controller.signal,
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    contents: messages.map((m) => ({
                        role: m.role === "assistant" ? "model" : "user",
                        parts: [{ text: m.content }],
                    })),
                    generationConfig: {
                        maxOutputTokens: AI_CONFIG.maxOutputTokens,
                        temperature: 0.45,
                        // 2.5 Flash bills thinking against maxOutputTokens. Left on,
                        // it can spend the whole budget reasoning and stream nothing.
                        thinkingConfig: { thinkingBudget: AI_CONFIG.thinkingBudget },
                    },
                }),
            },
        );

        if (!response.ok || !response.body) {
            let message = "Failed to contact Gemini provider.";
            const providerStatus = response.status;

            try {
                const errorJson = await response.json();
                if (errorJson?.error?.message) message = errorJson.error.message;
            } catch {
                // ignore JSON parse errors
            }

            console.error("Gemini error:", providerStatus, message);

            return {
                error: message,
                providerStatus,
                status:
                    providerStatus === 401 ? 401 : providerStatus === 429 ? 429 : 502,
            };
        }

        // Headers are in; from here the idle watchdog owns the abort controller.
        clearTimeout(headerTimeout);

        return { stream: readEventStream(response.body, controller) };
    } catch (err: unknown) {
        clearTimeout(headerTimeout);

        // Node throws a DOMException here, not necessarily an Error subclass.
        if ((err as { name?: string })?.name === "AbortError") {
            console.error("Gemini request timed out before responding.");
            return { error: "The AI provider took too long to respond.", status: 504 };
        }

        console.error("Gemini fetch error:", err);
        return {
            error: "Something went wrong while communicating with Gemini.",
            status: 500,
        };
    }
}
