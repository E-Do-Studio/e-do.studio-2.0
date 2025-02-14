"use client"

import { GalleryMenu } from '../_components/gallery-menu'
import { GalleryGrid } from '../_components/gallery-grid'
import { useSearchParams } from 'next/navigation'

export default function CategoryPage() {
  return (
    <CategoryContent />
  )
}

function CategoryContent() {
  const searchParams = useSearchParams()

  return (
    <div className="container mt-32 min-h-screen">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <GalleryMenu />
        </aside>
        <div className="col-span-9">
          <GalleryGrid initialCategory={searchParams.get('category') || undefined} />
        </div>
      </div>
    </div>
  )
} 