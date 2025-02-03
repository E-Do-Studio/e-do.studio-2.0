import { GalleryMenu } from './_components/gallery-menu'
import { GalleryGrid } from './_components/gallery-grid'

export default function Galerie() {
  return (
    <div className="container mt-32 min-h-screen">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <GalleryMenu />
        </aside>
        <main className="col-span-9">
          <GalleryGrid />
        </main>
      </div>
    </div>
  )
}
