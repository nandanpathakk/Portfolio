"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

interface Command {
    command: string;
    output: React.ReactNode;
}

export default function Terminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Command[]>([
        {
            command: "init",
            output: (
                <div className="space-y-2">
                    <pre className="text-xs md:text-sm text-primary font-bold leading-none">
                        {`
  _   _  ____  
 | \\ | ||  _ \\ 
 |  \\| || |_) |
 | |\\  ||  __/ 
 |_| \\_||_|    
`}
                    </pre>
                    <p>System initialized. Welcome, user.</p>
                    <p className="text-muted-foreground">Type <span className="text-primary">help</span> to see what I can do.</p>
                </div>
            ),
        },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, React.ReactNode> = {
        help: (
            <div className="space-y-1">
                <p>Available commands:</p>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-primary">about</span>
                    <span>Who is Nandan?</span>
                    <span className="text-primary">skills</span>
                    <span>Check my tech stack</span>
                    <span className="text-primary">projects</span>
                    <span>See what I&apos;ve built</span>
                    <span className="text-primary">contact</span>
                    <span>Ping me</span>
                    <span className="text-primary">clear</span>
                    <span>Clean the screen</span>
                </div>
            </div>
        ),
        about: (
            <span>
                I&apos;m <span className="text-white font-bold">Nandan Pathak</span>. A frontend developer who loves minimal design and clean code.
                <br />
                Currently exploring the depths of React and Next.js.
            </span>
        ),
        skills: (
            <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">React</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Next.js</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">TypeScript</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Tailwind</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Node.js</span>
            </div>
        ),
        projects: "Navigate to the 'Selected Work' section to see my latest creations.",
        contact: (
            <span>
                Drop me a line at: <a href="mailto:your.email@example.com" className="text-primary hover:underline">your.email@example.com</a>
            </span>
        ),
        whoami: "guest@portfolio",
        sudo: <span className="text-red-500">Permission denied: Nice try, but you&apos;re not root.</span>,
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const trimmedInput = input.trim().toLowerCase();
            let output: React.ReactNode = "";

            if (trimmedInput === "clear") {
                setHistory([]);
            } else if (trimmedInput in commands) {
                output = commands[trimmedInput];
                setHistory([...history, { command: input, output }]);
            } else if (trimmedInput === "") {
                setHistory([...history, { command: "", output: "" }]);
            } else {
                output = <span className="text-red-400">Command not found: {trimmedInput}. Try &apos;help&apos;.</span>;
                setHistory([...history, { command: input, output }]);
            }
            setInput("");
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto bg-black rounded-lg overflow-hidden border border-white/10 font-mono text-sm md:text-base shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]"
                >
                    {/* Terminal Header */}
                    <div className="bg-[#111] px-4 py-2 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <TerminalIcon size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground text-xs">guest@nandan-portfolio:~</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors" />
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div
                        className="p-6 h-[400px] overflow-y-auto custom-scrollbar font-mono"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((entry, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex gap-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-primary">~</span>
                                    <span className="text-white">{entry.command}</span>
                                </div>
                                {entry.output && (
                                    <div className="text-gray-400 mt-1 ml-6 whitespace-pre-wrap leading-relaxed">
                                        {entry.output}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex gap-2 items-center">
                            <span className="text-green-500">➜</span>
                            <span className="text-primary">~</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-white flex-1 ml-1 font-mono"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

