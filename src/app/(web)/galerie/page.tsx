"use client"

import { Suspense } from 'react'
import { GalleryMenu } from './_components/gallery-menu'
import { GalleryGrid } from './_components/gallery-grid'
import { useSearchParams } from 'next/navigation'

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
  'use client'
  const searchParams = useSearchParams()
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
