import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post Production',
  description: 'Découvrez nos prestations de post-production',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Post Production',
  },
}

export default function PostProductionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='container'>
      {children}
    </main>
  )
}