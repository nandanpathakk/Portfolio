"use client";

import { RoughNotation as RN } from "react-rough-notation";

interface RoughNotationProps {
    children: React.ReactNode;
    type?: "underline" | "box" | "circle" | "highlight" | "strike-through" | "crossed-off" | "bracket";
    color?: string;
    show?: boolean;
    iterations?: number;
    padding?: number | [number, number, number, number];
    strokeWidth?: number;
    className?: string;
}

export const RoughNotation = ({
    children,
    type = "underline",
    color = "#22d3ee", // Cyan default
    show = true,
    iterations = 2,
    padding = 2,
    strokeWidth = 2,
    className,
}: RoughNotationProps) => {
    return (
        <RN
            type={type}
            color={color}
            show={show}
            iterations={iterations}
            padding={padding}
            strokeWidth={strokeWidth}
            className={className}
        >
            {children}
        </RN>
    );
};
