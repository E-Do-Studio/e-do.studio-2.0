import { Metadata } from "next";
import { generateMetadata } from '@/lib/metadata'
import { GalleryStructuredData } from '@/components/schema/gallery-structured-data'

export const metadata: Metadata = generateMetadata({
  title: 'Galerie Photo On Model',
  description: 'Découvrez notre galerie de photos on model, mettant en valeur notre expertise en photographie de mode et notre maîtrise technique.',
})

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GalleryStructuredData />
      <main className='container mx-auto'>
        {children}
      </main>
    </>
  )
}
