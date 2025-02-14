import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cyclorama',
    description: 'Cyclorama',
}

export default function CycloramaLayout({ children }: { children: React.ReactNode }) {
    return <main className='container'>{children}</main>
}

