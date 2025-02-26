'use client'

import { useTranslation } from 'react-i18next'

export function Description() {
    const { t } = useTranslation('post-prod')

    return (
        <div className="mb-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
                {t('post-production.description')}
            </p>
        </div>
    )
} 