import { useCategories } from '@/store/use-categories'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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

  return (
    <div className={cn('flex flex-col', level > 0 && 'ml-4')}>
      <Link
        href={`/categories/${category.slug}`}
        className={cn(
          'py-2 hover:text-gray-900 transition-colors',
          isActive && 'font-medium',
          category.isGhost && 'text-gray-400'
        )}
        onClick={() => setActiveCategory(category.slug)}
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