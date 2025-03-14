'use client'

import { useTranslation } from 'react-i18next'
import { FaqContent } from './components/faq-content'

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
        <FaqContent />
    )
}
