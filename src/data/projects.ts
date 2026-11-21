import { Project } from "@/types";

export const projectsData: Project[] = [
    {
        title: "Nudge",
        slug: "nudge",
        description:
            "An Android app for parents and grandparents who get stuck on their phones. You say what you want to do, in Hindi or English, and Nudge circles the next thing to tap and explains it. It never taps for you.",
        kind: "Android app, 2026",
        pitch: "Shows your parents where to tap next. Never taps for them.",
        facts: ["Android", "Hindi + English", "Kotlin", "v0.1.0 out now"],
        theme: { bg: "#0c4a38", fg: "#eafff5", accent: "#7ff0bb" },
        homeShots: {
            orientation: "portrait",
            urls: ["/images/nudge_4.jpeg", "/images/nudge_7.jpeg", "/images/nudge_8.jpeg"],
        },
        tags: ["Accessibility", "Android", "Kotlin", "Jetpack Compose", "Node.js", "LLM"],
        github: "https://github.com/nandanpathakk/Nudge",
        // Bump the version in `url`, `meta` and `releaseUrl` with each release —
        // the asset filename is version-stamped, so it can't be a "latest" link.
        download: {
            url: "https://github.com/nandanpathakk/Nudge/releases/download/v0.1.0/nudge-v0.1.0.apk",
            meta: "v0.1.0 · 1.1 MB · Android 8.0+",
            note:
                "Nudge isn't on the Play Store. It's a personal project, so you install it directly. " +
                "It asks for two permissions and explains both before it asks: one to read what's on the " +
                "screen, so it knows what to point at, and one to draw the highlight over other apps. " +
                "If you're setting this up for a parent or grandparent, sit with them for those two grants " +
                "once. After that, it's press the mic and say what you need.",
            steps: [
                "Download the APK on your Android phone.",
                "Open it and allow installs from your browser. That's normal for apps outside the Play Store.",
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
                    caption: "One step at a time. Nudge points, the user taps.",
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
                "An Android app that shows a parent or grandparent where to tap next, in Hindi or English, and leaves every tap to them.",
            year: "2026",
            role: "Product design and full-stack development",
            status: "v0.1.0 is out and installable",
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
                    caption: "It starts with a goal. Say it, type it, or tap an example, in Hindi or English.",
                },
                {
                    type: "image",
                    url: "/images/nudge_5.jpeg",
                    caption: "Sometimes the right button isn't on screen yet, so Nudge explains how to find the app first.",
                },
                {
                    type: "image",
                    url: "/images/nudge_7.jpeg",
                    caption: "One step at a time, and Stop is always there.",
                },
                {
                    type: "image",
                    url: "/images/nudge_8.jpeg",
                    caption: "When it's done, it says what changed in plain words.",
                },
            ],
            overview: [
                "If you're the tech person in your family, you know this phone call. A button has moved, a setting is buried, or an app is using a word nobody recognises. Walking someone through it from far away is slow, and it doesn't stick. The next time the task comes up, so does the call.",
                "Nudge is an Android app for the person on the other end of that call. They say or type what they want to do, in Hindi or English. Nudge looks at the screen they're on, draws a ring around the next thing to tap, and says why in one sentence. They do the tapping, and they can stop it whenever they like.",
                "I designed it and built both halves, the Kotlin app and the Node backend. Version 0.1.0 is out and you can install it today. What I can't tell you yet is whether it works for the people it's meant for. I've tested it on real phones, but I haven't yet watched a parent use it. More on that at the end.",
            ],
            sections: [
                {
                    label: "The problem",
                    title: "They know what they want. They don't know where it is.",
                    body: [
                        "The person I had in mind isn't confused about the goal. They want to pay a bill, or send a photo, or make the text bigger. What stops them is the interface: which app, which label, and what to do when the next screen doesn't look like the one they were told about.",
                        "So I stopped thinking about tutorials and started thinking about the next step, on the screen that's actually in front of them. That gave me my requirements early. It had to speak their language, go at their pace, and let them ask what it meant.",
                    ],
                },
                {
                    label: "The main decision",
                    title: "Nudge points. It never taps.",
                    body: [
                        "The obvious version of this product does the task for you. I decided against it. If the app pays the bill, the person learns nothing and is just as stuck next month. If the app shows them where to tap and they do it themselves, there's a chance that one day they won't need it.",
                        "So the first version is one loop: say what you want, get one instruction, do it, get the next one. It takes voice or text, in Hindi or English, and the overlay works on top of any app.",
                        "This has a cost. If Nudge points at the wrong thing, someone who trusts it will tap the wrong thing. Leaving the tap to the user doesn't remove that risk, which is why the section on trust below exists.",
                    ],
                },
                {
                    label: "What I got wrong",
                    title: "A ring around a button isn't enough",
                    body: [
                        "My first idea of guidance was simple: find the right button and highlight it. That only works when the right button is already on screen. Real tasks start with opening an app. They involve scrolling. Sometimes there are several options and it isn't clear which one the person means. So Nudge had to learn to say \"open this app first\", \"scroll down\", \"which of these do you mean?\" and also \"I'm not sure\".",
                        "Timing was the other thing. Early builds would change the instruction while someone was still typing, which is as annoying as it sounds. Nudge now tells apart a tap, typing, moving to a new screen and content that's simply changing, and it waits for a pause or a settled screen before it speaks again.",
                        "A session now goes like this:",
                    ],
                    bullets: [
                        "You say or type a goal. There are example tasks to tap if you don't know what to ask.",
                        "You get one ring, or one short instruction if the thing you need is off screen.",
                        "If the goal is vague, Nudge asks, with big buttons or a text box right in the overlay.",
                        "When you're done it tells you so in plain words. Stop is on screen the whole time.",
                    ],
                },
                {
                    label: "Trust",
                    title: "Slow down at the scary steps",
                    body: [
                        "To help with a screen, Nudge has to read it, and phone screens are full of private things. So it sends only the structure of the tappable controls. Before anything leaves the phone, sensitive fields are removed and personal details are masked. What you type stays on the device. The backend handles each request and keeps nothing.",
                        "Payments get special treatment. Before Nudge will highlight Pay, it asks you to confirm you've checked the name and the amount. Destructive actions are blocked outright. And when a banking app refuses to work with accessibility tools, Nudge says so clearly and tells you to pause it.",
                        "The model can only pick from the controls it was given for that screen, and its pick goes through a safety check on the phone before a ring is drawn. A wrong suggestion is still possible. These checks are there to keep it away from the steps where it would cost someone money.",
                    ],
                },
                {
                    label: "Cost",
                    title: "Not every screen needs the model",
                    body: [
                        "Every model call costs money and uses up rate limit, and this is a personal project. So Nudge reuses its answer when it sees the same screen twice in a session, ignores redraws that change nothing meaningful, and recognises known launcher icons on the phone without asking the model at all. Sending a short, filtered list of controls helps here too: fewer tokens, and less personal text in each request.",
                        "For the technically curious: a native Kotlin app reads the screen through Android's AccessibilityService. A Node and Express backend holds the API key, so it never sits on the phone. Gemini 2.5 Flash picks the next step. The model sits behind one interface, so I can swap it when something cheaper or better turns up.",
                    ],
                },
                {
                    label: "Real phones",
                    title: "Three things I only found on a real phone",
                    body: [
                        "I keep a decision log that ties each change to the problem that caused it. Three entries from it:",
                    ],
                    bullets: [
                        "I assumed every launcher opens its app drawer with a swipe up. One I tested on had side-swipe pages and folders instead. Guidance now adapts to the layout it actually finds.",
                        "Matching apps by keyword missed BHIM, because nothing in that name says \"payments\" to a keyword matcher. I replaced it with a hand-kept map from app packages to categories.",
                        "Cancelling a request showed a connection error. Nothing had failed; the user had cancelled. Those are now two separate cases.",
                    ],
                },
                {
                    label: "What I don't know",
                    title: "Whether a parent can finish a task alone",
                    body: [
                        "Here is where things really stand. There's an installable app and a list of fixes from testing on real devices. I have not yet sat a parent or grandparent down with it and watched. Until I do, everything above is a set of reasonable guesses.",
                        "That comes next, before any new feature. I especially want to watch first-time setup. Installing from outside the Play Store and granting two accessibility permissions is a lot to ask. Right now my own instructions say \"get someone to help with this part\", which is me admitting it's too hard.",
                        "What I'll be watching for:",
                    ],
                    bullets: [
                        "Can they get through the install and the permissions, and start a first task?",
                        "Which everyday tasks can they finish with nobody stepping in?",
                        "Where is the guidance unclear or wrong, and can they recover from it?",
                        "Afterwards, can they tell me what they did, and would they try it again on their own?",
                    ],
                },
            ],
        },
    },
    {
        title: "Doodle",
        slug: "doodle",
        description:
            "A whiteboard for sketching something out with another person, right now. There's no account: draw, press Share, send the link. You see each other's cursors and strokes live, and undo only ever undoes your own changes.",
        kind: "Web app, live, 2026",
        pitch: "A whiteboard you share with one link. Your undo never deletes my work.",
        facts: ["Live", "No sign-up", "Next.js", "Yjs CRDT"],
        theme: { bg: "#f3ecdc", fg: "#17151c", accent: "#e2452a" },
        homeShots: {
            orientation: "landscape",
            urls: ["/images/doodle-collab.png"],
        },
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
                "the link to someone. You'll both be on the same canvas, cursors and all. Your drawings " +
                "live in your own browser; rooms exist only while someone is connected to them.",
            steps: [
                "Open the board and sketch something.",
                "Press Share. Your drawing is copied into a new room and the URL becomes /r/<room-id>.",
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
                    caption: "Three people in one room, with live cursors and a stroke still being drawn.",
                },
                {
                    type: "image",
                    url: "/images/doodle-board.png",
                    caption: "The canvas: shapes, arrows, freehand and text, rendered hand-drawn.",
                },
                {
                    type: "image",
                    url: "/images/doodle-tools.png",
                    caption: "Light theme with the styling panel: colour, width, sloppiness, edges.",
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
                caption: "The canvas itself: shapes, arrows, freehand and text, all drawn to look hand-sketched.",
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
                "A hand-drawn whiteboard you share with a link. There's no account, and your undo never deletes someone else's work.",
            year: "2026",
            role: "Product design and full-stack development",
            status: "Live. Draw alone, or share a link.",
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
                    caption: "Shapes, arrows, freehand and text on one canvas.",
                },
                {
                    type: "image",
                    url: "/images/doodle-session.png",
                    caption: "The session panel: who's here, the invite link, and a button to follow someone's view.",
                },
                {
                    type: "image",
                    url: "/images/doodle-collab.png",
                    caption: "Three people in one room, with named cursors and a stroke still being drawn.",
                },
                {
                    type: "image",
                    url: "/images/doodle-tools.png",
                    caption: "Light theme, with the styling panel open beside the canvas.",
                },
            ],
            overview: [
                "Doodle began as a small drawing tool that makes everything look hand-sketched. Then I added collaboration, and it found a clearer job. You have an idea, you sketch it, you send someone a link, and now you're both drawing on it. Nobody makes an account and nobody installs anything.",
                "I designed and built all of it, the canvas and the real-time system behind it. The decisions worth writing about are all around one moment, going from drawing alone to drawing with someone. How do they get in? How does each of you know what the other is doing? What happens when you both change the same thing?",
                "It's live, and there are tests and benchmarks behind the sync. What I haven't done is watch strangers use it for a real task, so I can vouch for the engineering more than for how easy it is to use.",
            ],
            sections: [
                {
                    label: "The problem",
                    title: "The gap between having an idea and sharing a canvas",
                    body: [
                        "Picture two people on a call, and one of them says \"wait, let me just draw it.\" What usually follows is a hunt for a tool, a sign-up form and a workspace invite. By then the thought has gone cold.",
                        "I wanted that gap to be one link. So Doodle runs in the browser, needs no account, and sharing is a single button. And once a second person is on the board, knowing who's there and what they're touching matters as much as the pen does.",
                    ],
                },
                {
                    label: "Sharing",
                    title: "You start alone. Sharing is one button.",
                    body: [
                        "I didn't want a \"create a room\" step at the front door. You open Doodle and you're already on your own canvas, with shapes, arrows, freehand and text, and no edge to run into. Sharing comes later, when you want it:",
                    ],
                    bullets: [
                        "Sketch on your own canvas. No account.",
                        "Press Share. Your drawing is copied into a new room and you get a link.",
                        "Whoever opens the link is on the same canvas as you, live.",
                        "Leave the room and you're back on your own canvas, just as you left it.",
                    ],
                },
                {
                    label: "Presence",
                    title: "Seeing the stroke before it's finished",
                    body: [
                        "On a shared board, the most useful thing to know is what the other person is doing right now. So you see named cursors, what each person has selected, and their stroke while they're still drawing it. One panel holds who's here, the invite link and a button to follow someone's view.",
                        "Behind this there are two kinds of data. Cursors and half-drawn strokes are throwaway; they get broadcast and forgotten. A finished gesture becomes exactly one change to the document. That split is what lets you watch someone draw a line and still have undo treat that line as a single thing.",
                    ],
                },
                {
                    label: "Undo",
                    title: "Your undo shouldn't delete my work",
                    body: [
                        "My original undo restored a snapshot of the whole drawing. Alone, that's fine. In a shared room it's a disaster: you undo your last line and take my last three shapes with it. I rebuilt undo so it only walks back the changes you made yourself.",
                        "Simultaneous edits needed the same thinking. If you move a box while I change its colour, both changes should stick. Doodle uses Yjs, a CRDT library, which merges those properties separately and also merges text typed by two people at once. I made the editor hold your caret in place when someone else's text arrives, because losing your cursor mid-sentence is a small data loss of its own.",
                        "One more boundary. Your personal canvas and a room are different documents. Opening someone's link never pours your drawing into their room.",
                    ],
                },
                {
                    label: "Limits",
                    title: "What the simple version costs",
                    body: [
                        "Anyone with the link can view and edit. That's what makes joining instant, and it means the link is the key, so share it carefully. There are no per-person permissions and no end-to-end encryption. The relay server reads the sync data, because that's how it brings a late joiner up to date.",
                        "Your drawings live in your own browser, in IndexedDB. A room lives in the server's memory only while someone is in it. When the last person leaves, it's gone. You can keep drawing offline and it merges when you reconnect, but there's no library of saved shared boards.",
                        "I've left it this way on purpose for now. Saved shared boards sound like a small feature and they aren't. They need answers about storage, who owns a board, and who's allowed back in.",
                    ],
                },
                {
                    label: "Bugs",
                    title: "Two bugs the automated tests didn't catch",
                    body: [
                        "Both showed up only with real browser tabs open side by side.",
                        "Following someone's view would stop whenever they switched to another tab. Their browser went quiet in the background, and I was treating quiet as \"left the room\". The second one: drawing fast with the pencil dropped points, so the line on screen wasn't the line you'd drawn.",
                        "Both are fixed and written up, along with how I checked them. The automated tests cover the sync side: two peers ending on the same document, per-user undo, joining late, and presence through a real WebSocket relay. Switching tabs, drawing fast and keeping a followed view steady are things I check in a real browser.",
                    ],
                },
                {
                    label: "Numbers",
                    title: "How it holds up with 2,000 shapes",
                    body: [
                        "I wrote a load harness: one room, 2,000 elements, and six peers each sending cursor updates 30 times a second. These numbers come from that setup, not from real usage.",
                    ],
                    bullets: [
                        "A new peer caught up with the room in about 50ms.",
                        "Moving one element sent a 35-byte update, so changes stay small as the drawing grows.",
                        "Thinning out live stroke previews cut the traffic for a 300-point stroke from 907 kB to 197 kB.",
                        "Building the geometry for 2,000 elements took about 82ms the first time. Full repaints after that took 4 to 5ms.",
                    ],
                },
                {
                    label: "Next",
                    title: "Watch two people try it cold",
                    body: [
                        "The engineering is in decent shape. The open question is a product one. Can two people who've never seen Doodle start and finish a sketch together, without me explaining anything?",
                        "I'd give pairs a small task and watch all of it: inviting, drawing together, undoing something, leaving. Then I'd ask two things the interface should already have made obvious. Who can open that link? And where is your drawing now?",
                    ],
                    bullets: [
                        "How long is it from opening the app until both people have drawn something?",
                        "Do they finish without help and without losing work?",
                        "Do they understand Share, undo, and the difference between their own canvas and the room?",
                        "Would they use it again, and would saved boards or permissions change that?",
                    ],
                },
            ],
        },
    },
    {
        title: "Toss",
        slug: "toss",
        description:
            "A mobile app for exploring prediction markets on Solana, built on Panta for a hackathon. The part I care about is the screen before you commit: the rules, every cost and what you get, all visible before you sign. The app itself is coming soon.",
        kind: "Mobile app, hackathon project, 2026",
        pitch: "Prediction markets on your phone, with every cost on screen before you sign.",
        facts: ["Hackathon", "React Native", "Solana", "Built on Panta"],
        theme: { bg: "#2a1263", fg: "#f2ebff", accent: "#c8a6ff" },
        homeShots: {
            orientation: "portrait",
            urls: ["/images/toss/discover.webp", "/images/toss/review.webp"],
        },
        tags: ["Hackathon project", "Mobile UX", "Prediction markets", "Solana", "Panta"],
        link: "https://tossitup.vercel.app/",
        demo: {
            url: "https://www.youtube.com/watch?v=K4RLt73w9IU",
            youtubeId: "K4RLt73w9IU",
        },
        tryIt: {
            url: "https://tossitup.vercel.app/",
            heading: "See the Toss website.",
            label: "Visit Toss",
            meta: "Mobile app · Coming soon · Built on Panta",
            note: "The website shows what the app will do. It doesn't place trades or move any money.",
        },
        image: "/images/toss/cover.jpg",
        media: [
            { type: "image", url: "/images/toss/cover.jpg", caption: "Toss. Back your view. Built on Panta." },
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
            tagline: "Prediction markets on your phone, designed so you know what you're agreeing to before you sign.",
            year: "2026",
            role: "Product and mobile development",
            status: "Hackathon project. The app is coming soon.",
            stack: ["React Native", "TypeScript", "Solana", "Panta", "Privy"],
            media: [
                {
                    type: "image",
                    url: "/images/toss/discover.webp",
                    caption: "Discovery: search, categories, outcome prices and when each market ends.",
                },
                {
                    type: "image",
                    url: "/images/toss/review.webp",
                    caption: "The review screen, with sample data and no wallet connected. Costs are itemised and you acknowledge them before signing.",
                },
            ],
            overview: [
                "Toss is a mobile app for finding and taking part in prediction markets on Solana. I built it for a hackathon, on top of Panta, which provides the markets. It's an independent, unofficial project.",
                "I worked on both the product and the React Native app. The question I kept coming back to was this: when someone is about to approve a transaction, do they understand the market and what they're committing to?",
                "One caveat before you read on. What exists today is the website, a demo video and the product screens. The app is coming soon, and the review screen shown here uses sample data with no wallet connected. So this is a write-up of design decisions, not of results.",
            ],
            sections: [
                {
                    label: "The problem",
                    title: "Two buttons, and a lot to know first",
                    body: [
                        "The people I designed for already use Solana and are curious about prediction markets on their phone. They know how a wallet works. That doesn't mean they know how a prediction market works, and I tried not to assume it.",
                        "To decide whether to take a side, you need to know how the question gets resolved, when, what a share costs right now, and what you'll pay in fees. So I organised the design around two moments. What do you need while you're browsing? And what has to be spelled out before you sign?",
                    ],
                },
                {
                    label: "Scope",
                    title: "One whole decision, start to finish",
                    body: [
                        "I kept the scope to a single journey, so there would be one complete decision to design properly. Wallet approval is its own step at the end.",
                    ],
                    bullets: [
                        "Find a market by search or category and see its YES and NO prices.",
                        "Read how and when the question resolves.",
                        "Review your side, the itemised costs and the estimated shares before signing.",
                        "Come back later to your balance and your positions.",
                    ],
                },
                {
                    label: "Discovery",
                    title: "Enough on the card to decide what to open",
                    body: [
                        "The discovery screen has search, topic categories and market cards. Each card carries the question, both outcome prices, how active the market is and when it ends. The aim is modest: help you pick which question deserves a closer look.",
                        "The small labels matter more than they look. Prices are shown in USDC per share, and a timestamp says when that price was captured, because a price without a time is misleading in a market that moves. Whether people read those labels the way I intend is something I'd have to test, by asking them to explain a card back to me.",
                    ],
                },
                {
                    label: "Review",
                    title: "Everything you're agreeing to, on one screen",
                    body: [
                        "The review screen repeats the question, the side you picked and the network, so you can check you're approving what you think you are. Costs are split out: the order amount and protocol fee in USDC, the network fee and account rent in SOL. Next to those are the estimated shares and your wallet address.",
                        "It also says, in words, that the price and the final number of shares can change. Then there's an acknowledgement, and a swipe to buy where you might expect a tap. I added that friction on purpose. It may turn out to be more annoying than helpful, and that's something to test. The idea is that confirming should feel like a decision, with a moment to back out.",
                    ],
                },
                {
                    label: "Control",
                    title: "Your wallet, your signature",
                    body: [
                        "Toss is designed to be non-custodial. You sign every trade in your own wallet. The design job is to connect the decision you made in the app to the approval your wallet asks for, so the permission you're granting isn't a mystery.",
                        "The safety approach includes simulating the transaction first and using one-time approvals. None of that changes the basic fact that you can lose money in a prediction market. I'd also want to design the unhappy paths properly: what you see when you reject the approval, or when the transaction fails.",
                    ],
                },
                {
                    label: "Tradeoffs",
                    title: "What building on Panta decides for me",
                    body: [
                        "Using Panta meant I didn't have to build markets, only the experience around them. The app is React Native and TypeScript, with Solana and Privy in the stack.",
                        "The dependency cuts both ways. Panta's rules, the data it exposes and how its transactions behave all have to be shown accurately, so parts of the interface aren't mine to simplify. I also left out market creation. It's a different product path with its own onboarding, and I'd rather get finding and reviewing right first.",
                    ],
                },
                {
                    label: "Next",
                    title: "Can they explain it back?",
                    body: [
                        "Before caring about conversion, I want to know whether people understand what they're looking at. The plan is task-based sessions with Solana users, on sample markets in a test environment: find a market, read its rules, review a trade, then tell me in their own words what they'd be committing to.",
                    ],
                    bullets: [
                        "Can they find a market and explain its question and how it resolves?",
                        "Can they separate the order amount, the fees in each currency and the estimated shares?",
                        "Do they know what signing does, and when they can still back out?",
                        "Can they recover from a rejected approval, a failed transaction or a changed price?",
                        "Afterwards, can they find their position and say what state it's in?",
                    ],
                },
            ],
        },
    },
    {
        title: "Halt",
        description:
            "A safety net for the terminal, written in Rust. It checks a command before it runs, whether you typed it or an AI tool did, and stops to warn you if it looks dangerous. Still in progress.",
        kind: "Rust CLI, in progress",
        tags: ["Developer experience", "Rust", "Security", "AI tooling"],
        link: "#",
        github: "#",
        image: "/images/Halt.png",
        chatMedia: { enabled: false },
        comingSoon: true,
    },
    {
        title: "Chessling",
        description: "Real-time chess for Solana mobile, from a hackathon. Two players each put up a stake and play head to head. The winner takes the pot, minus a small platform fee.",
        kind: "React Native app, hackathon project",
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
