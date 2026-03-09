import React, { useState, useMemo } from 'react';
import { Filter, X, ChevronDown, Compass } from 'lucide-react';
import { Business, Category, Language, CategoryInfo } from '../../types';
import { BusinessCard } from '../ui/BusinessCard';
import { cn } from '../../utils/cn';

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
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-text-white tracking-tighter mb-4">{t('browse')}</h1>
        <p className="text-text-muted font-medium">Discover the best places and services across Iraq</p>
      </div>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-[80px] z-40 bg-bg-deep/80 backdrop-blur-xl py-4 sm:py-6 -mx-4 px-4 border-b border-border-custom/50 mb-8 sm:mb-12">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Row 1 — Category chips */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
            <button
              onClick={() => onCategorySelect(null)}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-300 whitespace-nowrap uppercase tracking-widest min-h-[44px]",
                !selectedCategory 
                  ? "bg-gold text-bg-deep border-gold shadow-lg shadow-gold/20" 
                  : "bg-bg-card/40 border-border-custom text-text-muted hover:border-gold/40 hover:text-gold"
              )}
            >
              {t('allCategories')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={cn(
                  "px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-300 whitespace-nowrap flex items-center gap-2 sm:gap-3 uppercase tracking-widest min-h-[44px]",
                  selectedCategory === cat.id 
                    ? "bg-gold text-bg-deep border-gold shadow-lg shadow-gold/20" 
                    : "bg-bg-card/40 border-border-custom text-text-muted hover:border-gold/40 hover:text-gold"
                )}
              >
                <span className="text-sm sm:text-base">{cat.emoji}</span>
                <span>{language === 'en' ? cat.labelEn : language === 'ar' ? cat.labelAr : cat.labelKu}</span>
              </button>
            ))}
          </div>

          {/* Row 2 — Results info & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <span className="text-[10px] sm:text-sm text-text-muted font-bold uppercase tracking-widest">
                {t('showingResults')}: <span className="text-gold">{businesses.length}</span>
              </span>
              {selectedCategory && (
                <button 
                  onClick={onClearFilters}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-red/80 hover:text-red transition-colors min-h-[44px]"
                >
                  <X className="w-3 h-3" />
                  {t('clearAll')}
                </button>
              )}
            </div>

            <div className="relative group w-full sm:w-auto">
              <button className="flex items-center gap-3 text-[10px] sm:text-xs font-bold text-text-muted hover:text-gold transition-all duration-300 bg-bg-card/40 border border-border-custom rounded-xl px-4 sm:px-5 py-3 w-full sm:min-w-[200px] justify-between min-h-[44px]">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gold/60" />
                  <span>{t('sortBy')}: {t(sortBy === 'rating' ? 'highestRated' : sortBy === 'reviews' ? 'mostReviewed' : 'az')}</span>
                </div>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-full bg-bg-elevated border border-border-custom rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden backdrop-blur-xl">
                {(['rating', 'reviews', 'az'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={cn(
                      "w-full text-left px-5 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-gold/10 min-h-[44px]",
                      sortBy === option ? "text-gold bg-gold/5" : "text-text-muted"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
