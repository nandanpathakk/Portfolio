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
