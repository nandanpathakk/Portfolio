import { Experience } from "@/types";

export const experienceData: Experience[] = [
    {
        year: "Jun 2025 - Present",
        role: "Associate Software Developer",
        company: "Udaan Solutions",
        description:
            "Embedded with the product team at SlicedHealth, a US-based healthcare SaaS platform - building full-stack features across web and mobile for insurance claims recovery, processing workflows, and hospital billing.",
        bullets: [
            "Built MCP servers and a Claude connector for the platform, so users can drive the app's major features - claims, workflows, reports - directly from Claude in natural language.",
            "Built and integrated AI-powered features using OpenAI and Anthropic APIs, enabling automation and smarter workflows across web and mobile.",
            "Design and optimize scalable REST APIs in .NET (C#) with MySQL and PostgreSQL, achieving 40% faster load times.",
            "Work in Agile sprints with stakeholders on a live product roadmap - translating user stories into production features, with unit and integration testing before QA handoff.",
            "Refactor and debug production systems to improve maintainability, stability, and scalability.",
        ],
        tech: ["Next.js", "React Native", ".NET (C#)", "Node.js", "MySQL", "PostgreSQL", "AWS", "Azure", "MCP"],
    },
    {
        year: "Jan 2025 - Apr 2025",
        role: "Full-Stack Developer Intern",
        company: "SHDPIXEL",
        description:
            "Full end-to-end product delivery - from feature design with the design team through deployment.",
        bullets: [
            "Built responsive PWA and e-commerce UIs with Next.js and Tailwind CSS, backed by RESTful APIs in Node.js and Express.",
            "Delivered onboarding, referral, and rewards features that drove measurable growth in sign-ups and engagement.",
            "Built admin dashboards for user and content management.",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js"],
    },
];
