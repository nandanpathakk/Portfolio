import { Project } from "@/types";

export const projectsData: Project[] = [
    {
        title: "Halt",
        description:
            "Rust-based safety layer that monitors every command executed by you or your AI tools in your terminal, flags suspicious behaviour, and warns you before anything risky runs on your machine.",
        tags: ["Rust", "Security", "AI tooling"],
        link: "#",
        github: "#",
        image: "/images/Halt.png",
        comingSoon: true,
    },
    {
        title: "Doodle",
        description: "A web-based drawing tool like Excalidraw where users can create flow diagrams on a canvas.",
        tags: ["Next.js", "Canvas", "Zustand"],
        link: "https://doodleup.vercel.app",
        github: "https://github.com/nandanpathakk/Doodle",
        image: "/images/doodle.png",
    },
    {
        title: "Peg",
        description: "A GitHub issue estimator where users enter a repo and get all open issues with estimated cost and difficulty level.",
        tags: ["GitHub API", "OpenAi API", "Supabase"],
        link: "https://github-issue-estimator.vercel.app",
        github: "https://github.com/nandanpathakk/github-issue-estimator",
        image: "/images/peg.png",
    },
    {
        title: "Chatbox",
        description: "A real-time chat application with live messaging functionality.",
        tags: ["Next.js", "Pusher", "Tailwind CSS"],
        link: "https://chatbox-gamma-teal.vercel.app/login",
        github: "https://github.com/nandanpathakk/Real-time-chat-app",
        image: "/images/Chatbox.webp",
    },
];
