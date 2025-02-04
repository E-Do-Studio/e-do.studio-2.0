export interface Subcategory {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
  images: any[]
  subcategories?: Subcategory[]
}
