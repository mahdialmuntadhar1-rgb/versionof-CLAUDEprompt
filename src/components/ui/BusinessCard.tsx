import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { Business, Language } from '../../types';
import { CATEGORIES } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BusinessCardProps {
  business: Business;
  onSelect: (id: string) => void;
  language: Language;
  compact?: boolean;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onSelect,
  language,
  compact = false
}) => {
  const category = CATEGORIES.find(c => c.id === business.category);
  const name = language === 'en' ? business.name : language === 'ar' ? business.nameAr : business.nameKu;
  const description = language === 'en' ? business.description : language === 'ar' ? business.descriptionAr : business.descriptionKu;

  // Generate a consistent gradient based on ID
  const gradients = [
    'from-gold/20 to-teal/20',
    'from-teal/20 to-gold/20',
    'from-gold/30 to-bg-card',
    'from-teal/30 to-bg-card',
    'from-bg-elevated to-gold/20'
  ];
  const gradient = gradients[parseInt(business.id) % gradients.length] || gradients[0];

  return (
    <div 
      className={cn(
        "cc-card cursor-pointer overflow-hidden group flex flex-col",
        compact ? "w-64 flex-shrink-0" : "w-full"
      )}
      onClick={() => onSelect(business.id)}
    >
      {/* Image Area */}
      <div className="aspect-video relative overflow-hidden bg-bg-elevated">
        <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110", gradient)} />
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <div className="badge-gold flex items-center gap-1 backdrop-blur-md">
            <span>{category?.emoji}</span>
            <span>{language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}</span>
          </div>
          {business.isVerified && (
            <div className="badge-green flex items-center gap-1 backdrop-blur-md">
              <CheckCircle className="w-3 h-3" />
              <span className="text-[9px]">VERIFIED</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[15px] font-bold text-text-white line-clamp-1 group-hover:text-gold transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-1 mt-1 text-text-muted">
          <MapPin className="w-3 h-3" />
          <span className="text-xs">{business.city}, {business.governorate}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(business.rating) ? "text-gold fill-gold" : "text-border-custom"
                )} 
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gold">{business.rating.toFixed(1)}</span>
          <span className="text-xs text-text-faint">({business.reviewCount})</span>
        </div>

        {!compact && (
          <p className="text-xs text-text-muted mt-3 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-border-custom flex items-center justify-between">
          <span className="text-xs font-semibold text-gold group-hover:translate-x-1 transition-transform">
            View Details →
          </span>
          {business.priceRange && (
            <span className="text-[10px] text-text-faint font-mono">
              {'$'.repeat(business.priceRange)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
