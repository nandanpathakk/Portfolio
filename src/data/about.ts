/**
 * The About section, as prose. `aboutItems` is also read by the assistant
 * (src/app/api/ai-about/route.ts), so keep the title/description shape.
 */
export const aboutItems = [
    {
        title: "How I started",
        description:
            "I started out as a kid breaking HTML templates to see what would happen. I still do roughly that, with better tools.",
    },
    {
        title: "Why product",
        description:
            "I write code for a living, but the part of the job I enjoy most is the product side. I like being in the conversation about who something is for, what they're trying to get done, and whether they'll actually like what we're about to build. In college I started Stack Heads, a product design community, for the same reason.",
    },
    {
        title: "What I'm looking for",
        description:
            "That's why my side projects come with write-ups about the decisions, and why I'm looking at product management roles alongside developer ones. I'd be a PM who can read the codebase and knows what a feature really costs to build.",
    },
];
