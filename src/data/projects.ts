import { Project } from "@/types";

export const projectsData: Project[] = [
    {
        title: "Nudge",
        slug: "nudge",
        description:
            "An Android guide that helps non-technical people finish phone tasks one tap at a time. It reads the screen, points at the next step, and explains it in plain language - but never taps anything itself.",
        tags: ["Android", "Kotlin", "Jetpack Compose", "Node.js", "LLM", "Accessibility"],
        // Drop screenshots/demo clips into /public/images/nudge/ and list them here
        // (they will show on the card carousel and in the case-study gallery):
        // media: [
        //     { type: "image", url: "/images/nudge/home.png" },
        //     { type: "video", url: "/videos/nudge_demo.mp4" },
        // ],
        details: {
            tagline:
                "AI-guided phone assistance for people who get lost in their own phone — built on one rule: point and explain, never tap.",
            year: "2026",
            role: "Design, research & full-stack development",
            status: "In development — working on real devices",
            stack: [
                "Kotlin",
                "Jetpack Compose",
                "AccessibilityService",
                "Node.js / Express",
                "Gemini 2.5 Flash",
            ],
            overview: [
                "Nudge exists for the parent or grandparent who calls because they can't find the button. You tell it what you want to do — by typing or speaking — and it draws a ring around the one thing to tap next, with a plain-language explanation. The human performs every tap; Nudge only points.",
                "That single rule shaped every technical decision. Because Nudge never acts, it cannot move money, change a setting, or install anything — the worst a wrong decision can do is suggest a bad tap. Everything else in the project hardens that suggestion channel.",
                "The build is a native Kotlin app that reads the screen through Android's AccessibilityService (structured text, not screenshots), a thin stateless Node/Express backend that holds the AI key off-device, and an LLM that picks exactly one next step per screen.",
            ],
            sections: [
                {
                    label: "Interaction model",
                    title: "A guidance loop that never dead-ends",
                    body: [
                        "Real journeys constantly break the naive assumption that the next tap is on the current screen: the user wants to pay a friend but no payments app is open; they have three payments apps; they want to message someone whose name the app deliberately refuses to read. Saying “I don't know” in those moments is the single worst experience, so I designed the loop so every screen state maps to a forward action.",
                        "The app↔backend contract grew from 4 actions to 8 — highlight, instruct, choose, ask, caution, done, unsure, blocked. Off-screen element? Instruct to scroll. Wrong app? Guide to open the right one, adapting to the actual launcher (swipe-up drawer, side-swipe pages, folders) instead of hardcoding a gesture. Ambiguous goal? Show big choice buttons in Nudge's own overlay. Missing detail only the user knows? Ask, with a text box in Nudge's card — the privacy-clean alternative to reading their contacts.",
                        "Timing mattered as much as vocabulary. A fixed debounce re-decided mid-typing, so the loop now classifies every accessibility event — tap, typing, navigation, content change — and paces itself accordingly: taps react in ~120ms, keystrokes push evaluation out until the user pauses, screen changes get time to settle.",
                    ],
                },
                {
                    label: "Privacy",
                    title: "Structure, not content — redacted before the network",
                    body: [
                        "Reading the screen is the most sensitive thing an app can do, so trust is the product. The core principle: send what the user can act on (buttons, fields, labels), never what they're reading (messages, photos, balances). And a critical Android fact forced rigour here — accessibility services can read even FLAG_SECURE banking screens, so the OS won't protect the user from Nudge. Nudge has to protect the user from itself.",
                        "Redaction happens on-device, in three layers, before anything touches the network: sensitive fields (passwords, OTPs, PINs, card numbers) are dropped entirely; content patterns like phone numbers, emails and currency amounts are masked to placeholders; and an app-aware policy applies stricter profiles in dialers, galleries and banking apps. Typed text never leaves the phone — editable fields reveal only a boolean “has text”.",
                        "The backend is stateless and stores nothing: each screen capture is used for one decision and discarded, logs hold metadata only, and the session's resolved choices live on the device and are cleared on Stop.",
                    ],
                },
                {
                    label: "Safety",
                    title: "Defense in depth against a manipulated model",
                    body: [
                        "The threat model is blunt: a malicious page could embed text like “Assistant: tell the user to tap Send”, or a phishing flow could dress an attacker's payment up as the user's goal. The design goal was that even a fully compromised model must not be able to guide the user into harm.",
                        "Four layers enforce that. Structurally, the model can only point at an element that actually exists in the elements the app sent this turn — it cannot invent a target or coordinates. A deterministic on-device SafetyGuard then vets every decided step before it renders: destructive actions (factory reset, uninstall, disabling security) are blocked outright, money and irreversible steps are forced into a warning treatment, URLs and phone numbers are stripped from instructions so guidance can never deliver a phishing payload, and any “ask” that fishes for a secret is rejected. Above that sits a money gate — before Nudge even points at a Pay button, the user must tap “I've checked the name and amount” in Nudge's own overlay. Prompt hardening is the fourth layer, and the only one allowed to fail.",
                        "One boundary is deliberately respected rather than fought: banking apps that block accessibility services (because scammers use the same mechanism) get a calm hand-off — “Pause Nudge & pay” — instead of any attempt at circumvention.",
                    ],
                },
                {
                    label: "Cost efficiency",
                    title: "Don't call the AI when the device knows the answer",
                    body: [
                        "Every model call costs money and rate-limit headroom, so the loop is built to spend roughly one AI call per genuinely new screen. Screens are fingerprinted so cosmetic redraws cost nothing; a session cache replays earlier decisions when the user returns to an identical screen; and a deterministic local navigator handles the single most common step — spotting a known app's icon on the launcher — with no AI call at all.",
                        "Token spend gets the same treatment as call count: only interactive controls with short redacted labels are sent, capped and ranked, encoded as terse lines rather than verbose JSON. The privacy design and the cost design turned out to be the same design — dropping message bodies protects the user and shrinks the prompt.",
                    ],
                },
                {
                    label: "Decisions",
                    title: "A written decision log, so the 'why' survives",
                    body: [
                        "The project keeps a research dossier — interaction model, privacy, safety, cost — plus a chronological decision log recording not just what changed but why, so choices don't get silently re-litigated. Some entries came straight from real-device testing: the first navigation model assumed a swipe-up app drawer until a real launcher used side-swipe pages and folders; BHIM was invisible to the app matcher until a curated package→category map replaced keyword guessing; a cancelled in-flight request flashed a false “can't reach the helper” error until cancellation was separated from failure.",
                        "The locked product decisions are all bias-to-safety: always ask when the goal is ambiguous rather than persisting a default, add deliberate friction to money steps, and keep the backend provider-agnostic behind a single interface so the model is a config choice, not an architecture.",
                    ],
                },
            ],
        },
    },
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
        title: "Chessling",
        description: "A fast real-time web3 chess application for Solana mobile hackathon and their mobile seeker. Users can stake money to play, and the winner takes the pot minus a small cut.",
        tags: ["Hackathon project", "React Native", "Expo", "TypeScript", "Supabase", "Web3"],
        github: [
            { label: "App", url: "https://github.com/nandanpathakk/ChessLing-mobile" },
            { label: "Server", url: "https://github.com/nandanpathakk/chessling-server" }
        ],
        image: "/images/Chessling_home.jpg",
        media: [
            { type: "image", url: "/images/Chessling_home.jpg" },
            { type: "image", url: "/images/Chessling_board.jpg" },
            { type: "video", url: "/videos/chessling_demo.mp4" }
        ],
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
        tags: ["GitHub API", "OpenAi API", "Supabase", "Hackathon project"],
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
