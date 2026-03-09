import React, { useState, useMemo } from 'react';
import { Filter, X, Search, ChevronDown } from 'lucide-react';
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
      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-bg-deep/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-border-custom mb-8">
        <div className="flex flex-col gap-4">
          {/* Active Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border-custom text-xs font-medium text-text-muted">
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

            {(selectedCategory) && (
              <button 
                onClick={onClearFilters}
                className="text-xs text-text-faint hover:text-gold transition-colors whitespace-nowrap ml-2"
              >
                {t('clearAll')}
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onCategorySelect(null)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap",
                !selectedCategory 
                  ? "bg-gold text-bg-deep border-gold" 
                  : "bg-bg-card border-border-custom text-text-muted hover:border-gold/50"
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
                    : "bg-bg-card border-border-custom text-text-muted hover:border-gold/50"
                )}
              >
                <span>{cat.emoji}</span>
                <span>{language === 'en' ? cat.labelEn : language === 'ar' ? cat.labelAr : cat.labelKu}</span>
              </button>
            ))}
          </div>

          {/* Results Info & Sort */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-faint font-medium">
              {t('showingResults')}: <span className="text-text-white">{businesses.length}</span>
            </span>

            <div className="relative group">
              <button className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-gold transition-colors bg-[#0F1629] border border-[#1E2D52] rounded-lg px-3 py-1.5">
                {t('sortBy')}: {t(sortBy === 'rating' ? 'highestRated' : sortBy === 'reviews' ? 'mostReviewed' : 'az')}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-bg-elevated border border-border-custom rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                {(['rating', 'reviews', 'az'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={cn(
                      "w-full text-left px-4 py-3 text-xs font-medium transition-colors hover:bg-bg-card",
                      sortBy === option ? "text-gold" : "text-text-muted"
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

      {/* Grid */}
      {sortedBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-bg-elevated flex items-center justify-center mb-6 border border-border-custom">
            <Search className="w-10 h-10 text-text-faint" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t('noResults')}</h3>
          <p className="text-text-muted mb-8">{t('tryDifferent')}</p>
          <button onClick={onClearFilters} className="btn-ghost">
            {t('clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};
