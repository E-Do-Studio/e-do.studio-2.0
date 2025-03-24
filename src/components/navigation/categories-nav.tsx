import { useCategories } from '@/store/use-categories'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface CategoryItemProps {
  category: {
    name: string
    slug: string
    isGhost?: boolean
    children?: Array<any>
  }
  level?: number
}

const CategoryItem = ({ category, level = 0 }: CategoryItemProps) => {
  const { activeCategory, setActiveCategory } = useCategories()
  const isActive = activeCategory === category.slug
  const router = useRouter()

  return (
    <div className={cn('flex flex-col', level > 0 && 'ml-4')}>
      <Link
        href={`/categories/${category.slug}`}
        prefetch={true}
        className={cn(
          'py-2 hover:text-gray-900 transition-colors',
          isActive && 'font-medium',
          category.isGhost && 'text-gray-400'
        )}
        onClick={(e) => {
          e.preventDefault()
          setActiveCategory(category.slug)
          router.push(`/categories/${category.slug}`, undefined, {
            shallow: true,
            scroll: false
          })
        }}
      >
        {category.name}
      </Link>
      {category.children?.map((child) => (
        <CategoryItem key={child.slug} category={child} level={level + 1} />
      ))}
    </div>
  )
}

export function CategoriesNav() {
  const { categories } = useCategories()

  return (
    <nav className="space-y-1">
      {categories.map((category) => (
        <CategoryItem key={category.slug} category={category} />
      ))}
    </nav>
  )
} 