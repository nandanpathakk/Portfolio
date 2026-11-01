import { Project } from "@/types";

export const projectsData: Project[] = [
    {
        title: "Nudge",
        slug: "nudge",
        description:
            "An Android app for parents and grandparents who get stuck using their phones. Say what you want to do in Hindi or English, and Nudge highlights the next tap with a plain-language explanation. It guides without taking over, so the user stays in control.",
        tags: ["Accessibility", "Android", "Kotlin", "Jetpack Compose", "Node.js", "LLM"],
        github: "https://github.com/nandanpathakk/Nudge",
        // Bump the version in `url`, `meta` and `releaseUrl` with each release —
        // the asset filename is version-stamped, so it can't be a "latest" link.
        download: {
            url: "https://github.com/nandanpathakk/Nudge/releases/download/v0.1.0/nudge-v0.1.0.apk",
            meta: "v0.1.0 · 1.1 MB · Android 8.0+",
            note:
                "Nudge isn't on the Play Store — it's a personal project, so you install it directly. " +
                "It asks for two permissions and explains both before it asks: one to read what's on the " +
                "screen, so it knows what to point at, and one to draw the highlight over other apps. " +
                "If you're setting this up for a parent or grandparent, sit with them for those two grants " +
                "once — after that, it's press the mic and say what you need.",
            steps: [
                "Download the APK on your Android phone.",
                "Open it and allow installs from your browser — normal for apps outside the Play Store.",
                "Open Nudge, say or type what you want to do, and follow the ring.",
            ],
            releaseUrl: "https://github.com/nandanpathakk/Nudge/releases/tag/v0.1.0",
        },
        image: "/images/nudge_1.jpeg",
        // Assistant may show these when a reply mentions Nudge.
        chatMedia: {
            enabled: true,
            max: 3,
            aspect: "portrait",
            images: [
                {
                    type: "image",
                    url: "/images/nudge_4.jpeg",
                    caption: "Say it or type it, in Hindi or English.",
                },
                {
                    type: "image",
                    url: "/images/nudge_7.jpeg",
                    caption: "One step at a time — Nudge points, the user taps.",
                },
                {
                    type: "image",
                    url: "/images/nudge_8.jpeg",
                    caption: "Done, in plain words.",
                },
            ],
        },
        media: [
            { type: "image", url: "/images/nudge_1.jpeg" },
            { type: "image", url: "/images/nudge_2.jpeg" },
            { type: "image", url: "/images/nudge_3.jpeg" },
            { type: "image", url: "/images/nudge_4.jpeg" },
            { type: "image", url: "/images/nudge_5.jpeg" },
            { type: "image", url: "/images/Nudge-6.jpeg" },
            { type: "image", url: "/images/nudge_7.jpeg" },
            { type: "image", url: "/images/nudge_8.jpeg" },
        ],
        details: {
            tagline:
                "Helping parents and grandparents find the next step on their phones, with guidance in their own language and every tap in their control.",
            year: "2026",
            role: "Product design & full-stack development",
            status: "v0.1.0 — released, installable today",
            stack: [
                "Kotlin",
                "Jetpack Compose",
                "AccessibilityService",
                "Node.js / Express",
                "Gemini 2.5 Flash",
            ],
            media: [
                {
                    type: "image",
                    url: "/images/nudge_4.jpeg",
                    caption: "Start with a goal: speak, type, or choose an example in Hindi or English.",
                },
                {
                    type: "image",
                    url: "/images/nudge_5.jpeg",
                    caption: "Help extends beyond a highlighted button: explain how to find the right app.",
                },
                {
                    type: "image",
                    url: "/images/nudge_7.jpeg",
                    caption: "Keep the next step specific, with a visible way to stop guidance.",
                },
                {
                    type: "image",
                    url: "/images/nudge_8.jpeg",
                    caption: "Close the loop: confirm what changed in plain language.",
                },
            ],
            overview: [
                "A parent calls because a button has moved, a setting is buried, or an app uses unfamiliar words. Explaining the steps remotely can be difficult, and the same task may need another explanation next time. That familiar situation was the starting point for Nudge.",
                "Nudge is an Android app that turns a spoken or typed goal into guidance on the phone itself. It highlights the next thing to tap and explains it in Hindi or English. The user performs every action and can stop guidance at any time.",
                "The product hypothesis is that clear, contextual guidance could help people complete everyday tasks with less help from family. I designed the interaction and built the app and backend; v0.1.0 is available to install. The work so far establishes a working guidance experience, with user independence still to validate.",
            ],
            sections: [
                {
                    label: "The problem",
                    title: "Knowing what you want doesn't mean knowing where to tap",
                    body: [
                        "The intended user is a parent or grandparent who knows the task they want to finish but needs help navigating the interface. The difficulty might be finding the right app, understanding a label, or recovering when the next screen looks different from the instructions.",
                        "I framed the problem around the next step: how could guidance respond to the screen someone is actually looking at? Language, pacing, and the ability to ask for clarification became design requirements. These are starting assumptions to test with the intended audience.",
                    ],
                },
                {
                    label: "Scope",
                    title: "Keep every tap in the user's hands",
                    body: [
                        "The first version focuses on a simple loop: state a goal, get one instruction, perform the action, and receive the next step. Voice and text input, Hindi and English, and an overlay that works across apps support that loop.",
                        "I chose to keep all actions manual. Nudge points and explains; the user decides and taps. This keeps control visible and makes independent task completion the intended benefit. Incorrect guidance can still lead to mistakes, so this choice also requires safeguards around sensitive steps.",
                    ],
                },
                {
                    label: "The experience",
                    title: "A useful next step, even when the journey changes",
                    body: [
                        "Highlighting a button only helps when the right button is already on screen. A useful journey also needs to handle opening an app, scrolling, choosing between several options, and asking for missing information. I expanded the guidance model to cover those situations, including an explicit unsure or blocked state.",
                        "Pacing is part of the interaction. Early guidance could update while someone was still typing. The loop now distinguishes taps, typing, navigation, and content changes, waiting for a pause or a settled screen before deciding again.",
                    ],
                    bullets: [
                        "Start with a spoken or typed goal, with example tasks to make the first interaction easier to understand.",
                        "Show one highlighted control or a short instruction to find what is off-screen.",
                        "Ask when the goal is ambiguous, using large choice buttons or a text field in the overlay.",
                        "Confirm completion in plain language and keep Stop available throughout.",
                    ],
                },
                {
                    label: "Trust",
                    title: "Make sensitive steps deliberate",
                    body: [
                        "Helping someone navigate a phone requires access to sensitive screens. I limited the information sent for guidance to the structure of interactive controls, with on-device filtering that removes sensitive fields and masks personal details. Typed field contents stay on the device, and the backend processes each request without retaining the screen data.",
                        "Speed is not the priority at a payment step. Before highlighting Pay, Nudge asks the user to confirm that they have checked the name and amount. Destructive actions are blocked, and banking apps that restrict accessibility guidance receive a clear hand-off to pause Nudge.",
                        "The AI can suggest a target only from the controls supplied for that screen, and an on-device safety layer checks the suggestion before it appears. These boundaries reduce risk while keeping the user responsible for the action they take.",
                    ],
                },
                {
                    label: "Tradeoffs",
                    title: "Use AI where it adds value",
                    body: [
                        "Repeated AI requests add cost and consume rate-limit headroom. Nudge reuses guidance for identical screens within a session, ignores cosmetic redraws, and handles known launcher icons locally. Sending concise, filtered controls also reduces the amount of personal information and text each request carries.",
                        "The implementation supports those choices: a native Kotlin app reads structured controls through Android's AccessibilityService, a Node/Express backend keeps the AI key off the phone, and the model selects the next step. The provider sits behind one interface so it can change as cost and guidance quality are evaluated.",
                    ],
                },
                {
                    label: "Iteration",
                    title: "Real phones changed the design",
                    body: [
                        "Real-device testing exposed assumptions that looked reasonable in the implementation. I kept a decision log linking each change to the issue behind it, so the reasoning survives alongside the code.",
                    ],
                    bullets: [
                        "Launcher navigation: an assumed swipe-up app drawer failed on a launcher with side-swipe pages and folders. Guidance was adapted to the actual layout.",
                        "App recognition: keyword matching missed BHIM. A curated mapping from app packages to categories made recognition more dependable.",
                        "Error feedback: cancelling a request could show a false connection error. Separating cancellation from failure removed that misleading message.",
                    ],
                },
                {
                    label: "Validation",
                    title: "Measure whether people can finish on their own",
                    body: [
                        "The current evidence is an installable v0.1.0 build and fixes from real-device testing. Task completion, confidence, and reduced reliance on family remain outcomes to validate with intended users.",
                        "My next priority would be observing first-time setup and a small set of everyday tasks with parents and grandparents. Installation and two accessibility-related permissions are part of that journey; the current setup guidance suggests having someone help with the initial grants. Understanding that friction should come before expanding the feature set.",
                        "I would track the following measures alongside observation, using the findings to decide what to simplify next:",
                    ],
                    bullets: [
                        "Setup completion: can someone install the app, understand the permissions, and start a first task?",
                        "Independent task completion: which tasks can they finish without another person's intervention?",
                        "Guidance quality: where are instructions unclear or incorrect, and can the user recover?",
                        "Confidence: can the user explain what they did and feel comfortable trying the task again?",
                    ],
                },
            ],
        },
    },
    {
        title: "Doodle",
        slug: "doodle",
        description:
            "For people who need to sketch an idea together without setting up an account. Share a link to a hand-drawn whiteboard, see each other's edits live, and undo your own changes without losing someone else's work.",
        tags: ["Collaboration", "Next.js", "TypeScript", "Node.js", "WebSockets", "Yjs / CRDT", "Canvas"],
        link: "https://doodleup.vercel.app",
        github: "https://github.com/nandanpathakk/Doodle",
        tryIt: {
            url: "https://doodleup.vercel.app",
            heading: "Open a board.",
            label: "Open Doodle",
            meta: "No sign-up · works offline · runs in any browser",
            note:
                "Nothing to install and nothing to sign up for. Draw something, press Share, and send " +
                "the link to someone — you will both be on the same canvas, cursors and all. Your drawings " +
                "live in your own browser; rooms exist only while someone is connected to them.",
            steps: [
                "Open the board and sketch something.",
                "Press Share — your drawing is copied into a new room and the URL becomes /r/<room-id>.",
                "Send that link to anyone. Leaving the room returns you to your own canvas, untouched.",
            ],
        },
        image: "/images/doodle-collab.png",
        // Assistant may show these when a reply mentions Doodle.
        chatMedia: {
            enabled: true,
            max: 3,
            aspect: "landscape",
            images: [
                {
                    type: "image",
                    url: "/images/doodle-collab.png",
                    caption: "Three people in one room — live cursors and a peer's stroke mid-flight.",
                },
                {
                    type: "image",
                    url: "/images/doodle-board.png",
                    caption: "The canvas: shapes, arrows, freehand and text, rendered hand-drawn.",
                },
                {
                    type: "image",
                    url: "/images/doodle-tools.png",
                    caption: "Light theme with the styling panel — colour, width, sloppiness, edges.",
                },
            ],
        },
        media: [
            {
                type: "image",
                url: "/images/doodle-collab.png",
                caption: "Three people in one room: live cursors, a peer's stroke mid-flight, and who is here.",
            },
            {
                type: "image",
                url: "/images/doodle-board.png",
                caption: "The canvas itself — shapes, arrows, freehand and text, rendered hand-drawn.",
            },
            {
                type: "image",
                url: "/images/doodle-session.png",
                caption: "Sharing is one control: your name, the invite link, the room, and click-to-follow.",
            },
            {
                type: "image",
                url: "/images/doodle-tools.png",
                caption: "Light theme, with the styling panel: colour, width, sloppiness, edges, opacity.",
            },
        ],
        details: {
            tagline:
                "From a rough idea to a shared canvas in one link, with no sign-up and room for everyone to contribute.",
            year: "2026",
            role: "Product design & full-stack development",
            status: "Live — draw solo, or share a link",
            stack: [
                "Next.js 16",
                "React 19",
                "TypeScript",
                "Zustand",
                "RoughJS",
                "Yjs (CRDT)",
                "y-websocket",
                "Node WebSocket server (ws)",
                "IndexedDB",
            ],
            media: [
                {
                    type: "image",
                    url: "/images/doodle-board.png",
                    caption: "Start with an idea: shapes, arrows, freehand drawing, and text on one canvas.",
                },
                {
                    type: "image",
                    url: "/images/doodle-session.png",
                    caption: "Invite someone, see who is here, or follow their view from the session panel.",
                },
                {
                    type: "image",
                    url: "/images/doodle-collab.png",
                    caption: "See contributions as they happen, with named cursors and live drawing previews.",
                },
                {
                    type: "image",
                    url: "/images/doodle-tools.png",
                    caption: "Adjust the selected shape's appearance while keeping the canvas in view.",
                },
            ],
            overview: [
                "Doodle began as a hand-drawn-style drawing tool. Adding collaboration gave it a focused use case: sketch an idea, send someone a link, and work through it on the same canvas. No account or installation is required to get started.",
                "I designed and built the drawing experience and the real-time system behind it. The product decisions centered on the transition from working alone to working together: how people join, understand each other's activity, and make changes without losing work.",
                "The hypothesis is that a short path into a shared board could make quick visual collaboration easier to start. Doodle is live, with technical tests and benchmarks supporting its implementation; how easily first-time users complete that journey remains to be validated.",
            ],
            sections: [
                {
                    label: "The problem",
                    title: "Get the idea onto a shared canvas",
                    body: [
                        "The intended use is a quick shared sketch: people explaining an idea, connecting a few boxes, or drawing something together. I framed the problem around the effort between having that idea and getting another person onto the same board.",
                        "That framing led to a browser-based experience with link sharing and no sign-up. Once someone joins, seeing who is present and what they are changing becomes as important as the drawing tools themselves. These are design assumptions to test with people using the board for a real task.",
                    ],
                },
                {
                    label: "Scope",
                    title: "Make sharing a continuation of drawing",
                    body: [
                        "I kept the central journey focused on drawing, sharing, and joining. The core tools are shapes, arrows, freehand, and text on an infinite canvas, with a hand-drawn appearance. Sharing carries an existing sketch into a session, so someone can start alone and invite help when they need it.",
                    ],
                    bullets: [
                        "Start on a personal canvas and sketch an idea without creating an account.",
                        "Press Share to copy that drawing into a new room and send the invite link.",
                        "Join the same canvas, see other participants, and work together in real time.",
                        "Leave the room to return to the personal canvas as it was before sharing.",
                    ],
                },
                {
                    label: "Collaboration",
                    title: "Show what the other person is doing",
                    body: [
                        "A shared board needs to communicate activity. Named cursors, selections, and live drawing previews show where someone is working before their gesture finishes. The session panel brings together participants, the invite link, and a control to follow another person's view.",
                        "The implementation separates live presence from saved changes. Cursors and in-progress strokes travel as temporary updates; a completed gesture becomes one document change. This lets collaborators see an action unfold while keeping undo aligned with the action the person actually made.",
                    ],
                },
                {
                    label: "User control",
                    title: "Make it safe to change your mind",
                    body: [
                        "The original undo restored a snapshot of the entire drawing. In a shared room, that could remove work another person had just added. I changed undo to apply only to the current user's changes, so correcting a mistake respects other people's contributions.",
                        "Concurrent edits needed the same care. If one person moves a box while another changes its colour, both changes should survive. Yjs merges those properties independently and merges shared text edits. The editor also preserves the caret when remote text arrives, protecting the flow of typing as well as the content.",
                        "The personal canvas and each room remain separate documents. Joining a link does not push a person's existing drawing into someone else's room. This boundary makes entering and leaving a session predictable.",
                    ],
                },
                {
                    label: "Tradeoffs",
                    title: "Keep access simple and explain the limits",
                    body: [
                        "Anyone with the invite link can view and edit the room. That keeps joining simple, with no account or permission setup, but it also means the link must be treated as access. Participant permissions and end-to-end encryption are outside the current scope; the relay reads sync data to bring new participants up to date.",
                        "Drawings are stored locally in the browser using IndexedDB. The relay holds a room in memory while participants are connected and removes it when the last one leaves. Local editing can continue offline and merge on reconnect, but the server does not provide a permanent board library. Browser storage and an active shared session have different lifetimes.",
                        "Those limits matter when deciding what to build next. Persistent shared boards would require decisions about storage, ownership, and access alongside the interface for returning to them.",
                    ],
                },
                {
                    label: "Iteration",
                    title: "Test the moments that interrupt a conversation",
                    body: [
                        "Testing across real browser tabs exposed issues that sync tests alone missed. Following someone else's view stopped when they backgrounded their tab, because temporary silence was interpreted as leaving. Fast pencil input also dropped points, changing the stroke the person had drawn.",
                        "Both issues were fixed and documented with the checks used to verify them. Automated tests cover peers reaching the same document state, per-user undo, late joins, and presence through a real WebSocket relay. Browser testing adds the interaction details: switching tabs, drawing quickly, and keeping a shared view stable.",
                    ],
                },
                {
                    label: "Technical evidence",
                    title: "Check responsiveness as the board grows",
                    body: [
                        "The project's load harness exercises a room with 2,000 elements and six peers sending cursor updates at 30Hz. These measurements describe that test scenario and provide engineering evidence for the shared experience.",
                    ],
                    bullets: [
                        "A joining peer caught up to the room's state in about 50ms in the harness.",
                        "Moving one element produced a 35-byte document update, keeping changes small as the drawing grew.",
                        "Thinning live stroke previews reduced a measured 300-point stroke's network traffic from 907 kB to 197 kB.",
                        "The measured initial geometry generation for 2,000 elements took about 82ms, with subsequent full repaints at 4–5ms.",
                    ],
                },
                {
                    label: "Next steps",
                    title: "Validate the path from invite to shared idea",
                    body: [
                        "Doodle is live and supports solo drawing and link-based collaboration. The next product question is whether first-time users can start and finish a shared sketch without help. The technical checks establish a foundation; ease of use and repeat use remain to be evaluated.",
                        "I would observe pairs working through a small sketching task, including inviting someone, editing together, undoing a change, and leaving the session. I would also check whether they understand who can access the link and where their drawing will be available afterward.",
                    ],
                    bullets: [
                        "Time to collaboration: how long does it take from opening the app to both people making a contribution?",
                        "Task completion: can the pair finish their sketch without assistance or unexpected loss of work?",
                        "Session clarity: do participants understand sharing, undo, and the difference between their personal canvas and the room?",
                        "Return intent: what would make the pair choose Doodle again, and would saved boards or access controls change that decision?",
                    ],
                },
            ],
        },
    },
    {
        title: "Toss",
        slug: "toss",
        description:
            "For Solana users who want to explore prediction markets on their phones. Toss brings discovery and trade review together, with rules and full cost visible before committing. Built on Panta; the mobile app is coming soon.",
        tags: ["Hackathon project", "Mobile UX", "Prediction markets", "Solana", "Panta"],
        link: "https://tossitup.vercel.app/",
        demo: {
            url: "https://www.youtube.com/watch?v=K4RLt73w9IU",
            youtubeId: "K4RLt73w9IU",
        },
        tryIt: {
            url: "https://tossitup.vercel.app/",
            heading: "Meet Toss.",
            label: "Visit Toss",
            meta: "Mobile app · Coming soon · Built on Panta",
            note: "Explore the product and see how Toss brings prediction markets to your phone. The website introduces the app; it does not place trades or move funds.",
        },
        image: "/images/toss/cover.jpg",
        media: [
            { type: "image", url: "/images/toss/cover.jpg", caption: "Toss — Back your view. Built on Panta." },
            { type: "image", url: "/images/toss/discover.webp", caption: "Discover live prediction markets and explore YES and NO outcomes." },
            { type: "image", url: "/images/toss/review.webp", caption: "Review a trade before confirming it." },
        ],
        chatMedia: {
            enabled: true,
            max: 2,
            aspect: "portrait",
            fit: "contain",
            images: [
                { type: "image", url: "/images/toss/discover.webp", caption: "Toss market discovery." },
                { type: "image", url: "/images/toss/review.webp", caption: "Trade review design using sample data, with no wallet connected." },
            ],
        },
        details: {
            tagline: "A mobile prediction-market experience built around understanding the question, reviewing the cost, and choosing whether to commit.",
            year: "2026",
            role: "Product & mobile development",
            status: "Hackathon product · Coming soon",
            stack: ["React Native", "TypeScript", "Solana", "Panta", "Privy"],
            media: [
                {
                    type: "image",
                    url: "/images/toss/discover.webp",
                    caption: "Discovery brings search, categories, outcome prices, and market timing into one view.",
                },
                {
                    type: "image",
                    url: "/images/toss/review.webp",
                    caption: "Trade review design: sample data, itemized costs, and an explicit acknowledgement before signing. No wallet connected.",
                },
            ],
            overview: [
                "Toss explores how Solana users could discover and participate in prediction markets from their phones. The central product question is how to help someone understand a market and the commitment they are making before approving a transaction.",
                "My work spans product and mobile development. The experience connects discovery, YES or NO outcomes, trade review, and positions, with attention to the information needed at each decision. Panta provides the market foundation for the mobile experience.",
                "Toss is an independent, unofficial hackathon project. The website and demo introduce the experience, and the mobile app is coming soon. The hypothesis is that a clear path from discovery to review could support more informed participation; that benefit remains to be validated.",
            ],
            sections: [
                {
                    label: "The problem",
                    title: "A YES or NO choice still needs context",
                    body: [
                        "The intended audience is Solana users who want to explore prediction markets on mobile. A short question and two outcomes can look straightforward, but deciding to participate also requires understanding the resolution rules, timing, price, and costs.",
                        "I framed the problem around those decisions: what should someone know while browsing, and what needs to be explicit before they sign? Familiarity with a wallet does not establish familiarity with prediction markets, so comprehension is a key assumption to test.",
                    ],
                },
                {
                    label: "Scope",
                    title: "Connect discovery to a deliberate decision",
                    body: [
                        "The core journey brings finding a market, understanding the question, reviewing a trade, and following a position into one mobile experience. It gives the product a complete decision to design around, with wallet approval as a distinct step.",
                    ],
                    bullets: [
                        "Discover a market through search or categories and inspect its YES and NO outcomes.",
                        "Understand how and when the question resolves before choosing a position.",
                        "Review the selected outcome, itemized costs, and estimated shares before signing.",
                        "Return to balances and positions to follow the commitment afterward.",
                    ],
                },
                {
                    label: "Discovery",
                    title: "Help people find a question worth understanding",
                    body: [
                        "The discovery screen combines search, topic categories, and market cards. Each card puts the question alongside outcome prices, activity, and an end date. The aim is to give someone enough context to choose what to examine next.",
                        "Labels matter here. Prices are shown in USDC per share, and a timestamp identifies the price snapshot. These details support interpretation of the numbers, but whether users understand them should be checked through observation and explanation in their own words.",
                    ],
                },
                {
                    label: "Trade review",
                    title: "Make the commitment visible before signing",
                    body: [
                        "The review design repeats the market question, selected outcome, and network so the user can check what they are about to approve. It separates the order amount and protocol fee in USDC from the network fee and account rent in SOL, alongside estimated shares and the wallet address.",
                        "The design also explains that prices and final shares can change. An acknowledgement and a swipe-to-buy control make confirmation a deliberate action. That additional interaction is a design choice to evaluate: it should support understanding and control, including the ability to reconsider.",
                        "The review screen shown in this case study uses sample data and has no wallet connected. It demonstrates the intended decision flow.",
                    ],
                },
                {
                    label: "User control",
                    title: "Keep wallet approval explicit",
                    body: [
                        "Toss is designed around non-custodial participation, with users signing through their own wallet. The experience needs to connect the market decision to that wallet action so someone understands the permission they are granting.",
                        "The product's safety approach includes transaction simulation and one-time approvals. Clear costs and explicit approval support an informed decision, while participation still carries the possibility of loss. Confirmation feedback and recovery from a rejected or failed transaction would be important parts of validation.",
                    ],
                },
                {
                    label: "Tradeoffs",
                    title: "Build the mobile experience on an existing foundation",
                    body: [
                        "Building on Panta gives Toss a market foundation to build around. React Native and TypeScript support the mobile interface, with Solana and Privy in the stack. The product work focuses on how discovery, market information, and wallet interactions fit together on a phone.",
                        "That dependency also shapes the experience: market rules, available data, and transaction behavior need to be represented accurately in the interface. Market creation is another product path with its own decisions and onboarding needs. I would validate the discovery-to-review journey before expanding the scope further.",
                    ],
                },
                {
                    label: "Validation",
                    title: "Check understanding before measuring conversion",
                    body: [
                        "The current artifacts are the hackathon website, demo, and product screens. They show the intended experience; user comprehension, successful transaction completion, and repeat use remain to be validated.",
                        "My next step would be task-based sessions with Solana users using sample markets and a test environment. I would observe how they find a market, interpret its rules, and review a proposed trade, then ask them to explain the commitment in their own words.",
                    ],
                    bullets: [
                        "Discovery: can someone find a relevant market and explain its question and resolution conditions?",
                        "Cost comprehension: can they distinguish the order amount, fees in each currency, and estimated shares?",
                        "Approval clarity: do they understand what signing does and when they can reconsider?",
                        "Recovery: can they understand and recover from a rejected approval, a failed transaction, or an updated price?",
                        "Follow-up: can they find their position and understand its current state afterward?",
                    ],
                },
            ],
        },
    },
    {
        title: "Halt",
        description:
            "For developers running commands themselves or through AI tools. Halt is a Rust-based safety layer designed to flag suspicious terminal commands and warn before they run, giving developers a chance to review the risk.",
        tags: ["Developer experience", "Rust", "Security", "AI tooling"],
        link: "#",
        github: "#",
        image: "/images/Halt.png",
        chatMedia: { enabled: false },
        comingSoon: true,
    },
    {
        title: "Chessling",
        description: "Real-time chess for Solana mobile players, built for a hackathon. Players stake funds on a match, play head-to-head, and compete for a pot paid to the winner after a small platform fee.",
        tags: ["Hackathon project", "Multiplayer", "React Native", "Expo", "TypeScript", "Supabase", "Web3"],
        github: [
            { label: "App", url: "https://github.com/nandanpathakk/ChessLing-mobile" },
            { label: "Server", url: "https://github.com/nandanpathakk/chessling-server" }
        ],
        image: "/images/Chessling_home.jpg",
        chatMedia: { enabled: false },
        media: [
            { type: "image", url: "/images/Chessling_home.jpg" },
            { type: "image", url: "/images/Chessling_board.jpg" },
            { type: "video", url: "/videos/chessling_demo.mp4" }
        ],
    },
    // {
    //     title: "Peg",
    //     description: "A GitHub issue estimator where users enter a repo and get all open issues with estimated cost and difficulty level.",
    //     tags: ["GitHub API", "OpenAi API", "Supabase", "Hackathon project"],
    //     link: "https://github-issue-estimator.vercel.app",
    //     github: "https://github.com/nandanpathakk/github-issue-estimator",
    //     image: "/images/peg.png",
    // },
    // {
    //     title: "Chatbox",
    //     description: "A real-time chat application with live messaging functionality.",
    //     tags: ["Next.js", "Pusher", "Tailwind CSS"],
    //     link: "https://chatbox-gamma-teal.vercel.app/login",
    //     github: "https://github.com/nandanpathakk/Real-time-chat-app",
    //     image: "/images/Chatbox.webp",
    // },
];
