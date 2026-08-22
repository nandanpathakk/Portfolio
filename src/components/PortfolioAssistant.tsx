"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { Markdown } from "@/components/ui/Markdown";

type Role = "user" | "assistant";

/** Photos the API decided belong with a reply — see `chatMedia` in projects data. */
type Gallery = {
  title: string;
  href?: string;
  aspect: "landscape" | "portrait" | "square";
  fit: "cover" | "contain";
  images: { url: string; caption?: string }[];
};

/** A section of the page this reply says is worth a look. */
type NavTarget = { id: string; label: string };

type Message = {
  id: string;
  role: Role;
  content: string;
  galleries?: Gallery[];
  sections?: NavTarget[];
};

const ASPECT_CLASS: Record<Gallery["aspect"], string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[9/16]",
  square: "aspect-square",
};

function ProjectGallery({ gallery }: { gallery: Gallery }) {
  const { images, aspect, fit, title, href } = gallery;
  const portrait = aspect === "portrait";
  // Three landscape shots read better as a hero plus two supporting frames.
  const hero = !portrait && images.length === 3;

  return (
    <figure className="mt-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
      <figcaption className="mb-2 flex items-center justify-between gap-3 px-0.5">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80">
          {title}
        </span>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
          >
            Case study
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        )}
      </figcaption>

      <div
        className={`grid gap-2 ${
          portrait
            ? "grid-cols-3 max-w-[360px]"
            : hero || images.length === 2
              ? "grid-cols-2"
              : "grid-cols-1"
        }`}
      >
        {images.map((image, index) => {
          const isHero = hero && index === 0;

          return (
            <div
              key={image.url}
              className={`relative overflow-hidden rounded-md border border-white/[0.06] bg-black/25 ${ASPECT_CLASS[aspect]} ${
                isHero ? "col-span-2" : ""
              }`}
            >
              <Image
                src={image.url}
                alt={image.caption ?? `${title} screenshot`}
                title={image.caption}
                fill
                sizes={
                  isHero
                    ? "(max-width: 640px) 90vw, 560px"
                    : "(max-width: 640px) 45vw, 300px"
                }
                className={fit === "contain" ? "object-contain" : "object-cover"}
              />
            </div>
          );
        })}
      </div>
    </figure>
  );
}

const CHIP_CLASS =
  "group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-primary/90 hover:border-primary/50 hover:bg-primary/[0.12] transition-colors";

/**
 * The sections live on the home page, but the assistant is mounted in the root
 * layout and so also appears on case studies. From home this is a plain anchor,
 * which <ScrollManager /> intercepts document-wide for a Lenis-aware scroll
 * that handles reduced motion, background tabs and late-mounting targets. From
 * anywhere else it has to be a real navigation, and ScrollManager picks the
 * hash up again once the home page mounts.
 */
