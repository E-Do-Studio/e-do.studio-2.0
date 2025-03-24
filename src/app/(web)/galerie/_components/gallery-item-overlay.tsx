export const GalleryItemOverlay = ({ title }: { title: string }) => {
  return (
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
        <p className="text-white text-lg tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {title.toUpperCase()}
        </p>
      </div>
    </div>
  )

}