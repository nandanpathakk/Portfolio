import Link from "next/link";

export default function NotFound() {
    return (
        <main className="wrap flex min-h-dvh flex-col justify-center py-32">
            <h1 className="poster text-marigold text-6xl sm:text-8xl">This page isn&apos;t here</h1>
            <p className="reading mt-6 max-w-[44ch] text-muted-foreground">
                The link may be old, or I may have moved something. Everything I&apos;ve made is on the home page.
            </p>
            <div className="mt-8">
                <Link href="/" className="btn btn-solid">Go to the home page</Link>
            </div>
        </main>
    );
}
