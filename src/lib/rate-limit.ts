import { AI_RATE_LIMIT_CONFIG } from "@/config/ai";

interface RateLimitData {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitData>();

export function checkRateLimit(ip: string): { success: boolean; message?: string } {
    const now = Date.now();
    const windowMs = AI_RATE_LIMIT_CONFIG.maxRequestsMinutes * 60 * 1000;

    let requestData = rateLimitStore.get(ip);

    // If new IP or the time window has passed, reset the count
    if (!requestData || now > requestData.resetTime) {
        requestData = {
            count: 1,
            resetTime: now + windowMs,
        };
        rateLimitStore.set(ip, requestData);
        return { success: true };
    }

    // Increment the count for the current window
    requestData.count++;
    rateLimitStore.set(ip, requestData);

    if (requestData.count > AI_RATE_LIMIT_CONFIG.maxRequestsPerWindow) {
        return {
            success: false,
            message: AI_RATE_LIMIT_CONFIG.rateLimitMessage,
        };
    }

    return { success: true };
}

// Optional cleanup utility for memory management on long-running processes
export function cleanupRateLimitStore() {
    const now = Date.now();
    for (const [ip, data] of rateLimitStore.entries()) {
        if (now > data.resetTime) {
            rateLimitStore.delete(ip);
        }
    }
}
