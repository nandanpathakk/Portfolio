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

export interface Project {
    title: string;
    slug?: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string | Array<{ label: string; url: string }>;
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
