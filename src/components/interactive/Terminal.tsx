"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { LINKS } from "../config/links";

interface Command {
    command: string;
    output: React.ReactNode;
}

const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 text-xs font-mono">
        {children}
    </span>
);

export default function Terminal() {
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Game state
    const [gameMenuActive, setGameMenuActive] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [targetNumber, setTargetNumber] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [rpsActive, setRpsActive] = useState(false);
    const [rpsScore, setRpsScore] = useState({ player: 0, computer: 0, ties: 0 });

    const initialMessage: Command = {
        command: "init",
        output: (
            <div className="space-y-2">
                <pre className="text-xs text-primary font-bold leading-snug select-none">{`
 ███╗   ██╗██████╗
 ████╗  ██║██╔══██╗
 ██╔██╗ ██║██████╔╝
 ██║╚██╗██║██╔═══╝
 ██║ ╚████║██║
 ╚═╝  ╚═══╝╚═╝     `}</pre>
                <p className="text-foreground">nandan@portfolio <span className="text-muted-foreground">— full-stack developer</span></p>
                <p className="text-muted-foreground text-sm">Type <span className="text-primary">help</span> to see available commands, or <span className="text-primary">fetch</span> for system info.</p>
            </div>
        ),
    };

    const [history, setHistory] = useState<Command[]>([initialMessage]);

    const commands: Record<string, React.ReactNode> = {
        help: (
            <div className="space-y-1">
                <p className="text-foreground mb-2">Available commands:</p>
                <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] gap-x-4 gap-y-1.5">
                    <span className="text-primary">about</span><span className="text-muted-foreground">Who is Nandan?</span>
                    <span className="text-primary">fetch</span><span className="text-muted-foreground">System info card</span>
                    <span className="text-primary">stack</span><span className="text-muted-foreground">Full stack breakdown by layer</span>
                    <span className="text-primary">skills</span><span className="text-muted-foreground">Tech I work with</span>
                    <span className="text-primary">experience</span><span className="text-muted-foreground">Work history</span>
                    <span className="text-primary">projects</span><span className="text-muted-foreground">Things I&apos;ve built</span>
                    <span className="text-primary">ls</span><span className="text-muted-foreground">List portfolio sections</span>
                    <span className="text-primary">git log</span><span className="text-muted-foreground">Commit history</span>
                    <span className="text-primary">contact</span><span className="text-muted-foreground">Ping me</span>
                    <span className="text-primary">game</span><span className="text-muted-foreground">Play interactive games</span>
                    <span className="text-primary">clear</span><span className="text-muted-foreground">Reset terminal</span>
                </div>
            </div>
        ),

        about: (
            <div className="space-y-1.5">
                <p>
                    <span className="text-foreground font-bold">Nandan Pathak</span>
                    <span className="text-muted-foreground"> — developer based in India.</span>
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                    I build things — UIs, APIs, databases, real-time systems, mobile apps.
                    If it can be coded and shipped, I&apos;m probably into it.
                </p>
            </div>
        ),

        fetch: (
            <div className="space-y-0.5 text-sm font-mono">
                <p className="text-foreground font-bold mb-2">nandan@portfolio</p>
                <div className="h-px bg-border mb-2 max-w-[260px]" />
                <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[90px_1fr] gap-x-3 gap-y-1">
                    <span className="text-primary">role</span>
                    <span className="text-muted-foreground">developer</span>
                    <span className="text-primary">location</span>
                    <span className="text-muted-foreground">india 🇮🇳</span>
                    <span className="text-primary">builds</span>
                    <span className="text-muted-foreground">web apps · mobile apps · APIs · CLIs</span>
                    <span className="text-primary">languages</span>
                    <span className="text-muted-foreground">typescript · javascript · c#</span>
                    <span className="text-primary">stack</span>
                    <span className="text-muted-foreground">react · next.js · node.js · .net</span>
                    <span className="text-primary">data</span>
                    <span className="text-muted-foreground">postgresql · mongodb · supabase · prisma</span>
                    <span className="text-primary">infra</span>
                    <span className="text-muted-foreground">azure · docker · vercel</span>
                    <span className="text-primary">editor</span>
                    <span className="text-muted-foreground">vs code</span>
                    <span className="text-primary">shell</span>
                    <span className="text-muted-foreground">zsh + coffee</span>
                    <span className="text-primary">status</span>
                    <span className="text-primary">open to opportunities ✦</span>
                </div>
                <div className="h-px bg-border mt-2 mb-1 max-w-[260px]" />
                <div className="flex gap-1.5 mt-1">
                    {["#F59E0B","#3B82F6","#10B981","#EF4444","#8B5CF6","#EC4899"].map(c => (
                        <span key={c} className="w-3.5 h-3.5 rounded-sm inline-block" style={{ background: c }} />
                    ))}
                </div>
            </div>
        ),

        stack: (
            <div className="space-y-3 text-sm">
                <p className="text-foreground mb-1">Full stack breakdown:</p>
                <div className="space-y-2.5">
                    <div>
                        <p className="text-muted-foreground text-xs mb-1.5 uppercase tracking-widest">Frontend</p>
                        <div className="flex flex-wrap gap-1.5">
                            {["React","Next.js","TypeScript","Tailwind CSS","Framer Motion","Redux","Zustand"].map(s => <Tag key={s}>{s}</Tag>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs mb-1.5 uppercase tracking-widest">Backend</p>
                        <div className="flex flex-wrap gap-1.5">
                            {["Node.js","Express",".NET","REST APIs","WebSockets"].map(s => <Tag key={s}>{s}</Tag>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs mb-1.5 uppercase tracking-widest">Database</p>
                        <div className="flex flex-wrap gap-1.5">
                            {["PostgreSQL","MongoDB","Prisma","Supabase"].map(s => <Tag key={s}>{s}</Tag>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs mb-1.5 uppercase tracking-widest">Infrastructure</p>
                        <div className="flex flex-wrap gap-1.5">
                            {["Azure","Docker","Vercel","GitHub Actions"].map(s => <Tag key={s}>{s}</Tag>)}
                        </div>
                    </div>
                </div>
            </div>
        ),

        skills: (
            <div className="space-y-2 text-sm">
                <p className="text-muted-foreground text-xs mb-2">Run <span className="text-primary">stack</span> for the full breakdown, or:</p>
                <div className="flex flex-wrap gap-1.5">
                    {["React","Next.js","TypeScript","Node.js",".NET","PostgreSQL","MongoDB","Docker","Azure","Prisma","Supabase","Tailwind"].map(s => (
                        <Tag key={s}>{s}</Tag>
                    ))}
                </div>
            </div>
        ),

        experience: (
            <div className="text-sm space-y-1">
                <p className="text-muted-foreground">Work history lives in the Experience section above ↑</p>
                <p className="text-muted-foreground/50 text-xs">Scroll up or click &apos;Experience&apos; in the nav.</p>
            </div>
        ),

        projects: (
            <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Three things I&apos;ve shipped:</p>
                <div className="space-y-2">
                    <div className="grid grid-cols-[70px_1fr] gap-2">
                        <span className="text-primary">Doodle</span>
                        <span className="text-muted-foreground">Canvas drawing tool — Next.js, Zustand, HTML Canvas</span>
                    </div>
                    <div className="grid grid-cols-[70px_1fr] gap-2">
                        <span className="text-primary">Peg</span>
                        <span className="text-muted-foreground">AI-powered GitHub issue estimator — OpenAI API, Supabase</span>
                    </div>
                    <div className="grid grid-cols-[70px_1fr] gap-2">
                        <span className="text-primary">Chatbox</span>
                        <span className="text-muted-foreground">Real-time chat — Next.js, Pusher, WebSockets</span>
                    </div>
                </div>
                <p className="text-muted-foreground/50 text-xs mt-1">Scroll to &apos;Selected Work&apos; for details ↑</p>
            </div>
        ),

        ls: (
            <div className="text-sm font-mono space-y-0.5">
                <p className="text-muted-foreground text-xs mb-1">total 6</p>
                {[
                    { name: "about/",      desc: "the human behind the code" },
                    { name: "experience/", desc: "companies I've shipped at" },
                    { name: "skills/",     desc: "things I actually know" },
                    { name: "projects/",   desc: "stuff I built and shipped" },
                    { name: "terminal/",   desc: "you are here 📍" },
                    { name: "contact/",    desc: "let's talk" },
                ].map(({ name, desc }) => (
                    <div key={name} className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="text-primary">{name}</span>
                        <span className="text-muted-foreground">{desc}</span>
                    </div>
                ))}
            </div>
        ),

        "git log": (
            <div className="text-xs font-mono space-y-1.5 leading-relaxed">
                {[
                    { hash: "a3f2c1b", branch: "HEAD → main", msg: "feat: shipped Chatbox — real-time WebSockets" },
                    { hash: "e8d7a6f", branch: null,           msg: "feat: built Peg with OpenAI + Supabase backend" },
                    { hash: "c9b8a7d", branch: null,           msg: "chore: survived a production .NET codebase" },
                    { hash: "d4c3b2a", branch: null,           msg: "feat: launched Doodle — canvas tool on Next.js" },
                    { hash: "f1e0b9a", branch: null,           msg: "chore: joined a startup as software developer" },
                    { hash: "g2f1c0b", branch: null,           msg: "feat: landed first dev internship — shipped to prod" },
                    { hash: "h3a0d9c", branch: null,           msg: "chore: decided frontend-only was too limiting" },
                    { hash: "i4b9e8d", branch: null,           msg: "init: wrote first 'Hello World' in HTML" },
                ].map(({ hash, branch, msg }) => (
                    <div key={hash} className="flex gap-2 flex-wrap">
                        <span className="text-yellow-500">*</span>
                        <span className="text-yellow-600">{hash}</span>
                        {branch && <span className="text-primary">({branch})</span>}
                        <span className="text-muted-foreground">{msg}</span>
                    </div>
                ))}
            </div>
        ),

        contact: (
            <span>
                Drop a line: <a href={`mailto:${LINKS.EMAIL}`} className="text-primary hover:underline">{LINKS.EMAIL}</a>
                <span className="text-muted-foreground"> · or find me on </span>
                <a href={LINKS.GITHUB} target="_blank" className="text-primary hover:underline">GitHub</a>
                <span className="text-muted-foreground"> / </span>
                <a href={LINKS.LINKEDIN} target="_blank" className="text-primary hover:underline">LinkedIn</a>
            </span>
        ),

        // Easter eggs — not listed in help
        whoami: (
            <span className="text-foreground">nandan <span className="text-muted-foreground">— developer, perpetual side-project builder</span></span>
        ),
        pwd: <span className="text-muted-foreground">/portfolio/nandan-pathak</span>,
        sudo: <span className="text-red-400">Permission denied: you&apos;re not root. (Nice try though.)</span>,
        vim: <span className="text-yellow-400">You&apos;re in vim now. Good luck getting out. Try <span className="text-foreground">:q!</span> ... or don&apos;t.</span>,
        "npm install nandan": (
            <div className="text-xs font-mono space-y-1">
                <p className="text-muted-foreground">added 4 packages in 0.8s</p>
                {["curiosity@latest","typescript@5.0.0","coffee@∞","shipping-speed@fast"].map(p => (
                    <p key={p}><span className="text-green-400">+</span> {p}</p>
                ))}
            </div>
        ),
        "cat README.md": (
            <div className="text-sm space-y-1.5 max-w-md">
                <p className="text-foreground font-bold"># nandan-pathak</p>
                <p className="text-muted-foreground">Developer. Builds things — apps, APIs, tools, whatever needs building.</p>
                <p className="text-muted-foreground">**Stack:** React · Next.js · Node.js · .NET · PostgreSQL · React Native</p>
                <p className="text-muted-foreground">**Builds:** web, mobile, backend, realtime systems</p>
                <p className="text-primary text-xs mt-1">See also: fetch, stack, projects</p>
            </div>
        ),
        ping: <span className="text-green-400">pong! 🏓 (latency: 0ms — you&apos;re already here)</span>,
        uname: <span className="text-muted-foreground">NandanOS 1.0.0 — powered by TypeScript and stubbornness</span>,
        uptime: <span className="text-muted-foreground">up 1 year, still shipping</span>,
        game: null,
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Arrow up/down for command history
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex] ?? "");
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIndex = Math.max(historyIndex - 1, -1);
            setHistoryIndex(newIndex);
            setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
            return;
        }

        if (e.key !== "Enter") return;
        e.preventDefault();

        const trimmedInput = input.trim().toLowerCase();

        // Handle game menu
        if (gameMenuActive) {
            if (trimmedInput === "1" || trimmedInput === "number" || trimmedInput === "guess") {
                setGameMenuActive(false);
                const newTarget = Math.floor(Math.random() * 100) + 1;
                setTargetNumber(newTarget);
                setAttempts(0);
                setGameActive(true);
                setGameWon(false);
                const output = (
                    <div className="space-y-1.5 border-l-2 border-primary pl-3">
                        <p className="text-primary font-bold">🎯 Number Guessing</p>
                        <p>Guess a number between <span className="text-foreground">1</span> and <span className="text-foreground">100</span>.</p>
                        <p className="text-xs text-muted-foreground">Type your guess and press Enter.</p>
                    </div>
                );
                setHistory(h => [...h, { command: input, output }]);
                setCommandHistory(h => [input, ...h]);
                setHistoryIndex(-1);
                setInput("");
                return;
            } else if (trimmedInput === "2" || trimmedInput === "rps") {
                setGameMenuActive(false);
                setRpsActive(true);
                setRpsScore({ player: 0, computer: 0, ties: 0 });
                const output = (
                    <div className="space-y-1.5 border-l-2 border-primary pl-3">
                        <p className="text-primary font-bold">🪨 Rock Paper Scissors</p>
                        <p>Type <span className="text-foreground">rock</span>, <span className="text-foreground">paper</span>, or <span className="text-foreground">scissors</span>.</p>
                        <p className="text-xs text-muted-foreground">Type &apos;quit&apos; to end the match.</p>
                    </div>
                );
                setHistory(h => [...h, { command: input, output }]);
                setCommandHistory(h => [input, ...h]);
                setHistoryIndex(-1);
                setInput("");
                return;
            } else {
                const output = <span className="text-yellow-400">Type 1 for Number Guessing, 2 for Rock Paper Scissors.</span>;
                setHistory(h => [...h, { command: input, output }]);
                setInput("");
                return;
            }
        }

        // RPS game
        if (rpsActive) {
            const choices = ["rock", "paper", "scissors"];
            const emojis: Record<string, string> = { rock: "🪨", paper: "📄", scissors: "✂️" };

            if (trimmedInput === "quit" || trimmedInput === "exit") {
                setRpsActive(false);
                const output = (
                    <div className="space-y-1 text-sm">
                        <p className="text-foreground font-bold">Match over.</p>
                        <p className="text-muted-foreground">
                            You <span className="text-green-400">{rpsScore.player}</span> ·
                            CPU <span className="text-red-400">{rpsScore.computer}</span> ·
                            Ties <span className="text-yellow-400">{rpsScore.ties}</span>
                        </p>
                    </div>
                );
                setHistory(h => [...h, { command: input, output }]);
                setInput("");
                return;
            }

            if (!choices.includes(trimmedInput)) {
                const output = <span className="text-yellow-400">Invalid — use rock, paper, scissors, or quit.</span>;
                setHistory(h => [...h, { command: input, output }]);
                setInput("");
                return;
            }

            const computerChoice = choices[Math.floor(Math.random() * 3)];
            const playerChoice = trimmedInput as "rock" | "paper" | "scissors";
            let result = "";
            const newScore = { ...rpsScore };

            if (playerChoice === computerChoice) {
                result = "Tie.";
                newScore.ties++;
            } else if (
                (playerChoice === "rock" && computerChoice === "scissors") ||
                (playerChoice === "paper" && computerChoice === "rock") ||
                (playerChoice === "scissors" && computerChoice === "paper")
            ) {
                result = "You win 🎉";
                newScore.player++;
            } else {
                result = "CPU wins 🤖";
                newScore.computer++;
            }

            setRpsScore(newScore);

            const output = (
                <div className="space-y-1 border-l-2 border-primary/40 pl-3 text-sm">
                    <p>{emojis[playerChoice]} vs {emojis[computerChoice]} — <span className="text-foreground font-semibold">{result}</span></p>
                    <p className="text-xs text-muted-foreground">
                        You <span className="text-green-400">{newScore.player}</span> ·
                        CPU <span className="text-red-400">{newScore.computer}</span> ·
                        Ties <span className="text-yellow-400">{newScore.ties}</span>
                    </p>
                </div>
            );

            setHistory(h => [...h, { command: input, output }]);
            setCommandHistory(h => [input, ...h]);
            setHistoryIndex(-1);
            setInput("");
            return;
        }

        // Number guessing game
        if (gameActive && !gameWon) {
            const guess = parseInt(input.trim());
            let output: React.ReactNode;

            if (isNaN(guess)) {
                output = <span className="text-yellow-400">That&apos;s not a number. Try again.</span>;
            } else {
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);

                if (guess === targetNumber) {
                    setGameWon(true);
                    setGameActive(false);
                    output = (
                        <div className="space-y-1 text-sm">
                            <p className="text-green-400 font-bold">🎉 Correct! The number was {targetNumber}.</p>
                            <p className="text-muted-foreground">Solved in {newAttempts} attempt{newAttempts !== 1 ? "s" : ""}.</p>
                            <p className="text-muted-foreground/60 text-xs">Type &apos;game&apos; to play again.</p>
                        </div>
                    );
                } else {
                    output = (
                        <span className="text-sm">
                            {guess < targetNumber ? "📈 Too low." : "📉 Too high."}{" "}
                            <span className="text-muted-foreground text-xs">Attempt {newAttempts}</span>
                        </span>
                    );
                }
            }

            setHistory(h => [...h, { command: input, output }]);
            setInput("");
            return;
        }

        // Regular commands
        if (trimmedInput === "clear") {
            setHistory([initialMessage]);
            setGameActive(false);
            setGameWon(false);
            setRpsActive(false);
            setGameMenuActive(false);
            setInput("");
            return;
        }

        if (trimmedInput === "game") {
            setGameMenuActive(true);
            const output = (
                <div className="space-y-1.5 border-l-2 border-primary pl-3 text-sm">
                    <p className="text-primary font-bold">🎮 Game Selection</p>
                    <p><span className="text-foreground">1</span> — Number Guessing 🎯</p>
                    <p><span className="text-foreground">2</span> — Rock Paper Scissors 🪨📄✂️</p>
                    <p className="text-xs text-muted-foreground/60">Type 1 or 2 to choose.</p>
                </div>
            );
            setHistory(h => [...h, { command: input, output }]);
            setCommandHistory(h => [input, ...h]);
            setHistoryIndex(-1);
            setInput("");
            return;
        }

        // Check command map (including multi-word ones like "git log")
        let output: React.ReactNode;
        if (trimmedInput in commands && trimmedInput !== "game") {
            output = commands[trimmedInput];
        } else if (trimmedInput === "") {
            setHistory(h => [...h, { command: "", output: "" }]);
            setInput("");
            return;
        } else {
            output = (
                <span className="text-red-400/80">
                    command not found: <span className="text-red-400">{trimmedInput}</span>
                    <span className="text-muted-foreground"> · try </span>
                    <span className="text-primary">help</span>
                </span>
            );
        }

        setHistory(h => [...h, { command: input, output }]);
        setCommandHistory(h => [input, ...h]);
        setHistoryIndex(-1);
        setInput("");
    };

    useEffect(() => {
        if (bottomRef.current && terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <section className="py-24">
            <div className="px-6 md:px-10 lg:px-16">
                <div className="mb-10">
                    <p className="section-label mb-5">Playground</p>
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none"
                        style={{ fontFamily: "var(--font-elegant), serif" }}
                    >
                        Try the<br /><em>terminal.</em>
                    </h2>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/8 font-mono text-sm shadow-[0_0_60px_-12px_rgba(200,145,55,0.15)]"
                >
                    {/* Header */}
                    <div className="bg-[#111] px-4 py-2.5 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <TerminalIcon size={13} className="text-muted-foreground" />
                            <span className="text-muted-foreground text-xs">nandan@portfolio:~</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 hover:bg-red-500 transition-colors cursor-default" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 hover:bg-yellow-500 transition-colors cursor-default" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 hover:bg-green-500 transition-colors cursor-default" />
                        </div>
                    </div>

                    {/* Body */}
                    <div
                        ref={terminalRef}
                        className="p-4 md:p-6 h-[300px] sm:h-[340px] md:h-[420px] overflow-y-auto font-mono text-sm"
                        onClick={() => inputRef.current?.focus()}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        {history.map((entry, i) => (
                            <div key={i} className="mb-4">
                                {entry.command !== "init" && (
                                    <div className="flex gap-2 items-center">
                                        <span className="text-green-500 text-xs">➜</span>
                                        <span className="text-primary text-xs">~</span>
                                        <span className="text-foreground">{entry.command}</span>
                                    </div>
                                )}
                                {entry.output && (
                                    <div className="text-muted-foreground mt-1.5 ml-5 leading-relaxed">
                                        {entry.output}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Input line */}
                        <div className="flex gap-2 items-center">
                            <span className="text-green-500 text-xs">➜</span>
                            <span className="text-primary text-xs">~</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-foreground flex-1 ml-0.5 font-mono caret-primary"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
