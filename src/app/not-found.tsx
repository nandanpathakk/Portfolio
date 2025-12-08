import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
            {/* Glitch Effect Number */}
            <h1 className="text-[12rem] md:text-[20rem] font-bold text-white/5 font-mono select-none absolute z-0">
                404
            </h1>

            <div className="z-10 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    The page you are looking for does not exist or has been moved to another dimension.
                </p>

                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
