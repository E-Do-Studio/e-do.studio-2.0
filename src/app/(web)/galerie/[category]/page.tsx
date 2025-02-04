import { Suspense } from 'react'
import { GalleryMenu } from '../_components/gallery-menu'
import { GalleryGrid } from '../_components/gallery-grid'

export default async function GaleriePage(params: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params.params

  return (
    <div className="container mt-32 min-h-screen">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <Suspense fallback={<div>Chargement...</div>}>
            <GalleryMenu />
          </Suspense>
        </aside>
        <main className="col-span-9">
          <Suspense fallback={<div>Chargement...</div>}>
            <GalleryGrid initialCategory={category} />
          </Suspense>
        </main>
      </div>
    </div>
  )
} 