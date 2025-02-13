'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface PostProductionItem {
  id: string
  category: string
  main_image: {
    url: string
    alt: string
  }
  assets: any[]
}

interface PostProductionGridProps {
  items: PostProductionItem[]
}

export function PostProductionGrid({ items }: PostProductionGridProps) {
  const router = useRouter()

  const handleCategoryClick = (category: string) => {
    // Créer un mapping spécifique pour les catégories avec caractères spéciaux
    const categoryMapping: { [key: string]: string } = {
      'Pique': 'pique',
      'On Model': 'on-model',
      // Ajouter d'autres mappings si nécessaire
    }

    console.log('Original category:', category)
    const urlCategory = categoryMapping[category] || category.toLowerCase().replace(' ', '-')
    console.log('URL category:', urlCategory)

    router.push(`/post-production/${urlCategory}`)
  }

  return (
    <>
      {/* Version Mobile (<768px) */}
      <div className="md:hidden grid grid-cols-2 gap-4 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCategoryClick(item.category)}
            className={`relative cursor-pointer group ${item.category === 'On Model'
                ? 'col-span-2 h-[300px] order-2'
                : item.category === 'Ghost'
                  ? 'h-[150px] order-1'
                  : item.category === 'Beauty'
                    ? 'h-[150px] order-1'
                    : 'h-[200px] order-3'
              }`}
          >
            <div className="relative w-full h-full overflow-hidden bg-white shadow-md rounded-lg">
              <Image
                src={item.main_image.url}
                alt={item.main_image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
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
        {items.map((item) => {
          const positionClasses = {
            'On Model': 'absolute left-[26%] top-[5%] w-[22%] h-[84%]',
            'Beauty': 'absolute right-[26%] top-[5%] w-[22%] h-[40%]',
            'Flat': 'absolute right-[0%] top-[27%] w-[22%] h-[38%]',
            'Pique': 'absolute right-[26%] top-[47%] w-[22%] h-[42%]',
            'Access': 'absolute left-[0%] top-[5%] w-[22%] h-[50%]',
            'Ghost': 'absolute left-[0%] top-[57%] w-[22%] h-[32%]',
          }[item.category] || ''

          return (
            <div
              key={item.id}
              onClick={() => handleCategoryClick(item.category)}
              className={`${positionClasses} cursor-pointer group`}
            >
              <div className="relative w-full h-full overflow-hidden bg-white shadow-md transition-transform hover:scale-102 hover:-translate-y-1 hover:shadow-lg hover:z-10">
                <Image
                  src={item.main_image.url}
                  alt={item.main_image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-xl font-semibold text-white drop-shadow-[2px_2px_20px_rgba(0,0,0,0.6)]">
                    {item.category}
                  </h2>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
} 