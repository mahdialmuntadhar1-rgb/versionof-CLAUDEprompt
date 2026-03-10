import React, { useState } from 'react';
import { Search, Menu, X, Compass } from 'lucide-react';
import { Language } from '../../types';
import { cn } from '../../utils/cn';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSearch: (query: string) => void;
  onLogoClick: () => void;
  searchValue: string;
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onSearch,
  onLogoClick,
  searchValue,
  t
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    setIsSearchOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    onSearch(val);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 cc-glass">
      <div className="max-w-7xl mx-auto h-20 px-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          onClick={onLogoClick}
        >
          <div className="w-9 h-9 sm:w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 group-hover:bg-gold/20 transition-all duration-300">
            <Compass className="w-5 h-5 sm:w-6 h-6 text-gold" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-gradient hidden xs:block tracking-tight truncate max-w-[120px] sm:max-w-none">
            Iraq Compass
          </span>
        </div>

        {/* Center: Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <form onSubmit={handleSearchSubmit} className="w-full relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="cc-input w-full pl-11 text-sm sm:text-base"
            />
          </form>
        </div>

        {/* Right: Language & Mobile Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            className="md:hidden p-2 rounded-xl bg-bg-elevated/50 border border-border-custom text-text-muted hover:text-white hover:border-gold/30 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <div className="flex bg-bg-elevated/50 rounded-xl p-1 border border-border-custom backdrop-blur-md overflow-hidden">
            {(['en', 'ar', 'ku'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={cn(
                  "px-2.5 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all uppercase tracking-wider min-w-[36px] sm:min-w-[44px]",
                  language === lang 
                    ? "bg-gold text-bg-deep shadow-lg shadow-gold/20" 
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Animated) */}
      <div 
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: isSearchOpen ? '80px' : '0',
          transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: isSearchOpen ? '1px solid rgba(30, 45, 82, 0.5)' : 'none',
          background: 'rgba(7, 9, 15, 0.98)'
        }}
      >
        <div className="relative px-4 py-4">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
          <input 
            type="text"
            value={localSearch}
            placeholder={t('searchPlaceholder')}
            onChange={handleInputChange}
            className="w-full bg-bg-card/50 border border-border-custom rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold/50 text-[#F0EDE8] pl-12 pr-4 py-3 text-sm transition-all"
          />
        </div>
      </div>
    </header>
  );
};
