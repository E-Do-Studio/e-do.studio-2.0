export interface Subcategory {
  id: string
  name: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  images: any[]
  subcategories?: Subcategory[]
}
