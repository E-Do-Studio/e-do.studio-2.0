import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'FAQ | E-do Studio',
    description: 'Frequently asked questions about E-do Studio services and products',
}

interface FaqLayoutProps {
    children: React.ReactNode
}

export default function FaqLayout({ children }: FaqLayoutProps) {
    return (
        <section className="container py-8 md:py-12">
            {children}
        </section>
    )
}