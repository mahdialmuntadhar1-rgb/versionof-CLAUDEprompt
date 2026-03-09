export type Category =
  | 'restaurants'
  | 'cafes'
  | 'hotels'
  | 'hospitals'
  | 'pharmacies'
  | 'shopping'
  | 'education'
  | 'beauty'
  | 'automotive'
  | 'entertainment'
  | 'sports'
  | 'services';

export type Language = 'en' | 'ar' | 'ku';
export type View = 'home' | 'browse' | 'detail' | 'search' | 'profile';

export interface Business {
  id: string;
  name: string;           // English name
  nameAr: string;         // Arabic name
  nameKu: string;         // Kurdish name
  category: Category;
  subcategory?: string;
  governorate: string;
  city: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  description: string;
  descriptionAr: string;
  descriptionKu: string;
  rating: number;         // 0.0 - 5.0
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  imageUrl?: string;
  openHours?: string;
  priceRange?: 1 | 2 | 3 | 4;
  tags: string[];
  lat?: number;
  lng?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  businessId: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface CuratedEvent {
  id: string;
  eventName: string;
  city: string;
  governorate: string;
  suggestedDate: string;
  description: string;
  category: string;
  aiCurated: boolean;
}

export interface CategoryInfo {
  id: Category;
  labelEn: string;
  labelAr: string;
  labelKu: string;
  emoji: string;
}

export interface CityInfo {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  governorate: string;
  emoji: string;
}
