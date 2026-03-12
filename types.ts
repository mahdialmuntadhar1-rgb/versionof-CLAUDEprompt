import type React from 'react';

export interface Story {
  id: number;
  avatar: string;
  name: string;
  viewed?: boolean;
  verified?: boolean;
  thumbnail: string;
  userName: string;
  type: 'business' | 'community';
  aiVerified?: boolean;
  isLive?: boolean;
  media: string[];
  timeAgo: string;
}

export interface Subcategory {
  id: string;
  icon: React.ReactNode;
  nameKey: string;
  count?: number;
  subcategories?: Subcategory[];
}

export interface Category {
  id: string;
  icon: React.ReactNode;
  nameKey: string;
  eventCount: number;
  recommended?: boolean;
  subcategories?: Subcategory[];
}

export interface Business {
  id: number;
  name: string;
  coverImage: string;
  isPremium?: boolean;
  category: string;
  rating: number;
  distance: number;
  status: string;
  image: string;
  verified?: boolean;
  reviews: number;
}

export interface Event {
  id: number;
  image: string;
  title: string;
  aiRecommended?: boolean;
  date: Date;
  venue: string;
  attendees: number;
  price: number;
  accessibility?: {
    wheelchairAccessible?: boolean;
    familyFriendly?: boolean;
    womenOnly?: boolean;
    sensoryFriendly?: boolean;
    signLanguage?: boolean;
    audioDescription?: boolean;
  };
}

export interface Deal {
  id: number;
  discount: number;
  businessLogo: string;
  title: string;
  description: string;
  expiresIn: string;
  claimed: number;
  total: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    image: string;
}