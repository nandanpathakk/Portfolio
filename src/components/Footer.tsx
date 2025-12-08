import PianoKeys from './interactive/PianoKeys';

export default function Footer() {
    return (
        <footer className="relative border-t border-white/10">
            <div className="w-full">
                <PianoKeys />
            </div>
            <div className="py-8 container mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Nandan Pathak. Crafted with code ❤️
                </p>
            </div>
        </footer>
    );
}