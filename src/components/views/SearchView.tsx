import React from 'react';
import { Search, Compass, ArrowRight } from 'lucide-react';
import { Business, Language } from '../../types';
import { BusinessCard } from '../ui/BusinessCard';

interface SearchViewProps {
  query: string;
  results: Business[];
  language: Language;
  t: (key: string) => string;
  onSearch: (query: string) => void;
  onSelectBusiness: (id: string) => void;
  onBrowseAll: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  query,
  results,
  language,
  t,
  onSearch,
  onSelectBusiness,
  onBrowseAll
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
      {/* TOP: large search bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold transition-transform group-focus-within:scale-110" />
          <input
            type="text"
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch((e.target as HTMLInputElement).value);
            }}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#0F1629] border border-[#1E2D52] rounded-[20px] pl-14 pr-6 py-5 text-xl text-[#F0EDE8] shadow-2xl focus:border-gold/50 focus:ring-0 transition-all placeholder:text-[#4A5568]"
          />
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h2 className="text-2xl font-bold text-[#F0EDE8]">
          <span className="text-[#8A9BB5]">{results.length} {t('showingResults')} for </span>
          <span className="text-gold">"{query}"</span>
        </h2>
        <button 
          onClick={onBrowseAll}
          className="text-sm font-bold text-gold hover:text-gold-bright transition-colors flex items-center gap-2 group"
        >
          {t('browseAll')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* RESULTS GRID */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {results.map(business => (
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
            <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#F0EDE8]">{t('noResults')}</h3>
          <p className="text-[#8A9BB5] mb-10 max-w-md mx-auto">
            {t('tryArabicKurdish')}
          </p>
          <button 
            onClick={onBrowseAll} 
            className="px-10 py-4 rounded-xl border border-[#1E2D52] text-gold font-bold text-base hover:bg-gold/5 transition-colors"
          >
            {t('browseAll')}
          </button>
        </div>
      )}
    </div>
  );
};
