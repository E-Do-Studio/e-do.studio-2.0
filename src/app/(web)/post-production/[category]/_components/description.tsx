'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function Description() {
    const { t } = useTranslation('post-prod')

    return (
        <div className="mb-8 flex flex-col gap-4">
            <p className="max-w-full max-md:min-w-full md:max-w-[80%]">
                {t('post-production.description')}
            </p>
            <Button className='w-fit'>
                {t('post-production.contact')}
            </Button>
        </div>
    )
} 