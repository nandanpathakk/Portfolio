"use client";

import { Fragment, ReactNode, memo } from "react";

/**
 * A deliberately small markdown renderer for assistant replies.
 *
 * It covers what the model actually emits — bold, italics, inline code, links,
 * lists, headings, fenced code and rules — and nothing else. Everything is built
 * as React elements rather than injected HTML, so a reply can never smuggle
 * markup into the page.
 */

// Order matters: the widest fence wins, so ***both*** is tried before **bold**,
// and the bold bodies are lazy rather than asterisk-free so that
// `**bold with *emphasis* inside**` isn't torn apart by the italic rule.
const INLINE_SOURCE =
    /(\*\*\*[^\n]+?\*\*\*|\*\*[^\n]+?\*\*|__[^\n]+?__|\*[^*\n]+\*|_[^_\n]+_|~~[^~\n]+~~|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\))/
        .source;

/**
 * A fresh regex per call. `renderInline` recurses into itself for nested
 * markup, and a shared /g regex would have its `lastIndex` rewound by the
 * nested call — leaving the outer loop matching the same token forever.
 */
const inlinePattern = () => new RegExp(INLINE_SOURCE, "g");

/** Only ever hand the browser a scheme we chose. */
function safeHref(href: string): string | null {
    const value = href.trim();
    if (/^(https?:\/\/|mailto:)/i.test(value)) return value;
    // "//host/path" is protocol-relative: it looks internal but resolves to
    // another origin, so it must not pass the same-site check below.
    if (value.startsWith("//")) return null;
    if (value.startsWith("/") || value.startsWith("#")) return value;
    return null;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    const pattern = inlinePattern();
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let i = 0;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        const token = match[0];
        const key = `${keyPrefix}-i${i++}`;

        if (token.startsWith("***")) {
            nodes.push(
                <strong key={key} className="font-semibold text-foreground">
                    <em className="italic">{renderInline(token.slice(3, -3), key)}</em>
                </strong>,
            );
        } else if (token.startsWith("**") || token.startsWith("__")) {
            nodes.push(
                <strong key={key} className="font-semibold text-foreground">
                    {renderInline(token.slice(2, -2), key)}
                </strong>,
            );
        } else if (token.startsWith("~~")) {
            nodes.push(
                <span key={key} className="line-through opacity-70">
                    {renderInline(token.slice(2, -2), key)}
                </span>,
            );
        } else if (token.startsWith("`")) {
            nodes.push(
                <code
                    key={key}
                    className="rounded bg-white/[0.07] border border-white/[0.06] px-1.5 py-0.5 font-mono text-[0.82em] text-primary/90"
                >
                    {token.slice(1, -1)}
                </code>,
            );
        } else if (token.startsWith("[")) {
            const split = token.indexOf("](");
            const label = token.slice(1, split);
            const href = safeHref(token.slice(split + 2, -1));

            nodes.push(
                href ? (
                    <a
                        key={key}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
                    >
                        {renderInline(label, key)}
                    </a>
                ) : (
                    <Fragment key={key}>{label}</Fragment>
                ),
            );
        } else {
            // *italic* / _italic_
            nodes.push(
                <em key={key} className="italic">
                    {renderInline(token.slice(1, -1), key)}
                </em>,
            );
        }

        lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes;
}

type Block =
    | { kind: "p"; lines: string[] }
    | { kind: "heading"; level: number; text: string }
    | { kind: "list"; ordered: boolean; items: string[] }
    | { kind: "code"; lines: string[] }
    | { kind: "quote"; lines: string[] }
    | { kind: "rule" };

