import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nandanpathak.vercel.app';

    const caseStudies = projectsData
        .filter((p) => p.slug && p.details)
        .map((p) => ({
            url: `${baseUrl}/projects/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }));

    return [
        ...caseStudies,
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/#about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/#skills`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#experience`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];
}
