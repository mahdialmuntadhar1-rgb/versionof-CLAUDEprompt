import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Map, LayoutGrid, Star, Compass } from 'lucide-react';
import { Business, Category, CityInfo, Language, CuratedEvent, CategoryInfo } from '../../types';
import { BusinessCard } from '../ui/BusinessCard';
import { GOVERNORATES, MOCK_BUSINESSES } from '../../constants';
import { generateCuratedEvents } from '../../services/geminiService';
import { motion } from 'motion/react';

interface HomeViewProps {
  language: Language;
  t: (key: string) => string;
  onSearch: (query: string) => void;
  onCategorySelect: (category: Category) => void;
  onCitySelect: (cityId: string) => void;
  onCitySelectByGov?: (gov: string) => void; // Added for clarity
  onSelectBusiness: (id: string) => void;
  featuredBusinesses: Business[];
  categories: CategoryInfo[];
  cities: CityInfo[];
}

const GOV_EMOJIS: Record<string, string> = {
  'Baghdad': '🕌',
  'Basra': '🛢',
  'Erbil': '🏔',
  'Sulaymaniyah': '🌿',
  'Duhok': '🏞',
  'Nineveh': '🦁',
  'Kirkuk': '⭐',
  'Karbala': '🕍',
  'Najaf': '🌙',
  'Anbar': '🌅',
  'Diyala': '🌊',
  'Babil': '🏛',
  'Wasit': '🌾',
  'Maysan': '🐊',
  'Dhi Qar': '🏺',
  'Muthanna': '🌵',
  'Qadisiyyah': '🐎',
  'Saladin': '🏰'
};

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  t,
  onSearch,
  onCategorySelect,
  onCitySelect,
  onSelectBusiness,
  featuredBusinesses,
  categories,
  cities
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [events, setEvents] = useState<CuratedEvent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) onSearch(localSearch);
  };

  const handleGenerateEvents = async () => {
    setIsGenerating(true);
    const newEvents = await generateCuratedEvents('Baghdad', language);
    setEvents(newEvents);
    setIsGenerating(false);
  };

  useEffect(() => {
    handleGenerateEvents();
  }, [language]);

  const getCategoryCount = (categoryId: Category) => {
    return MOCK_BUSINESSES.filter(b => b.category === categoryId).length;
  };

  const getGovCount = (gov: string) => {
    return MOCK_BUSINESSES.filter(b => b.governorate === gov).length;
  };

  return (
    <div className="pb-20 md:pb-10">
      {/* Hero Section */}
      <section className="relative min-height-[560px] flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold mb-6">
            <Compass className="w-3.5 h-3.5" />
            {t('discoverIraq')}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t('findBest')} <br />
            <span className="bg-gradient-to-r from-gold via-gold-bright to-gold bg-clip-text text-transparent">
              {t('businessesEvents')}
            </span> <br />
            {t('acrossIraq')}
          </h1>

          <p className="text-text-muted text-lg mb-10 max-w-xl mx-auto">
            {t('discoverIraq')} · {t('topRated')} · {t('aiEvents')}
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-bg-card border border-border-custom rounded-2xl p-2 shadow-2xl focus-within:border-gold/50 transition-all">
              <Search className="w-5 h-5 text-text-faint ml-3" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent border-none focus:ring-0 text-text-white px-4 py-3"
              />
              <button type="submit" className="btn-gold py-2 px-8">
                {t('search')}
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-text-faint font-medium">{t('browseByCity')}</span>
            {cities.slice(0, 6).map(city => (
              <button
                key={city.id}
                onClick={() => onCitySelect(city.id)}
                className="px-4 py-1.5 rounded-full bg-bg-elevated border border-border-custom text-xs text-text-muted hover:border-gold/50 hover:text-gold transition-all"
              >
                {language === 'en' ? city.nameEn : language === 'ar' ? city.nameAr : city.nameKu}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 flex items-center gap-8 text-text-faint text-sm font-medium">
          <span>500+ Businesses</span>
          <div className="w-1 h-1 rounded-full bg-border-custom" />
          <span>18 Governorates</span>
          <div className="w-1 h-1 rounded-full bg-border-custom" />
          <span>3 Languages</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
              <LayoutGrid className="w-5 h-5 text-gold" />
            </div>
            <h2 className="text-2xl font-bold">{t('browseByCategory')}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const count = getCategoryCount(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="cc-card p-6 flex flex-col items-center text-center cursor-pointer group"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-sm font-bold text-text-white group-hover:text-gold transition-colors">
                  {language === 'en' ? cat.labelEn : language === 'ar' ? cat.labelAr : cat.labelKu}
                </span>
                <span className="text-[10px] text-text-faint mt-1 uppercase tracking-wider">
                  {count > 0 ? `${count} places` : 'Coming soon'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h2 className="text-2xl font-bold">{t('featuredInIraq')}</h2>
          </div>
          <p className="text-text-muted mt-1 ml-13">{t('highestRatedSub')}</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
          {featuredBusinesses.map(business => (
            <BusinessCard
              key={business.id}
              business={business}
              onSelect={onSelectBusiness}
              language={language}
              compact
            />
          ))}
        </div>
      </section>

      {/* AI Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-bg-elevated/50 border border-border-custom rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-2xl font-bold">{t('aiCuratedEvents')}</h2>
              </div>
              <p className="text-text-muted">{t('aiEventsSub')}</p>
            </div>
            <button 
              onClick={handleGenerateEvents}
              disabled={isGenerating}
              className="btn-gold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? t('loading') : t('generateEvents')}
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x relative z-10">
            {isGenerating ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="w-72 flex-shrink-0 bg-bg-card border border-border-custom rounded-2xl p-4 animate-pulse-custom">
                  <div className="aspect-[4/3] bg-bg-elevated rounded-xl mb-4" />
                  <div className="h-4 bg-bg-elevated rounded w-3/4 mb-2" />
                  <div className="h-3 bg-bg-elevated rounded w-1/2" />
                </div>
              ))
            ) : (
              events.map(event => (
                <div key={event.id} className="w-72 flex-shrink-0 cc-card p-4 snap-start group">
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-4 bg-bg-elevated">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-teal/10 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 badge-gold backdrop-blur-md">✨ AI</div>
                  </div>
                  <h3 className="font-bold text-text-white mb-1">{event.eventName}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge-teal text-[9px]">{event.city}</span>
                    <span className="text-[10px] text-text-faint">{event.suggestedDate}</span>
                  </div>
                  <p className="text-xs text-text-muted line-clamp-2">{event.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* City Navigator */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
            <Map className="w-5 h-5 text-gold" />
          </div>
          <h2 className="text-2xl font-bold">{t('exploreByGov')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {GOVERNORATES.map(gov => {
            const count = getGovCount(gov);
            return (
              <div
                key={gov}
                onClick={() => onCitySelect(gov)}
                className="cc-card p-6 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center mb-4 border border-border-custom group-hover:border-gold/50 transition-all">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {GOV_EMOJIS[gov] || '📍'}
                  </span>
                </div>
                <span className="font-bold text-text-white group-hover:text-gold transition-colors">{gov}</span>
                <span className="text-[10px] text-text-faint mt-1 uppercase tracking-wider">
                  {count} businesses
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
