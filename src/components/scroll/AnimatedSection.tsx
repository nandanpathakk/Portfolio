"use client";
import { ReactNode, useRef, useEffect } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-in-up" | "fade-in-down" | "fade-in-left" | "fade-in-right" | "zoom-in";
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-in-up",
  threshold = 0.15
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            // Add a small delay before adding the class for a staggered effect
            setTimeout(() => {
              if (sectionRef.current) {
                sectionRef.current.classList.add("animate");
                hasAnimated.current = true;
              }
              
              // Unobserve after animating once
              observer.unobserve(entry.target);
            }, delay);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: threshold,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={sectionRef}
      className={`animation-on-scroll ${animation} ${
        delay > 0 ? `delay-${delay}` : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;