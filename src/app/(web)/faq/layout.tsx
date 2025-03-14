import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
    title: 'Questions Fréquentes',
    description: 'Trouvez des réponses à vos questions sur nos services de packshot automatisé, nos tarifs, nos délais et notre processus de travail. Des réponses claires pour faciliter votre expérience.',
})

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