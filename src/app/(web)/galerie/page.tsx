import { Suspense } from 'react'
import { GalleryMenu } from './_components/gallery-menu'
import { GalleryGrid } from './_components/gallery-grid'

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}

function GalleryContent() {
  return (
    <div className="mt-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 lg:block">
          <GalleryMenu />
        </aside>
        <main className="lg:col-span-9">
          <GalleryGrid />
        </main>
      </div>
    </div>
  )
}