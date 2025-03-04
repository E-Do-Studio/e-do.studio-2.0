'use client'

import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout/section'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
    question: string
    answer: string
    id: string
}

const faqItems: FaqItem[] = [
    {
        id: "item-1",
        question: "What services do you offer?",
        answer: "We offer a wide range of digital services including web development, mobile app development, and digital marketing solutions.",
    },
    {
        id: "item-2",
        question: "How can I contact support?",
        answer: "You can reach our support team through our contact form, by email at support@edo-studio.com, or by phone during business hours.",
    },
]

export default function FaqPage() {
    const { t } = useTranslation('faq')
    return (
        <Section title="FAQ" description={() =>
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
        } >
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-3xl font-bold tracking-tight">
                    {t('title')}
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-left">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Section>
    )
}
