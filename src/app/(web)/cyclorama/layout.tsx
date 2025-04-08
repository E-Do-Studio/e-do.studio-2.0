import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { CycloramaStructuredData } from '@/components/schema/cyclorama-structured-data'

export const metadata: Metadata = generateMetadata({
    title: 'Studio Cyclorama Professionnel',
    description: 'Studio photo professionnel avec cyclorama pour vos shootings produits et mode. Espace moderne et équipé, idéal pour vos prises de vue en packshot automatisé et photos créatives.',
})

export default function CycloramaLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CycloramaStructuredData />
            <main className='container'>{children}</main>
        </>
    )
}

