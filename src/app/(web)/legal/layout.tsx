import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Mentions légales',
  },
}


export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='container mx-auto'>
      {children}
    </main>
  )
}