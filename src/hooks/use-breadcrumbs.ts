'use client';

import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
    position: number;
    name: string;
    item: string;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
    const pathname = usePathname();

    if (pathname === '/') {
        return [{
            position: 1,
            name: 'Accueil',
            item: '/'
        }];
    }

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{
        position: 1,
        name: 'Accueil',
        item: '/'
    }];

    let path = '';
    segments.forEach((segment, index) => {
        path += `/${segment}`;
        breadcrumbs.push({
            position: index + 2,
            name: formatSegmentName(segment),
            item: path
        });
    });

    return breadcrumbs;
}

function formatSegmentName(segment: string): string {
    const nameMap: Record<string, string> = {
        'cyclorama': 'Studio Cyclorama',
        'post-production': 'Post-Production',
        'galerie': 'Galerie',
        'reservation': 'Réservation',
        'faq': 'FAQ',
        'contact': 'Contact',
        'legal': 'Mentions Légales'
    };

    return nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
} 