function parseBlocks(source: string): Block[] {
    const lines = source.replace(/\r\n/g, "\n").split("\n");
    const blocks: Block[] = [];
    let current: Block | null = null;

    const flush = () => {
        if (current) blocks.push(current);
        current = null;
    };

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];

        // Fenced code runs until its closing fence, verbatim.
        if (/^\s*```/.test(line)) {
            flush();
            const body: string[] = [];
            index++;
            while (index < lines.length && !/^\s*```/.test(lines[index])) {
                body.push(lines[index]);
                index++;
            }
            blocks.push({ kind: "code", lines: body });
            continue;
        }

        if (!line.trim()) {
            flush();
            continue;
        }

        if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
            flush();
            blocks.push({ kind: "rule" });
            continue;
        }

        const heading = line.match(/^\s*(#{1,4})\s+(.*)$/);
        if (heading) {
            flush();
            blocks.push({
                kind: "heading",
                level: heading[1].length,
                text: heading[2].trim(),
            });
            continue;
        }

        const bullet = line.match(/^\s*[-*+]\s+(.*)$/);
        if (bullet) {
            if (current?.kind === "list" && !current.ordered) {
                current.items.push(bullet[1]);
            } else {
                flush();
                current = { kind: "list", ordered: false, items: [bullet[1]] };
            }
            continue;
        }

        const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
        if (numbered) {
            if (current?.kind === "list" && current.ordered) {
                current.items.push(numbered[1]);
            } else {
                flush();
                current = { kind: "list", ordered: true, items: [numbered[1]] };
            }
            continue;
        }

        const quote = line.match(/^\s*>\s?(.*)$/);
        if (quote) {
            if (current?.kind === "quote") {
                current.lines.push(quote[1]);
            } else {
                flush();
                current = { kind: "quote", lines: [quote[1]] };
            }
            continue;
        }

        if (current?.kind === "p") {
            current.lines.push(line.trim());
        } else {
            flush();
            current = { kind: "p", lines: [line.trim()] };
        }
    }

    flush();
    return blocks;
}

/**
 * Memoised on `content`. A streaming reply re-renders the thread on every
 * flush, and without this every finished message would be re-parsed each time.
 */
export const Markdown = memo(function Markdown({ content }: { content: string }) {
    const blocks = parseBlocks(content);

    return (
        <div className="space-y-3 leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {blocks.map((block, index) => {
                const key = `b${index}`;

                switch (block.kind) {
                    case "heading": {
                        const size =
                            block.level <= 2
                                ? "text-[0.95rem]"
                                : "text-[0.875rem]";
                        return (
                            <p
                                key={key}
                                className={`${size} font-display font-normal text-foreground pt-1`}
                            >
                                {renderInline(block.text, key)}
                            </p>
                        );
                    }

                    case "list":
                        return (
                            <ul key={key} className="space-y-1.5 pl-1">
                                {block.items.map((item, itemIndex) => (
                                    <li
                                        key={`${key}-${itemIndex}`}
                                        className="flex gap-2.5"
                                    >
                                        <span
                                            className="shrink-0 select-none text-primary/70 font-mono text-[0.75em] pt-[0.35em]"
                                            aria-hidden
                                        >
                                            {block.ordered ? `${itemIndex + 1}.` : "—"}
                                        </span>
                                        <span className="min-w-0">
                                            {renderInline(item, `${key}-${itemIndex}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        );

                    case "code":
                        return (
                            <pre
                                key={key}
                                className="overflow-x-auto rounded-md border border-white/[0.07] bg-black/30 px-3 py-2.5 font-mono text-[0.78rem] leading-relaxed text-foreground/85"
                            >
                                <code>{block.lines.join("\n")}</code>
                            </pre>
                        );

                    case "quote":
                        return (
                            <blockquote
                                key={key}
                                className="border-l-2 border-primary/40 pl-3 text-muted-foreground italic"
                            >
                                {renderInline(block.lines.join(" "), key)}
                            </blockquote>
                        );

                    case "rule":
                        return (
                            <hr key={key} className="border-white/[0.07]" />
                        );

                    default:
                        return (
                            <p key={key}>
                                {renderInline(block.lines.join(" "), key)}
                            </p>
                        );
                }
            })}
        </div>
    );
});
