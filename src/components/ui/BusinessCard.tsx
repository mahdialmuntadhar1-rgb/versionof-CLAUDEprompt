import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { Business, Language } from '../../types';
import { CATEGORIES } from '../../constants';
import { cn } from '../../utils/cn';

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
        compact ? "w-72 flex-shrink-0" : "w-full"
      )}
      onClick={() => onSelect(business.id)}
    >
      {/* Image Area */}
      <div className="aspect-[16/10] relative overflow-hidden bg-bg-elevated">
        <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110 group-hover:rotate-1", gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <div className="badge-gold flex items-center gap-2 shadow-xl">
            <span className="text-sm">{category?.emoji}</span>
            <span className="text-[10px] tracking-widest">{language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}</span>
          </div>
          {business.isVerified && (
            <div className="badge-green flex items-center gap-1.5 shadow-xl">
              <CheckCircle className="w-3.5 h-3.5" />
              <span className="text-[9px] tracking-tighter">VERIFIED</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-text-white line-clamp-1 group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          {business.priceRange && (
            <span className="text-[11px] text-gold font-mono bg-gold/5 px-2 py-0.5 rounded border border-gold/10">
              {'$'.repeat(business.priceRange)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 text-text-muted mb-4">
          <MapPin className="w-3.5 h-3.5 text-gold/60" />
          <span className="text-xs font-medium">{business.city}, {business.governorate}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5 transition-all duration-300",
                  i < Math.floor(business.rating) 
                    ? "text-gold fill-gold group-hover:scale-110" 
                    : "text-border-custom"
                )} 
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gold">{business.rating.toFixed(1)}</span>
            <span className="text-xs text-text-faint font-medium">({business.reviewCount})</span>
          </div>
        </div>

        {!compact && (
          <p className="text-sm text-text-muted mb-6 line-clamp-2 leading-relaxed font-medium">
            {description}
          </p>
        )}

        <div className="mt-auto pt-5 border-t border-border-custom/50 flex items-center justify-between">
          <span className="text-xs font-bold text-gold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
            View Details 
            <span className="text-lg leading-none">→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
