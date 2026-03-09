import React, { useState, useMemo } from 'react';
import { Filter, X, ChevronDown, Compass } from 'lucide-react';
import { Business, Category, Language, CategoryInfo } from '../../types';
import { BusinessCard } from '../ui/BusinessCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BrowseViewProps {
  language: Language;
  t: (key: string) => string;
  businesses: Business[];
  categories: CategoryInfo[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category | null) => void;
  onSelectBusiness: (id: string) => void;
  onClearFilters: () => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  language,
  t,
  businesses,
  categories,
  selectedCategory,
  onCategorySelect,
  onSelectBusiness,
  onClearFilters
}) => {
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'az'>('rating');

  const sortedBusinesses = useMemo(() => {
    return [...businesses].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'az') {
        const nameA = language === 'en' ? a.name : language === 'ar' ? a.nameAr : a.nameKu;
        const nameB = language === 'en' ? b.name : language === 'ar' ? b.nameAr : b.nameKu;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
  }, [businesses, sortBy, language]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
      {/* STICKY FILTER BAR */}
      <div className="sticky top-[64px] z-40 bg-bg-deep/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-[#1E2D52] mb-8">
        <div className="flex flex-col gap-4">
          {/* Row 1 — Active filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#162040] border border-[#1E2D52] text-[11px] font-bold text-[#8A9BB5] uppercase tracking-wider">
              <Filter className="w-3 h-3" />
              {t('filters')}
            </div>
            
            {selectedCategory && (
              <button 
                onClick={() => onCategorySelect(null)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/30 text-xs font-bold text-gold whitespace-nowrap"
              >
                {t('category')}: {language === 'en' ? categories.find(c => c.id === selectedCategory)?.labelEn : language === 'ar' ? categories.find(c => c.id === selectedCategory)?.labelAr : categories.find(c => c.id === selectedCategory)?.labelKu}
                <X className="w-3 h-3" />
              </button>
            )}

            {selectedCategory && (
              <button 
                onClick={onClearFilters}
                className="text-xs text-[#4A5568] hover:text-gold transition-colors whitespace-nowrap ml-2 font-medium"
              >
                {t('clearAll')}
              </button>
            )}
          </div>

          {/* Row 2 — Category chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onCategorySelect(null)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap",
                !selectedCategory 
                  ? "bg-gold text-bg-deep border-gold" 
                  : "bg-[#0F1629] border-[#1E2D52] text-[#8A9BB5] hover:border-gold/50"
              )}
            >
              {t('allCategories')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-2",
                  selectedCategory === cat.id 
                    ? "bg-gold text-bg-deep border-gold" 
                    : "bg-[#0F1629] border-[#1E2D52] text-[#8A9BB5] hover:border-gold/50"
                )}
              >
                <span>{cat.emoji}</span>
                <span>{language === 'en' ? cat.labelEn : language === 'ar' ? cat.labelAr : cat.labelKu}</span>
              </button>
            ))}
          </div>

          {/* Row 3 — Results info & Sort */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8A9BB5] font-medium">
              {t('showingResults')}: <span className="text-text-white font-bold">{businesses.length}</span>
            </span>

            <div className="relative group">
              <button className="flex items-center gap-2 text-xs font-bold text-[#8A9BB5] hover:text-gold transition-colors bg-[#0F1629] border border-[#1E2D52] rounded-lg px-3 py-1.5">
                {t('sortBy')}: {t(sortBy === 'rating' ? 'highestRated' : sortBy === 'reviews' ? 'mostReviewed' : 'az')}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#162040] border border-[#1E2D52] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                {(['rating', 'reviews', 'az'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={cn(
                      "w-full text-left px-4 py-3 text-xs font-medium transition-colors hover:bg-[#0F1629]",
                      sortBy === option ? "text-gold" : "text-[#8A9BB5]"
                    )}
                  >
                    {t(option === 'rating' ? 'highestRated' : option === 'reviews' ? 'mostReviewed' : 'az')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      {sortedBusinesses.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedBusinesses.map(business => (
            <BusinessCard
              key={business.id}
              business={business}
              onSelect={onSelectBusiness}
              language={language}
            />
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 rounded-full bg-[#162040] flex items-center justify-center mb-8 border border-[#1E2D52] relative">
            <Compass className="w-12 h-12 text-[#4A5568]" />
            <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-text-white">{t('noResults')}</h3>
          <p className="text-[#8A9BB5] mb-10 max-w-xs mx-auto">{t('tryDifferent')}</p>
          <button onClick={onClearFilters} className="px-8 py-3 rounded-xl border border-[#1E2D52] text-gold font-bold text-sm hover:bg-gold/5 transition-colors">
            {t('clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};
