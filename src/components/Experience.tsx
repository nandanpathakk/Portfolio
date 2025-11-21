"use client";

export default function Experience() {
    const experiences = [
        {
            year: "2024 - Present",
            role: "Frontend Developer",
            company: "Tech Solutions Inc.",
            description: "Building scalable web applications using React and Next.js.",
        },
        {
            year: "2023 - 2024",
            role: "Junior Developer",
            company: "Creative Agency",
            description: "Collaborated on award-winning websites for global clients.",
        },
    ];

    return (
        <section id="experience" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
                    Experience
                </h2>
                <div className="max-w-3xl mx-auto space-y-8">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            className="relative pl-6 md:pl-8 border-l border-white/10 hover:border-primary/50 transition-colors duration-300"
                        >
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary" />
                            <span className="text-sm text-primary font-mono mb-2 block">
                                {exp.year}
                            </span>
                            <h3 className="text-xl font-bold text-foreground mb-1">
                                {exp.role}
                            </h3>
                            <p className="text-muted-foreground mb-2">{exp.company}</p>
                            <p className="text-muted-foreground/80 text-sm">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}