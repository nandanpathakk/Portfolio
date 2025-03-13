"use client";

import React, { useEffect, useRef, useState } from "react";

interface CosmicLoadingProps {
  onComplete: () => void;
  duration?: number; 
}

export default function CosmicLoadingAnimation({
  onComplete,
  duration = 4800, // 2.3s bounce, 1.8s expand, 0.7s fade
}: CosmicLoadingProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;
    const starsContainer = starsContainerRef.current;
    const container = containerRef.current;
    if (!dot || !container || !glow || !ring || !starsContainer) return;

    // star background
    for (let i = 0; i < 40; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }

    const bounceDuration = 2300; // 2.3s bounce
    const expandDuration = 1800; // 1.8s expand
    const fadeDuration = 700; // 0.7s fade

    // Initial bounce animation
    dot.style.animation = `bounce 0.8s ease-in-out infinite`;

    // Start animation
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < bounceDuration) {
        ring.style.opacity = '0';
      }
      // Expand phase (2.3s-4.1s)
      else if (elapsed < bounceDuration + expandDuration) {
        const expandProgress = (elapsed - bounceDuration) / expandDuration;
        const easeOutQuart = 1 - Math.pow(1 - expandProgress, 4); // 
        
        if (elapsed < bounceDuration + 50) {
          dot.style.animation = "none";
          ring.style.opacity = '1';
          ring.style.animation = "rotate 8s linear infinite";
        }
        
        // Expand the dot
        const maxScale = Math.max(window.innerWidth, window.innerHeight) / 7;
        const currentScale = 1 + (maxScale - 1) * easeOutQuart;
        dot.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
        
        // Expand the glow effect
        glow.style.transform = `translate(-50%, -50%) scale(${currentScale * 1.5})`;
        glow.style.opacity = `${Math.min(1, expandProgress * 2)}`;
        
        // Expand the ring
        ring.style.transform = `translate(-50%, -50%) scale(${currentScale * 1.2})`;
        
        // Fade out dot
        if (expandProgress > 0.2) {
          const fadeAmount = (expandProgress - 0.2) * 1.6;
          dot.style.opacity = `${1 - Math.min(1, fadeAmount)}`;
        }
      }
      // Fade phase 
      else if (elapsed < duration) {
        const fadeProgress = (elapsed - (bounceDuration + expandDuration)) / fadeDuration;        
        const smoothFade = 0.5 - 0.5 * Math.cos(fadeProgress * Math.PI);
        
        container.style.opacity = `${1 - smoothFade}`;
        glow.style.opacity = `${1 - smoothFade}`;
        ring.style.opacity = `${1 - smoothFade}`;
        

        container.style.transition = 'opacity 0.2s ease';
        glow.style.transition = 'opacity 0.2s ease';
        ring.style.transition = 'opacity 0.2s ease';
      }
      else {
        container.style.opacity = '0';
        glow.style.opacity = '0';
        ring.style.opacity = '0';
        
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 50);
        }, 100);
        
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-50 bg-black overflow-hidden transition-opacity duration-300 ease-out"
    >
      <div
        ref={starsContainerRef}
        className="absolute w-full h-full pointer-events-none"
      />
      <div
        ref={ringRef}
        className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full border border-cyan-400/80 shadow-[0_0_15px_rgba(0,255,255,0.6),inset_0_0_15px_rgba(0,255,255,0.6)] opacity-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{ transform: "translate(-50%, -50%) scale(1)" }}
      />
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full opacity-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{ 
          transform: "translate(-50%, -50%) scale(0)",
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, rgba(0, 255, 255, 0.1) 60%, transparent 70%)" 
        }}
      />
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full shadow-[0_0_30px_cyan]"
        style={{ 
          transform: "translate(-50%, -50%) scale(1)",
          background: "radial-gradient(circle, cyan 20%, rgba(0, 255, 255, 0.7) 50%, transparent 80%)" 
        }}
      />
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 20px cyan;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.8);
            box-shadow: 0 0 40px cyan, 0 0 60px rgba(0, 255, 255, 0.4);
          }
        }
        
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: twinkle 3s infinite alternate;
        }
        
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}