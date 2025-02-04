import { Suspense } from 'react'
import { GalleryMenu } from './_components/gallery-menu'
import { GalleryGrid } from './_components/gallery-grid'

export const dynamic = 'force-dynamic'

export default function Galerie() {
  return (
    <div className="container mt-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 lg:block">
          <Suspense fallback={<div>Chargement...</div>}>
            <GalleryMenu />
          </Suspense>
        </aside>
        <main className="lg:col-span-9">
          <Suspense fallback={<div>Chargement...</div>}>
            <GalleryGrid />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
