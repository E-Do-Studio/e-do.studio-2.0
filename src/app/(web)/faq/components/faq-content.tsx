'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ_ITEMS = [
    'machine',
    'operator',
    'accessibility',
    'delegation',
    'production',
    'cyclorama',
    'booking',
    'hours',
    'weekend',
    'payment'
] as const

export function FaqContent() {
    const { t } = useTranslation('faq')

    return (
        <Section className='md:mt-20' title="FAQ" description={() =>
            <div className='flex flex-col gap-2'>
                <p className="mb-8">
                    {t('description')}
                </p>
                <Link href="/#contact">
                    <Button size="lg" className="w-44">
                        {t('cta.contact')}
                    </Button>
                </Link>
            </div>
        }>
            <div className="mx-auto max-w-4xl w-full">
                <h1 className="mb-8 text-3xl font-bold tracking-tight">
                    {t('title')}
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    {FAQ_ITEMS.map((item) => (
                        <AccordionItem key={item} value={item} className="w-full">
                            <AccordionTrigger className="text-left w-full">
                                <p className="text-left text-base">{t(`items.${item}.question`)}</p>
                            </AccordionTrigger>
                            <AccordionContent className="w-full whitespace-pre-wrap">
                                {t(`items.${item}.answer`)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Section>
    )
}