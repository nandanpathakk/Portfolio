import { Experience } from "@/types";

export const experienceData: Experience[] = [
    {
        year: "June 2025 to now",
        role: "Associate Software Developer",
        company: "Udaan IT Solutions",
        client: {
            name: "SlicedHealth",
            description: "a US-based healthcare SaaS product",
        },
        description:
            "I'm employed by Udaan IT Solutions and work full-time with the product team at SlicedHealth, one of its clients. SlicedHealth is a US healthcare product that hospitals use to recover insurance claims, run their processing workflows and keep billing moving.",
        bullets: [
            "Built MCP servers and a Claude connector, so someone can ask for a claim, a workflow or a report in plain English instead of clicking through screens to find it.",
            "Each sprint I take user stories off the roadmap and ship them across web and mobile, with unit and integration tests written before QA sees anything.",
            "Reworked slow REST APIs in .NET with MySQL and PostgreSQL. Load times came down by about 40%.",
            "Wired the OpenAI and Anthropic APIs into existing web and mobile workflows to take manual steps out of them.",
            "A fair share of the job is unglamorous: debugging production issues and refactoring older code so the next feature is easier to add.",
        ],
        highlights: [
            "Built MCP servers and a Claude connector, so people can ask for a claim in plain English",
            "Made slow .NET APIs about 40% faster",
            "Ship web and mobile features every sprint",
        ],
        tech: ["Next.js", "React Native", ".NET (C#)", "Node.js", "MySQL", "PostgreSQL", "AWS", "Azure", "MCP"],
    },
    {
        year: "January to April 2025",
        role: "Full-Stack Developer Intern",
        company: "SHDPIXEL",
        description:
            "A four-month internship, working next to the design team on a PWA and an e-commerce site, from feature design through to deployment.",
        bullets: [
            "Built the onboarding, referral and rewards flows: how a new user gets in, invites a friend and redeems what they've earned.",
            "Built the admin dashboards the team used day to day to manage users and content.",
            "Next.js and Tailwind on the front end, REST APIs in Node and Express behind it.",
        ],
        highlights: [
            "Onboarding, referral and rewards flows",
            "Admin dashboards for users and content",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js"],
    },
];
