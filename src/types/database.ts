export interface Business {
  id: string
  name: string
  description: string
  city_id: string
  category_id: string
  top_rated: boolean
  image_url: string
  address: string
  phone: string
  created_at: string
}
export interface Category {
  id: string
  name: string
  icon: string
  slug: string
}
export interface City {
  id: string
  name: string
  name_ar: string
  image_url: string
}
export interface Event {
  id: string
  title: string
  description: string
  date: string
  city_id: string
  image_url: string
}
