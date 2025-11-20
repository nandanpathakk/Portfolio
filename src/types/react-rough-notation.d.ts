declare module 'react-rough-notation' {
    import * as React from 'react';

    export interface RoughNotationProps {
        type?: 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket';
        animate?: boolean;
        animationDuration?: number;
        color?: string;
        strokeWidth?: number;
        padding?: number | [number, number, number, number];
        multiline?: boolean;
        iterations?: number;
        brackets?: string | string[];
        show?: boolean;
        order?: number | string;
        animationDelay?: number;
        getAnnotationObject?: (annotation: unknown) => void;
        className?: string;
        children?: React.ReactNode;
        customElement?: string;
    }

    export const RoughNotation: React.FC<RoughNotationProps>;
    export const RoughNotationGroup: React.FC<{ children: React.ReactNode; show?: boolean }>;
}
