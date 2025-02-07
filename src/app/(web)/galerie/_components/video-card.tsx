'use client'

import { useState } from 'react'

interface VideoCardProps {
  video: {
    url: string
    brand?: {
      name: string
    }
    filename: string
  }
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        className="w-full h-auto object-cover"
        src={video.url}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Brand overlay */}
      <div
        className={`
          absolute inset-0 
          bg-gradient-to-t from-black/60 to-transparent
          flex items-end justify-between
          p-4
          transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {video.brand?.name && (
          <span className="text-white font-medium">
            {video.brand.name}
          </span>
        )}
      </div>
    </div>
  )
} 