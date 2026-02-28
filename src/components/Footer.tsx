import PianoKeys from './interactive/PianoKeys';

export default function Footer() {
    return (
        <footer className="relative border-t border-border">
            <div className="w-full">
                <PianoKeys />
            </div>
            <div className="py-6 px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-muted-foreground/60 text-xs font-mono">
                    © {new Date().getFullYear()} Nandan Pathak
                </p>
                <p className="text-muted-foreground/30 text-xs font-mono">
                    Crafted with code ❤️
                </p>
            </div>
        </footer>
    );
}
