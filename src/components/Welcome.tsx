"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome({ onComplete }: { onComplete: () => void }) {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showBridges, setShowBridges] = useState(false);
    const [showPulse, setShowPulse] = useState(false);

    const sentences = [
        "Your curiosity has created a disturbance in the digital continuum.",
        "The anomaly has breached the dimensional barriers between worlds.",
        "Prepare as reality recalibrates. You're entering my universe now.",
    ];



    const handleSkip = () => {
        // Clear any existing timing operations
        setIsTyping(false);
        setShowPulse(true);
        setTimeout(() => {
            setShowBridges(true);

            setTimeout(onComplete, 1000);
        }, 500);
    };

    // Typing effect
    useEffect(() => {
        if (textIndex >= sentences.length) {
            setTimeout(() => {
                setShowPulse(true);
                setTimeout(() => setShowBridges(true), 800);
            }, 800);
            return;
        }

        setIsTyping(true);
        setDisplayText("");
        const currentSentence = sentences[textIndex];
        let charIndex = 0;
        let typingText = "";

        const typeInterval = setInterval(() => {
            if (charIndex < currentSentence.length) {
                // Build the string manually instead of relying on setState callback
                typingText += currentSentence[charIndex];
                setDisplayText(typingText);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);
                setTimeout(() => setTextIndex(prev => prev + 1), 1500);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [textIndex]);

    // Handle transition to next section
    useEffect(() => {
        if (showBridges) {
            setTimeout(onComplete, 3000); // Longer time to appreciate the bridge effect
        }
    }, [showBridges, onComplete]);

    // Animation variants
    const bridgeVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: (i: number) => ({
            scaleX: 1,
            opacity: 0.8,
            transition: {
                duration: 1.2,
                delay: i * 0.2,
                ease: "easeOut",
            },
        }),
        exit: { opacity: 0, transition: { duration: 0.5 } },
    };

    const pulseVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
            transition: {
                duration: 1.5,
                times: [0, 0.5, 1],
                ease: "easeOut",
            }
        }
    };

    return (
        <section
            id="welcome"
            className="min-h-[100dvh] flex flex-col items-center justify-center bg-black text-cyan-100 relative overflow-hidden"
        >
            {/* Star background */}
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 2 + 1 + "px",
                            height: Math.random() * 2 + 1 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.7 + 0.3,
                            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
                        }}
                    />
                ))}
            </div>

            {/* Pulse effect */}
            <AnimatePresence>
                {showPulse && (
                    <motion.div
                        className="absolute w-40 h-40 rounded-full bg-cyan-400/20 z-10"
                        variants={pulseVariants}
                        initial="hidden"
                        animate="visible"
                        onAnimationComplete={() => setShowPulse(false)}
                    />
                )}
            </AnimatePresence>

            {/* Text animation */}
            <AnimatePresence mode="wait">
                {!showBridges && (
                    <motion.div
                        key={textIndex}
                        className="text-lg md:text-2xl font-mono text-center px-4 max-w-2xl z-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {displayText}
                        {isTyping && (
                            <span className="inline-block w-2 h-5 bg-cyan-400 animate-blink ml-1" />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bridge effects */}
            {showBridges && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    {/* More beams for a fuller effect */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full h-1 bg-cyan-400 shadow-[0_0_15px_cyan]"
                            style={{
                                transform: `rotate(${i * 22.5}deg)`,
                                transformOrigin: "center",
                            }}
                            variants={bridgeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={i}
                        />
                    ))}

                    {/* Central glow effect */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0.1) 50%, transparent 70%)",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.8, 0.6],
                            scale: [0, 1, 1.2],
                            transition: { duration: 2, times: [0, 0.4, 1] }
                        }}
                    />
                </div>
            )}

            {/* Skip button */}
            <motion.button
                onClick={handleSkip}
                className="absolute bottom-6 right-6 px-7 py-2 bg-black/30 border border-cyan-400/30 
                           text-cyan-300 rounded-md backdrop-blur-sm z-50 hover:bg-black/50 
                           hover:border-cyan-400/60 transition-colors duration-300 text-xs cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Skip
            </motion.button>

            <style jsx>{`
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .animate-blink {
                animation: blink 0.8s infinite;
            }
            @keyframes twinkle {
                0% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
                100% { opacity: 0.3; transform: scale(1); }
            }
        `}</style>
        </section>
    );
}