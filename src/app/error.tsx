"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="wrap flex min-h-dvh flex-col justify-center py-32">
            <h1 className="display text-5xl sm:text-7xl">This page failed to load</h1>
            <p className="reading mt-6 max-w-[44ch] text-muted-foreground">
                Something broke while rendering it. Loading it again usually fixes it.
            </p>
            <div className="mt-8">
                <button onClick={() => reset()} className="btn btn-solid">Load it again</button>
            </div>
        </main>
    );
}
