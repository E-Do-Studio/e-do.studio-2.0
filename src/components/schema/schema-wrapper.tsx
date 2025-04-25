'use client';

import { SchemaProvider } from './schema-provider';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';

export function SchemaWrapper() {
    const breadcrumbs = useBreadcrumbs();

    return <SchemaProvider breadcrumbItems={breadcrumbs} />;
} 