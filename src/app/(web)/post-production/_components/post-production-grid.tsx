'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PostProductionDocument } from '../[category]/page'

export type PostProductionItem = PostProductionDocument

// Définir les positions basées sur les slugs qui sont constants
const POSITION_BY_SLUG = {
  'high_end': 'absolute left-[26%] top-[5%] w-[22%] h-[84%]',
  'lookbook': 'absolute right-[26%] top-[5%] w-[22%] h-[40%]',
  'flat': 'absolute right-[0%] top-[27%] w-[22%] h-[38%]',
  'pique': 'absolute right-[26%] top-[47%] w-[22%] h-[42%]',
  'access': 'absolute left-[0%] top-[5%] w-[22%] h-[50%]',
  'ghost': 'absolute left-[0%] top-[57%] w-[22%] h-[32%]',
  '360': 'absolute right-[0%] top-[67%] w-[22%] h-[22%]',
} as const

interface PostProductionGridProps {
  items: PostProductionItem[]
}

export function PostProductionGrid({ items }: PostProductionGridProps) {
  const router = useRouter()

  const handleCategoryClick = (slug: string) => {
    router.push(`/post-production/${slug}`)
  }

  const validItems = items.filter(item => item.main_image)

  const getCategoryClasses = (slug: string) => {
    switch (slug) {
      case 'high-end':
        return 'col-span-2 h-[300px] order-2'
      case 'accessories':
        return 'h-[150px] order-1'
      default:
        return 'h-[200px] order-3'
    }
  }

  const getPositionClasses = (slug: string) => {
    return POSITION_BY_SLUG[slug as keyof typeof POSITION_BY_SLUG] || ''
  }

  const getImageFitClass = (slug: string) => {
    if (slug === 'ghost') return 'object-contain'
    if (slug === 'lookbook') return 'object-cover object-top'
    return 'object-cover'
  }

  return (
    <>
      {/* Version Mobile (<768px) */}
      <div className="md:hidden grid grid-cols-2 gap-4 p-4">
        {validItems.map((item) => (
          <div
            key={item.slug}
            onClick={() => handleCategoryClick(item.slug)}
            className={`relative cursor-pointer group ${getCategoryClasses(item.slug)}`}
          >
            <div className="relative w-full h-full overflow-hidden bg-white shadow-md rounded-lg">
              <Image
                src={item.main_image!.url}
                alt={item.main_image!.alt}
                fill
                priority={item.slug === 'high-end'}
                sizes="(max-width: 768px) 100vw"
                className={`${getImageFitClass(item.slug)} transition-transform duration-300 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h2 className="text-lg font-semibold text-white drop-shadow-[2px_2px_20px_rgba(0,0,0,0.6)]">
                  {item.category}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Version Desktop (>=768px) */}
      <div className="hidden md:block relative h-[calc(100vh-15vh)]">
        {validItems.map((item) => (
          <div
            key={item.slug}
            onClick={() => handleCategoryClick(item.slug)}
            className={`${getPositionClasses(item.slug)} cursor-pointer group`}
          >
            <div className="relative w-full h-full overflow-hidden bg-white shadow-md transition-transform hover:scale-102 hover:-translate-y-1 hover:shadow-lg hover:z-10">
              <Image
                src={item.main_image!.url}
                alt={item.main_image!.alt}
                fill
                priority={item.slug === 'high-end'}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`${getImageFitClass(item.slug)} transition-transform group-hover:scale-105`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-semibold text-white drop-shadow-[2px_2px_20px_rgba(0,0,0,0.6)]">
                  {item.category}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 