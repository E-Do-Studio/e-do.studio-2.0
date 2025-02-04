import { GalleryMenu } from './_components/gallery-menu'
import { GalleryGrid } from './_components/gallery-grid'

export default function Galerie() {
  return (
    <div className="container mt-32 min-h-screen">
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
