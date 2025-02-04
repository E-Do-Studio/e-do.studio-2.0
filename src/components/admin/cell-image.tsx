'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
interface ImageData {
  id: string
  filename: string
  alt: string
  url: string
}

export const CellImage = ({ data }: { data: number[] }) => {
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch each image data using the IDs
        const promises = data.map(id =>
          fetch(`/api/images/${id}`).then(res => res.json())
        )
        const imagesData = await Promise.all(promises)
        setImages(imagesData)
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (data?.length) {
      fetchImages()
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (!data?.length) return null

  return (
    <div className="flex gap-2">
      {images.map((image, index) => (
        <div key={index} className="flex items-center gap-2">
          <Image
            src={`/images/${image.filename}`}
            alt={image.alt || 'Preview'}
            className="h-8 w-8 object-cover rounded"
          />
          <span className="text-sm text-gray-600">
            {image.filename}
          </span>
        </div>
      ))}
    </div>
  )
}

// Add a default export as well for compatibility
export default CellImage