import { Experience } from "@/types";

export const experienceData: Experience[] = [
    {
        year: "Jun 2025 - Present",
        role: "Associate Software Developer",
        company: "Udaan IT Solutions",
        client: {
            name: "SlicedHealth",
            description: "a US-based healthcare SaaS product",
        },
        description:
            "Embedded with the product team at SlicedHealth, a US-based healthcare SaaS platform, building web and mobile features that help healthcare teams manage insurance claims recovery, processing workflows, and hospital billing.",
        bullets: [
            "Work with stakeholders in Agile sprints to translate user stories from a live product roadmap into features, with unit and integration testing before QA handoff.",
            "Built MCP servers and a Claude connector so users can access claims, workflows, and reports through natural language, offering another way to work with the platform.",
            "Integrated OpenAI and Anthropic APIs to automate steps in web and mobile workflows.",
            "Optimized REST APIs in .NET (C#) with MySQL and PostgreSQL, achieving 40% faster load times and reducing waits in the product experience.",
            "Refactor and debug production systems to keep everyday workflows reliable and the codebase maintainable as the product grows.",
        ],
        tech: ["Next.js", "React Native", ".NET (C#)", "Node.js", "MySQL", "PostgreSQL", "AWS", "Azure", "MCP"],
    },
    {
        year: "Jan 2025 - Apr 2025",
        role: "Full-Stack Developer Intern",
        company: "SHDPIXEL",
        description:
            "Worked with the design team to deliver PWA and e-commerce experiences, contributing from feature design through development and deployment.",
        bullets: [
            "Delivered onboarding, referral, and rewards flows to help users get started, invite others, and redeem rewards.",
            "Built responsive interfaces with Next.js and Tailwind CSS, connecting user journeys to REST APIs in Node.js and Express.",
            "Built admin dashboards that bring user and content management into one place for day-to-day operations.",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js"],
    },
];
