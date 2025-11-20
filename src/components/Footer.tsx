export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/10">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Nandan Pathak. Crafted with code ❤️
                </p>
            </div>
        </footer>
    );
}