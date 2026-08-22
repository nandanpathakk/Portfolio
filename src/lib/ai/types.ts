export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface AIProviderResponse {
  reply?: string;
  error?: string;
  status?: number;
  providerStatus?: number;
}

/** Text deltas in order, as the provider produces them. */
export type AITextStream = AsyncIterable<string>;

/**
 * Either a stream or a failure — never both.
 *
 * Providers resolve this only once the upstream response headers are in, so a
 * failure can still be answered with a real HTTP status. Once `stream` is
 * handed back the status is already committed and later faults have to travel
 * as frames inside the body.
 */
export interface AIStreamResult {
  stream?: AITextStream;
  error?: string;
  status?: number;
  providerStatus?: number;
}