function SectionLink({
  target,
  onNavigate,
}: {
  target: NavTarget;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  const label = (
    <>
      Take me to {target.label}
      <ArrowDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
    </>
  );

  return pathname === "/" ? (
    <a href={`#${target.id}`} onClick={onNavigate} className={CHIP_CLASS}>
      {label}
    </a>
  ) : (
    <Link href={`/#${target.id}`} onClick={onNavigate} className={CHIP_CLASS}>
      {label}
    </Link>
  );
}

/**
 * The starter prompts, stacked above the bar.
 *
 * Chips suppress mousedown so the input never loses focus — a blur would tear
 * the panel down before the click could land.
 */
function SuggestionPanel({
  suggestions,
  activeIndex,
  reducedMotion,
  onPick,
  onHover,
}: {
  suggestions: string[];
  activeIndex: number;
  reducedMotion: boolean | null;
  onPick: (value: string) => void;
  onHover: (index: number) => void;
}) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
      id="assistant-suggestions"
      className="mb-2.5 flex flex-col gap-1.5"
      role="listbox"
      aria-label="Suggested questions"
    >
      {suggestions.map((suggestion, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={suggestion}
            id={`assistant-suggestion-${index}`}
            type="button"
            role="option"
            aria-selected={isActive}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => onHover(index)}
            onClick={() => onPick(suggestion)}
            className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm backdrop-blur-md transition-colors ${isActive
              ? "border-primary/40 bg-primary/[0.09] text-foreground"
              : "border-border bg-card/90 text-muted-foreground hover:text-foreground hover:border-primary/25"
              }`}
          >
            <Sparkles
              className={`h-3 w-3 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground/50"
                }`}
            />
            <span className="min-w-0 flex-1 truncate">{suggestion}</span>
            {isActive && (
              <span className="hidden sm:inline-block shrink-0 rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary/60">
                Tab
              </span>
            )}
          </button>
        );
      })}
    </motion.div>
  );
}

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Ordered as a first impression: the opening three each demonstrate something
 * the assistant can do that a plain chat box cannot — the first two return
 * project photos, the third answers and then offers to scroll you there.
 */
const SUGGESTIONS = [
  "What projects has Nandan built?",
  "Tell me about Doodle.",
  "Where has he worked?",
  "What's his tech stack?",
  "How is Nudge different from a normal assistant?",
  "What is he like to work with?",
  "How do I get in touch?",
];

/** How many to offer at once. Three fits above the bar on a phone. */
const SUGGESTION_COUNT = 3;

function matchingSuggestions(input: string): string[] {
  const query = input.trim().toLowerCase();

  const pool = query
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query))
    : SUGGESTIONS;

  return pool.slice(0, SUGGESTION_COUNT);
}

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  // Separate refs on purpose. A single shared one breaks on close: the panel's
  // exit animation keeps the chat textarea mounted while the bar is already
  // back, so the chat's ref cleanup fires last and nulls the bar's element.
  const searchInputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Follow a streaming reply, but stop fighting the user once they scroll up.
  const stickToBottom = useRef(true);

  // Suggestions state
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shortcutKey, setShortcutKey] = useState("");

  const suggestions = matchingSuggestions(input);
  // Only before the first question: once there's a thread, focusing the bar
  // reopens the conversation instead.
  const showSuggestions =
    !isOpen && isFocused && messages.length === 0 && suggestions.length > 0;

  useEffect(() => {
    const el = scrollRef.current;
    // Setting scrollTop directly, rather than scrollIntoView: a smooth scroll
    // per frame stutters badly while text is streaming in.
    if (isOpen && el && stickToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Filtering can shorten the list out from under the highlight.
  useEffect(() => {
    setActiveIndex(0);
  }, [input]);

  // Resolved after mount: reading the platform during render would not match
  // what the server produced.
  useEffect(() => {
    const isApple = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setShortcutKey(isApple ? "⌘" : "Ctrl ");
  }, []);

  // ⌘K / Ctrl-K reaches the assistant from anywhere on the page. Once there is
  // a conversation it reopens it, rather than dropping you on an empty bar.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;

      e.preventDefault();

      if (isOpen || messages.length > 0) setIsOpen(true);
      else searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, messages.length]);

  // Opening the chat should put the cursor where you can type. This also
  // covers ⌘K, whose textarea does not exist yet at the moment it fires.
  useEffect(() => {
    if (!isOpen) return;

    setIsFocused(false); // the bar unmounted without ever firing blur

    // A timer rather than rAF: animation frames are suspended in a background
    // tab, which would leave the reopened chat without a cursor.
    const timer = setTimeout(() => chatInputRef.current?.focus(), 0);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const resizeInput = (el: HTMLTextAreaElement | null, max: number) => {
    if (!el) return;

    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  };

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

        // A stalled request must never leave the dots spinning forever.
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30_000);

        let res: Response;
        try {
          res = await fetch("/api/ai-about", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }

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

        if (!res.ok || !res.body) {
          throw new Error("Request failed");
        }

        const assistantId = createId();

        // Deltas land far faster than the screen refreshes, so they're buffered
        // and committed once per frame instead of once per token.
        let pending = "";
        let frame = 0;

        const commit = () => {
          frame = 0;
          if (!pending) return;

          const chunk = pending;
          pending = "";

          setMessages((prev) => {
            const last = prev[prev.length - 1];

            return last?.id === assistantId
              ? [...prev.slice(0, -1), { ...last, content: last.content + chunk }]
              : [...prev, { id: assistantId, role: "assistant", content: chunk }];
          });
        };

        const schedule = () => {
          if (!frame) frame = requestAnimationFrame(commit);
        };

        const flush = () => {
          if (frame) cancelAnimationFrame(frame);
          commit();
        };

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let failed = false;

        const handle = (frameJson: string) => {
          const parsed = JSON.parse(frameJson) as
            | { type: "delta"; text: string }
            | { type: "done"; galleries?: Gallery[]; sections?: NavTarget[] }
            | { type: "error"; message: string };

          if (parsed.type === "delta") {
            pending += parsed.text;
            schedule();
            return;
          }

          flush();

          if (parsed.type === "error") {
            failed = true;
            return;
          }

          const { galleries, sections } = parsed;

          if (galleries?.length || sections?.length) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                    ...m,
                    ...(galleries?.length ? { galleries } : {}),
                    ...(sections?.length ? { sections } : {}),
                  }
                  : m,
              ),
            );
          }
        };

        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let newline: number;
            while ((newline = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, newline).trim();
              buffer = buffer.slice(newline + 1);
              if (line) handle(line);
            }
          }
        } finally {
          flush();
        }

        // Intentionally do not surface backend / provider specifics in the UI
        if (failed) {
          throw new Error("temporary-error");
        }
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
  // The reply bubble only appears with the first token, so until then the
  // dots stand in for it.
  const isAwaitingFirstToken =
    isLoading && messages[messages.length - 1]?.role !== "assistant";

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-xl px-4 sm:px-0 pointer-events-auto">
        {/* Chat popup — centered with subtle ambient glow */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              aria-hidden
              className="pointer-events-auto fixed inset-0 bg-background/60 backdrop-blur-[2px]"
            />
          )}
          {isOpen && (
            <motion.div
              key="panel"
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
              className="pointer-events-auto fixed inset-x-4 sm:inset-x-0 sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 w-auto sm:w-full sm:max-w-2xl"
            >
              <div className="relative">
                {/* Subtle glow */}
                <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-black/40 blur-3xl opacity-80" />
                <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-primary/20 blur-2xl opacity-70" />

                <div className="relative h-[min(78vh,620px)] rounded-2xl bg-card/95 backdrop-blur-2xl border border-white/[0.09] ring-1 ring-black/40 shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
                  {/* Hairline of light along the top edge — lifts the panel off the page */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.015]">
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
                    ref={scrollRef}
                    className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-5 text-sm"
                    onScroll={(e) => {
                      const el = e.currentTarget;
                      stickToBottom.current =
                        el.scrollHeight - el.scrollTop - el.clientHeight < 80;
                    }}
                    onWheel={(e) => {
                      // prevent wheel events from bubbling to the page while hovering the chat
                      e.stopPropagation();
                    }}
                  >
                    {messages.length === 0 && (
                      <p className="max-w-md text-sm leading-relaxed text-muted-foreground/80 italic">
                        Ask about projects I&apos;ve built, stacks I use day to day, or where I&apos;ve worked.
                      </p>
                    )}
                    {messages.map((message) =>
                      message.role === "user" ? (
                        <div key={message.id} className="flex justify-end">
                          <div className="max-w-[80%] rounded-lg rounded-br-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                      ) : (
                        <div key={message.id} className="flex justify-start">
                          <div className="w-full max-w-[92%] rounded-lg rounded-bl-sm border border-white/[0.07] bg-white/[0.035] px-4 py-3.5 text-sm text-foreground/90">
                            <Markdown content={message.content} />
                            {message.galleries?.map((gallery) => (
                              <ProjectGallery
                                key={gallery.title}
                                gallery={gallery}
                              />
                            ))}
                            {message.sections?.length ? (
                              <div className="mt-3.5 flex flex-wrap gap-2">
                                {message.sections.map((target) => (
                                  <SectionLink
                                    key={target.id}
                                    target={target}
                                    onNavigate={() => setIsOpen(false)}
                                  />
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ),
                    )}
                    {isAwaitingFirstToken && (
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
                  </div>

                  <form
                    onSubmit={handleChatSubmit}
                    className="flex items-end gap-2 border-t border-white/[0.07] bg-white/[0.015] px-5 py-3.5 relative"
                  >
                    <div className="relative flex-1">
                      <textarea
                        ref={chatInputRef}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          resizeInput(chatInputRef.current, 120);
                        }}
                        rows={1}
                        placeholder="Ask a follow-up…"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 resize-none max-h-32 leading-relaxed px-1 py-1 relative z-10"
                        aria-label="Ask about Nandan"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
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

        {/* Starter prompts, above the bar */}
        <AnimatePresence>
          {showSuggestions && (
            <SuggestionPanel
              suggestions={suggestions}
              activeIndex={activeIndex}
              reducedMotion={reducedMotion}
              onHover={setActiveIndex}
              onPick={(value) => {
                setIsOpen(true);
                void sendMessage(value);
              }}
            />
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
              <textarea
                ref={searchInputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  resizeInput(searchInputRef.current, 80);
                }}
                onFocus={() => {
                  // Once a conversation exists, the bar reopens it rather than
                  // starting over from the suggestions.
                  if (messages.length > 0) setIsOpen(true);
                  else setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  const options = showSuggestions ? suggestions : [];

                  if (options.length && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                    e.preventDefault();
                    setActiveIndex(
                      (current) =>
                        (current + (e.key === "ArrowDown" ? 1 : -1) + options.length) %
                        options.length,
                    );
                    return;
                  }

                  if (e.key === "Tab" && options[activeIndex]) {
                    e.preventDefault();
                    setInput(options[activeIndex]);
                    requestAnimationFrame(() =>
                      resizeInput(searchInputRef.current, 80),
                    );
                    return;
                  }

                  if (e.key === "Escape" && showSuggestions) {
                    e.preventDefault();
                    setIsFocused(false);
                    searchInputRef.current?.blur();
                    return;
                  }

                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitFromKeyboard();
                  }
                }}
                rows={1}
                placeholder="Ask anything about me"
                aria-label="Ask anything about Nandan"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                aria-controls={showSuggestions ? "assistant-suggestions" : undefined}
                aria-activedescendant={
                  showSuggestions ? `assistant-suggestion-${activeIndex}` : undefined
                }
                className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-muted-foreground/70 resize-none max-h-20 leading-relaxed block overflow-hidden mt-[2px] relative z-10"
              />
            </div>
            {/* Shortcut hint — only where a keyboard exists, and only while idle. */}
            {shortcutKey && !hasTyped && !showSuggestions && (
              <kbd className="hidden md:inline-flex shrink-0 items-center rounded-md border border-border bg-muted/60 px-2 py-1 font-mono text-xs leading-none text-muted-foreground shadow-sm">
                {shortcutKey}K
              </kbd>
            )}
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


