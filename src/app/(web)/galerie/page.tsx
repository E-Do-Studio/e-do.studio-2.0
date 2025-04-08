import { Suspense } from 'react'
import { GalleryMenu } from './_components/gallery-menu'
import { GalleryGrid } from './_components/gallery-grid'
import { CategoryDescription } from './_components/category-description'

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
        <aside className="lg:col-span-3">
          <div className="fixed top-[5rem] left-0 right-0 z-30 container">
            <div className="flex flex-col items-center lg:items-start lg:max-w-[200px]">
              <GalleryMenu />
            </div>
          </div>
          <div className="block lg:hidden fixed top-[5rem] left-0 right-0 container">
            <div className="flex flex-col items-left">
              <div className="mt-[calc(320px+var(--menu-height,0px))] max-w-[70%] sm:max-w-[50%] md:max-w-[40%] -z-10 transition-[margin] duration-200">
                <CategoryDescription />
              </div>
            </div>
          </div>
          <div className="hidden lg:block fixed top-[450px] left-0 right-0 container">
            <div className="lg:max-w-[200px] transition-[margin] duration-200" style={{ marginTop: 'var(--menu-height, 0)' }}>
              <CategoryDescription />
            </div>
          </div>
        </aside>
        <main className="lg:col-span-9 relative">
          <div className="bg-background relative z-[1] transition-[margin] duration-200">
            <div className="[margin-top:calc(384px+var(--menu-height,0px))] lg:mt-0">
              <GalleryGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
