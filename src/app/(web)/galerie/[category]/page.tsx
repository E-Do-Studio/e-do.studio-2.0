"use client"
import { Suspense } from 'react'
import { GalleryMenu } from '../_components/gallery-menu'
import { GalleryGrid } from '../_components/gallery-grid'
import { useSearchParams } from 'next/navigation'

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  )
}

function CategoryContent() {
  'use client'
  const searchParams = useSearchParams()

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
            <GalleryGrid initialCategory={searchParams.get('category') || undefined} />
          </Suspense>
        </main>
      </div>
    </div>
  )
} 