import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import CaseStudy from "@/components/CaseStudy";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return projectsData
        .filter((p) => p.slug && p.details)
        .map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug && p.details);
    if (!project) return {};
    return {
        title: `${project.title} — Case Study | Nandan Pathak`,
        description: project.details!.tagline,
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug && p.details);

    if (!project) notFound();

    return <CaseStudy project={project} />;
}
