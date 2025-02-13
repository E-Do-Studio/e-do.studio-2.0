import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Découvrez notre galerie de packshots automatisés',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Galerie',
  },
}

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='container mx-auto'>
      {children}
    </main>
  )
}
