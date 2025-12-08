'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                An unexpected error has occurred. We apologize for the inconvenience.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
