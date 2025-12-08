import { Project } from "@/types";

export const projectsData: Project[] = [
    {
        title: "Doodle",
        description: "A web-based drawing tool like Excalidraw where users can create flow diagrams on a canvas.",
        tags: ["Next.js", "Canvas", "Zustand"],
        link: "https://doodleup.vercel.app",
        image: "/images/doodle.png",
    },
    {
        title: "Peg",
        description: "A GitHub issue estimator where users enter a repo and get all open issues with estimated cost and difficulty level.",
        tags: ["GitHub API", "OpenAi API", "Supabase"],
        link: "https://github-issue-estimator.vercel.app",
        image: "/images/peg.png",
    },
    {
        title: "Chatbox",
        description: "A real-time chat application with live messaging functionality.",
        tags: ["Next.js", "Pusher", "Tailwind CSS"],
        link: "https://chatbox-gamma-teal.vercel.app/login",
        image: "/images/Chatbox.webp",
    },
];
