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
      {/* Large Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-faint" />
          <input
            type="text"
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch((e.target as HTMLInputElement).value);
            }}
            placeholder={t('searchPlaceholder')}
            className="cc-input w-full pl-12 py-4 text-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">
          <span className="text-text-muted">{results.length} {t('showingResults')} for </span>
          <span className="text-gold">"{query}"</span>
        </h2>
        <button 
          onClick={onBrowseAll}
          className="text-sm font-bold text-gold hover:text-gold-bright transition-colors flex items-center gap-1"
        >
          {t('browseAll')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-bg-elevated flex items-center justify-center mb-8 border border-border-custom relative">
            <Compass className="w-12 h-12 text-text-faint" />
            <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold mb-3">{t('noResults')}</h3>
          <p className="text-text-muted mb-8 max-w-md">
            Try searching for categories like "Restaurants" or cities like "Erbil". 
            You can also search in Arabic or Kurdish.
          </p>
          <div className="flex gap-4">
            <button onClick={onBrowseAll} className="btn-gold">
              {t('browseAll')}
            </button>
            <button onClick={() => onSearch('')} className="btn-ghost">
              {t('clearAll')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
