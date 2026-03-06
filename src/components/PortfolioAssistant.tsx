"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Sparkles, X, ArrowUpRight } from "lucide-react";

type Role = "user" | "assistant";

type Message = {
  id: string;
  role: Role;
  content: string;
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const SUGGESTIONS = [
  "What are your core skills?",
  "Tell me about your tech stack.",
  "What is your most recent project?",
  "Where are you based?",
];

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggestions state
  const [suggestion, setSuggestion] = useState<string>("");
  const [autocompleteSuggestion, setAutocompleteSuggestion] = useState<string>("");

  const pickRandomSuggestion = () => {
    const random = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    setSuggestion(random);
  };

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (input) {
      setSuggestion(""); // Hide the empty-state suggestion when typing
      const matched = SUGGESTIONS.find((s) =>
        s.toLowerCase().startsWith(input.toLowerCase())
      );
      setAutocompleteSuggestion(matched || "");
    } else {
      setAutocompleteSuggestion("");
    }
  }, [input]);

  const submitFromKeyboard = () => {
    if (!input.trim() || isLoading) return;
    if (!isOpen) setIsOpen(true);
    void sendMessage(input);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: Message = { id: createId(), role: "user", content: trimmed };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setError(null);
      setIsLoading(true);

      try {
        const payload = {
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        };

        const res = await fetch("/api/ai-about", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.status === 429) {
          const data = await res.json();
          setMessages((prev) => [
            ...prev,
            {
              id: createId(),
              role: "assistant",
              content: data.reply || "Whoa there, speedster! I love chatting, but I need a quick breather. Let's pick this up in a minute! 🛑🏃‍♂️(rate limit exceeded)",
            },
          ]);
          return; // Stop here, don't throw an error.
        }

        if (!res.ok) {
          throw new Error("Request failed");
        }

        const data = (await res.json()) as { reply?: string; error?: string };

        // Intentionally do not surface backend / provider specifics in the UI
        if (data.error) {
          throw new Error("temporary-error");
        }

        const replyContent =
          data.reply ??
          "I couldn't generate a response right now. Please try again in a moment.";

        const assistantMessage: Message = {
          id: createId(),
          role: "assistant",
          content: replyContent,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setError("Having a bit of trouble answering right now. Try again in a moment.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!isOpen) setIsOpen(true);
    await sendMessage(input);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
  };

  const hasTyped = input.trim().length > 0;

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-xl px-4 sm:px-0 pointer-events-auto">
        {/* Chat popup — centered with subtle ambient glow */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 20, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 20, scale: 0.96 }
              }
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
              className="pointer-events-auto fixed inset-x-4 sm:inset-x-0 sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 max-w-xl"
            >
              <div className="relative">
                {/* Subtle glow */}
                <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-black/40 blur-3xl opacity-80" />
                <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-primary/20 blur-2xl opacity-70" />

                <div className="relative h-[480px] sm:h-[520px] rounded-2xl bg-background/98 backdrop-blur-xl border border-border/80 shadow-2xl shadow-black/40 flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Sparkles className="h-3 w-3" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                          Ask anything about me
                        </span>
                        <span className="text-[11px] text-muted-foreground/70">
                          Quick answers from my work & experience.
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-border/60 transition-colors"
                      aria-label="Close assistant"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div
                    className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 text-sm"
                    onWheel={(e) => {
                      // prevent wheel events from bubbling to the page while hovering the chat
                      e.stopPropagation();
                    }}
                  >
                    {messages.length === 0 && (
                      <p className="text-sm text-muted-foreground/80 italic">
                        Ask about projects I&apos;ve built, stacks I use day to day, or where I&apos;ve worked.
                      </p>
                    )}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-md px-4 py-2.5 text-sm leading-relaxed ${message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/40 text-foreground border border-border/60"
                            }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                        <span className="flex h-1.5 w-6 items-center justify-between">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.2s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.1s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
                        </span>
                        <span>Piecing this together from my code, projects, and notes…</span>
                      </div>
                    )}
                    {error && (
                      <p className="text-xs text-red-500 font-medium">
                        {error}
                      </p>
                    )}
                    <div ref={messagesEndRef} className="h-px" />
                  </div>

                  <form
                    onSubmit={handleChatSubmit}
                    className="flex items-end gap-2 border-t border-border/70 px-4 py-3 relative"
                  >
                    <div className="relative flex-1">
                      {suggestion && !input && (
                        <div className="absolute inset-0 pointer-events-none text-sm text-primary/40 px-1 py-1 flex items-start">
                          <span>{suggestion}</span>
                          <span className="ml-2 text-[10px] uppercase tracking-wider bg-primary/10 px-1.5 py-0.5 rounded text-primary/50 border border-primary/20">Tab</span>
                        </div>
                      )}

                      {input && autocompleteSuggestion && input.toLowerCase() !== autocompleteSuggestion.toLowerCase() && (
                        <div className="absolute inset-0 pointer-events-none text-sm text-primary/40 px-1 py-1 px-[5px] whitespace-pre flex overflow-hidden">
                          <span className="opacity-0">{input}</span>
                          <span>{autocompleteSuggestion.slice(input.length)}</span>
                          <span className="ml-2 mt-[2px] text-[10px] uppercase tracking-wider bg-primary/10 px-1.5 py-0.5 rounded text-primary/50 border border-primary/20 shrink-0">Tab</span>
                        </div>
                      )}

                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          if (inputRef.current) {
                            inputRef.current.style.height = "0px";
                            const next = Math.min(inputRef.current.scrollHeight, 120);
                            inputRef.current.style.height = `${next}px`;
                          }
                        }}
                        onFocus={() => {
                          if (!suggestion && messages.length === 0) {
                            pickRandomSuggestion();
                          }
                        }}
                        onBlur={() => {
                          if (!input) setSuggestion("");
                        }}
                        rows={1}
                        placeholder={suggestion ? "" : "Ask a follow-up…"}
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 resize-none max-h-32 leading-relaxed px-1 py-1 relative z-10"
                        aria-label="Ask about Nandan"
                        onKeyDown={(e) => {
                          if (e.key === "Tab") {
                            e.preventDefault();
                            if (!input && suggestion) {
                              setInput(suggestion);
                              if (inputRef.current) {
                                inputRef.current.style.height = "0px";
                                inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                              }
                            } else if (input && autocompleteSuggestion) {
                              setInput(autocompleteSuggestion);
                              if (inputRef.current) {
                                inputRef.current.style.height = "0px";
                                inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                              }
                            }
                          } else if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submitFromKeyboard();
                          }
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 disabled:bg-transparent disabled:text-muted-foreground transition-colors mb-1"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating search bar — only when chat is closed */}
        {!isOpen && (
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 18, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
            className="flex items-center gap-3 rounded-full bg-card/90 backdrop-blur-md border border-border px-4 py-2.5 shadow-lg"
          >
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/15 text-primary">
              <Search className="h-3.5 w-3.5" />
            </div>
            <div className="relative flex-1 flex items-center">
              {suggestion && !input && (
                <div className="absolute inset-0 pointer-events-none text-xs sm:text-sm text-primary/50 flex flex-nowrap items-center overflow-hidden">
                  <span className="truncate">{suggestion}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-wider bg-primary/10 px-1.5 py-0.5 rounded text-primary/60 border border-primary/20 shrink-0">Tab</span>
                </div>
              )}

              {input && autocompleteSuggestion && input.toLowerCase() !== autocompleteSuggestion.toLowerCase() && (
                <div className="absolute inset-0 pointer-events-none text-xs sm:text-sm text-primary/50 whitespace-pre flex flex-nowrap overflow-hidden items-center">
                  <span className="opacity-0">{input}</span>
                  <span className="truncate">{autocompleteSuggestion.slice(input.length)}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-wider bg-primary/10 px-1.5 py-0.5 rounded text-primary/60 border border-primary/20 shrink-0">Tab</span>
                </div>
              )}

              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (inputRef.current) {
                    inputRef.current.style.height = "0px";
                    const next = Math.min(inputRef.current.scrollHeight, 80);
                    inputRef.current.style.height = `${next}px`;
                  }
                }}
                onFocus={() => {
                  if (messages.length > 0) {
                    setIsOpen(true);
                  } else if (!suggestion) {
                    pickRandomSuggestion();
                  }
                }}
                onBlur={() => {
                  if (!input) setSuggestion("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    if (!input && suggestion) {
                      setInput(suggestion);
                      if (inputRef.current) {
                        inputRef.current.style.height = "0px";
                        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                      }
                    } else if (input && autocompleteSuggestion) {
                      setInput(autocompleteSuggestion);
                      if (inputRef.current) {
                        inputRef.current.style.height = "0px";
                        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
                      }
                    }
                  } else if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitFromKeyboard();
                  }
                }}
                rows={1}
                placeholder={suggestion ? "" : "Ask anything about me"}
                className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-muted-foreground/70 resize-none max-h-20 leading-relaxed block overflow-hidden mt-[2px] relative z-10"
                aria-label="Ask anything about Nandan"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !hasTyped}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/60 disabled:opacity-40 disabled:hover:text-muted-foreground disabled:hover:border-border transition-colors"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}


