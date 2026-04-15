export interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string | Array<{ label: string; url: string }>;
    image: string;
    media?: Array<{ type: 'image' | 'video'; url: string }>;
    comingSoon?: boolean;
}

export interface Experience {
    year: string;
    role: string;
    company: string;
    description: string;
}

export interface Skill {
    name: string;
    // Add other properties if needed
}
