"use client"

import confetti from "canvas-confetti"
import { PartyPopper } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConfettiSideCannonsProps {
    className?: string
}

export function ConfettiSideCannons({ className }: ConfettiSideCannonsProps) {
    console.log("inside confetti component");
    const handleClick = () => {
        console.log("Inside handle click")
        const end = Date.now() + 3 * 1000 // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]

        const frame = () => {
            console.log("Inside frame")
            if (Date.now() > end) return

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            })
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            })

            requestAnimationFrame(frame)
        }

        frame()
    }

    return (
        <button
            onClick={handleClick}
            aria-label="Surprise!"
            className={cn(
                "p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 transform duration-200 text-yellow-400",
                className
            )}
        >
            <PartyPopper size={20} />
        </button>
    )
}
