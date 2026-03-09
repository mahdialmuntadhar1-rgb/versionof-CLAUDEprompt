import React, { useState } from 'react';
import { Search, Menu, X, Compass } from 'lucide-react';
import { Language } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-deep/88 backdrop-blur-xl border-b border-border-custom/80">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all">
            <Compass className="w-5 h-5 text-gold" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-gold to-gold-bright bg-clip-text text-transparent hidden sm:block">
            Iraq Compass
          </span>
        </div>

        {/* Center: Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="cc-input w-full pl-10"
            />
          </form>
        </div>

        {/* Right: Language & Mobile Search */}
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-2 text-text-muted hover:text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <div className="flex bg-bg-elevated rounded-lg p-1 border border-border-custom">
            {(['en', 'ar', 'ku'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-bold transition-all uppercase",
                  language === lang 
                    ? "bg-gold text-bg-deep" 
                    : "text-text-muted hover:text-white"
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
          maxHeight: isSearchOpen ? '64px' : '0',
          transition: 'max-height 0.2s ease',
          borderBottom: isSearchOpen ? '1px solid #1E2D52' : 'none',
          background: 'rgba(7, 9, 15, 0.95)'
        }}
      >
        <div className="relative px-4 py-3">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
          <input 
            type="text"
            value={localSearch}
            placeholder={t('searchPlaceholder')}
            onChange={handleInputChange}
            className="w-full bg-transparent border-none focus:ring-0 text-[#F0EDE8] pl-10 pr-4 py-2 text-sm"
          />
        </div>
      </div>
    </header>
  );
};
