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
    comingSoon?: boolean;
    details?: ProjectDetails;
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
