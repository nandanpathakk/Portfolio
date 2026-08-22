export interface MediaItem {
    type: 'image' | 'video';
    url: string;
    caption?: string;
}

export interface CaseStudySection {
    label: string;      // mono kicker, e.g. "Interaction model"
    title: string;      // display heading
    body: string[];     // paragraphs
    bullets?: string[]; // optional supporting list
}

export interface ProjectDetails {
    tagline: string;
    year: string;
    role: string;
    status: string;
    stack: string[];
    overview: string[];
    sections: CaseStudySection[];
    media?: MediaItem[];
}

/** A downloadable build of a project — an app people can actually install. */
export interface ProjectDownload {
    url: string;         // direct link to the binary
    meta?: string;       // version · size · platform requirement
    note?: string;       // the honest sentence: what it is, what it asks for
    steps?: string[];    // install steps, for anything outside an app store
    releaseUrl?: string; // full release notes
}

/** A hosted project someone can open right now — nothing to install. */
export interface ProjectTryIt {
    url: string;       // where it runs
    heading: string;   // display heading, e.g. "Open a board."
    label: string;     // button text
    meta?: string;     // the one-line caveat: what it costs, what it needs
    note?: string;     // what it is and what it asks of you
    steps?: string[];  // how to actually use it
}

/**
 * Whether — and what — the portfolio assistant may show as photos when a reply
 * mentions this project. Off unless a project opts in.
 */
export interface ProjectChatMedia {
    /** The switch. No images are ever shown for a project unless this is true. */
    enabled: boolean;
    /** How many images at most, when this is the only project in the reply. Default 3. */
    max?: number;
    /** Explicit picks. Falls back to the project's `media` images, then `image`. */
    images?: MediaItem[];
    /** Frame shape for the thumbnails — phone screenshots want "portrait". */
    aspect?: 'landscape' | 'portrait' | 'square';
    /** How the image sits in that frame. Default "cover". */
    fit?: 'cover' | 'contain';
}

export interface Project {
    title: string;
    slug?: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string | Array<{ label: string; url: string }>;
    download?: ProjectDownload;
    tryIt?: ProjectTryIt;
    image?: string;
    media?: MediaItem[];
    chatMedia?: ProjectChatMedia;
    comingSoon?: boolean;
    details?: ProjectDetails;
}

/** A section of the single-page site the assistant can point a visitor at. */
export interface SiteSection {
    /** The DOM id, and the anchor the chip links to. */
    id: string;
    /** Chip label. */
    label: string;
    /** What lives here — told to the model so it can pick the right one. */
    hint: string;
}

export interface Experience {
    year: string;
    role: string;
    company: string;
    description: string;
    bullets?: string[];
    tech?: string[];
}

export interface Skill {
    name: string;
    // Add other properties if needed
}
