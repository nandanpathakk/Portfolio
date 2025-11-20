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
    const terminalRef = useRef<HTMLDivElement>(null);

    // Game selection state
    const [gameMenuActive, setGameMenuActive] = useState(false);

    // Number guessing game state
    const [gameActive, setGameActive] = useState(false);
    const [targetNumber, setTargetNumber] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    // Rock Paper Scissors game state
    const [rpsActive, setRpsActive] = useState(false);
    const [rpsScore, setRpsScore] = useState({ player: 0, computer: 0, ties: 0 });

    // Initial welcome message
    const initialMessage: Command = {
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
    };

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
                    <span className="text-primary">game</span>
                    <span>Play interactive games</span>
                    <span className="text-primary">clear</span>
                    <span>Reset terminal</span>
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
        game: null, // Handled separately
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmedInput = input.trim().toLowerCase();
            let output: React.ReactNode = "";

            // Handle game menu selection
            if (gameMenuActive) {
                if (trimmedInput === "1" || trimmedInput === "number" || trimmedInput === "guess") {
                    setGameMenuActive(false);
                    const newTarget = Math.floor(Math.random() * 100) + 1;
                    setTargetNumber(newTarget);
                    setAttempts(0);
                    setGameActive(true);
                    setGameWon(false);
                    output = (
                        <div className="space-y-2 border-l-2 border-primary pl-3">
                            <p className="text-primary font-bold">🎮 Number Guessing Game</p>
                            <p>I&apos;m thinking of a number between <span className="text-white">1</span> and <span className="text-white">100</span>.</p>
                            <p className="text-muted-foreground">Can you guess it?</p>
                            <p className="text-sm text-muted-foreground/60">Hint: Type your guess and press Enter!</p>
                        </div>
                    );
                    setHistory([...history, { command: input, output }]);
                    setInput("");
                    return;
                } else if (trimmedInput === "2" || trimmedInput === "rps" || trimmedInput === "rock") {
                    setGameMenuActive(false);
                    setRpsActive(true);
                    setRpsScore({ player: 0, computer: 0, ties: 0 });
                    output = (
                        <div className="space-y-2 border-l-2 border-primary pl-3">
                            <p className="text-primary font-bold">🎮 Rock Paper Scissors</p>
                            <p>Let&apos;s battle! Choose your weapon:</p>
                            <div className="flex gap-3 my-2">
                                <span>🪨 rock</span>
                                <span>📄 paper</span>
                                <span>✂️ scissors</span>
                            </div>
                            <p className="text-sm text-muted-foreground/60">Type your choice and press Enter. Type &apos;quit&apos; to exit.</p>
                        </div>
                    );
                    setHistory([...history, { command: input, output }]);
                    setInput("");
                    return;
                } else {
                    output = <span className="text-yellow-400">Invalid choice! Type 1 or 2 to select a game.</span>;
                    setHistory([...history, { command: input, output }]);
                    setInput("");
                    return;
                }
            }

            // Handle Rock Paper Scissors game mode
            if (rpsActive) {
                const choices = ['rock', 'paper', 'scissors'];
                const emojis: Record<string, string> = { rock: '🪨', paper: '📄', scissors: '✂️' };

                if (trimmedInput === 'quit' || trimmedInput === 'exit') {
                    setRpsActive(false);
                    output = (
                        <div className="space-y-1">
                            <p className="text-primary font-bold">Game Over!</p>
                            <p>Final Score:</p>
                            <p>You: <span className="text-green-400">{rpsScore.player}</span> | Computer: <span className="text-red-400">{rpsScore.computer}</span> | Ties: <span className="text-yellow-400">{rpsScore.ties}</span></p>
                            <p className="text-muted-foreground text-sm">Thanks for playing!</p>
                        </div>
                    );
                    setHistory([...history, { command: input, output }]);
                    setInput("");
                    return;
                }

                if (!choices.includes(trimmedInput)) {
                    output = <span className="text-yellow-400">Invalid choice! Use: rock, paper, or scissors (or type &apos;quit&apos; to exit)</span>;
                    setHistory([...history, { command: input, output }]);
                    setInput("");
                    return;
                }

                const computerChoice = choices[Math.floor(Math.random() * 3)];
                const playerChoice = trimmedInput as 'rock' | 'paper' | 'scissors';

                let result = '';
                const newScore = { ...rpsScore };

                if (playerChoice === computerChoice) {
                    result = "It's a tie!";
                    newScore.ties++;
                } else if (
                    (playerChoice === 'rock' && computerChoice === 'scissors') ||
                    (playerChoice === 'paper' && computerChoice === 'rock') ||
                    (playerChoice === 'scissors' && computerChoice === 'paper')
                ) {
                    result = "You win! 🎉";
                    newScore.player++;
                } else {
                    result = "Computer wins! 🤖";
                    newScore.computer++;
                }

                setRpsScore(newScore);

                output = (
                    <div className="space-y-2 border-l-2 border-primary/50 pl-3">
                        <div className="flex gap-4 items-center">
                            <span>You: {emojis[playerChoice]}</span>
                            <span className="text-muted-foreground">vs</span>
                            <span>Computer: {emojis[computerChoice]}</span>
                        </div>
                        <p className="font-bold">{result}</p>
                        <p className="text-sm text-muted-foreground">
                            Score - You: <span className="text-green-400">{newScore.player}</span> |
                            Computer: <span className="text-red-400">{newScore.computer}</span> |
                            Ties: <span className="text-yellow-400">{newScore.ties}</span>
                        </p>
                    </div>
                );

                setHistory([...history, { command: input, output }]);
                setInput("");
                return;
            }

            // Handle number guessing game mode
            if (gameActive && !gameWon) {
                const guess = parseInt(input.trim());

                if (isNaN(guess)) {
                    output = <span className="text-yellow-400">Please enter a valid number!</span>;
                } else {
                    const newAttempts = attempts + 1;
                    setAttempts(newAttempts);

                    if (guess === targetNumber) {
                        setGameWon(true);
                        output = (
                            <div className="space-y-1">
                                <p className="text-green-400 font-bold">🎉 Congratulations! You guessed it!</p>
                                <p>The number was <span className="text-primary">{targetNumber}</span></p>
                                <p>You won in <span className="text-primary">{newAttempts}</span> attempts!</p>
                                <p className="text-muted-foreground text-sm mt-2">Type &apos;game&apos; to play again or any other command to continue.</p>
                            </div>
                        );
                        setGameActive(false);
                    } else if (guess < targetNumber) {
                        output = (
                            <span>
                                📈 Too low! Try a higher number. (Attempt {newAttempts})
                            </span>
                        );
                    } else {
                        output = (
                            <span>
                                📉 Too high! Try a lower number. (Attempt {newAttempts})
                            </span>
                        );
                    }
                }
                setHistory([...history, { command: input, output }]);
                setInput("");
                return;
            }

            // Handle regular commands
            if (trimmedInput === "clear") {
                // Reset to initial state
                setHistory([initialMessage]);
                setGameActive(false);
                setGameWon(false);
                setRpsActive(false);
                setGameMenuActive(false);
            } else if (trimmedInput === "game") {
                setGameMenuActive(true);
                output = (
                    <div className="space-y-2 border-l-2 border-primary pl-3">
                        <p className="text-primary font-bold">🎮 Game Selection</p>
                        <p>Choose a game to play:</p>
                        <div className="space-y-1 my-2">
                            <p><span className="text-white">1.</span> Number Guessing Game 🎯</p>
                            <p><span className="text-white">2.</span> Rock Paper Scissors 🪨📄✂️</p>
                        </div>
                        <p className="text-sm text-muted-foreground/60">Type 1 or 2 to select</p>
                    </div>
                );
                setHistory([...history, { command: input, output }]);
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
        // Scroll within terminal only, don't scroll the page
        if (bottomRef.current && terminalRef.current) {
            const terminalContainer = terminalRef.current;
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
        }
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
                        ref={terminalRef}
                        className="p-6 h-[400px] overflow-y-auto custom-scrollbar font-mono"
                        onClick={() => inputRef.current?.focus()}
                        onWheel={(e) => {
                            // Stop propagation to prevent page scroll
                            e.stopPropagation();
                        }}
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

