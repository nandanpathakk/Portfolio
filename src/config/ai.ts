export const AI_RATE_LIMIT_CONFIG = {
    maxRequestsMinutes: 1, // Time window in minutes
    maxRequestsPerWindow: 5, // Limit per IP Address
    rateLimitMessage:
        "Whoa there, speedster! I love chatting, but I need a quick breather. Let's pick this up in a minute! 🛑🏃‍♂️(rate limit exceeded)",
};

export const AI_CONFIG = {
    provider: "gemini",
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    maxOutputTokens: 1500,
    // 0 disables thinking on 2.5 Flash. Thinking tokens come out of
    // maxOutputTokens, so leaving it on can consume the entire budget and
    // return an empty answer. Raise this only alongside maxOutputTokens.
    thinkingBudget: 0,
};
