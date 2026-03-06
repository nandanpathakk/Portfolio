export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    image: string;
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
