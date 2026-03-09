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
  onSelectBusiness: (id: string) => void;
  featuredBusinesses: Business[];
  categories: CategoryInfo[];
  cities: CityInfo[];
}

const GOV_EMOJIS: Record<string, string> = {
  'Baghdad': '🕌', 'Basra': '🛢', 'Nineveh': '🦁', 'Erbil': '🏔', 'Sulaymaniyah': '🌿',
  'Duhok': '🏞', 'Kirkuk': '⭐', 'Anbar': '🌅', 'Diyala': '🌊', 'Babil': '🏛',
  'Karbala': '🕍', 'Najaf': '🌙', 'Wasit': '🌾', 'Maysan': '🐊', 'Dhi Qar': '🏺',
  'Muthanna': '🌵', 'Qadisiyyah': '🐎', 'Saladin': '🏰'
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
    <div className="pb-20 md:pb-10 overflow-x-hidden">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[560px] flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-from)_0%,_transparent_50%)] from-gold/10" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from)_0%,_transparent_40%)] from-teal/7" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold mb-8">
            <Compass className="w-3.5 h-3.5" />
            {t('discoverIraq')}
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(32px,6vw,54px)] font-bold leading-[1.1] mb-6 tracking-tight">
            <span className="text-white block">{t('findBest')}</span>
            <span className="bg-gradient-to-r from-gold via-gold-bright to-gold bg-clip-text text-transparent block py-1">
              {t('businessesEvents')}
            </span>
            <span className="text-white block">{t('acrossIraq')}</span>
          </h1>

          {/* Subheading */}
          <p className="text-[#8A9BB5] text-base md:text-lg mb-10 max-w-2xl mx-auto font-medium">
            {t('restaurants')} · {t('hotels')} · {t('cafes')} · {t('hospitals')} · {t('more')}
          </p>

          {/* Big search bar */}
          <form onSubmit={handleSearch} className="relative max-w-[600px] mx-auto mb-10">
            <div className="flex items-center h-[58px] bg-[#0F1629] border border-[#1E2D52] rounded-[16px] p-1.5 shadow-2xl focus-within:border-gold/50 transition-all group">
              <Search className="w-5 h-5 text-gold ml-4 shrink-0" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent border-none focus:ring-0 text-text-white px-4 text-sm md:text-base placeholder:text-text-faint"
              />
              <button type="submit" className="h-full px-8 rounded-[12px] bg-gradient-to-r from-gold to-gold-bright text-bg-deep font-bold text-sm hover:opacity-90 transition-opacity">
                {t('search')}
              </button>
            </div>
          </form>

          {/* City chips */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-text-faint font-medium uppercase tracking-widest">{t('browseByCity')}</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full px-4 pb-2">
              {cities.slice(0, 10).map(city => (
                <button
                  key={city.id}
                  onClick={() => onCitySelect(city.id)}
                  className="px-5 py-2 rounded-full border border-[#1E2D52] text-[#8A9BB5] text-xs font-bold whitespace-nowrap hover:border-gold/50 hover:text-gold transition-all bg-bg-card/50"
                >
                  {language === 'en' ? city.nameEn : language === 'ar' ? city.nameAr : city.nameKu}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="mt-16 flex items-center gap-4 md:gap-8 text-[#8A9BB5] text-[13px] font-medium">
          <span>500+ Businesses</span>
          <div className="w-1 h-1 rounded-full bg-[#1E2D52]" />
          <span>18 Governorates</span>
          <div className="w-1 h-1 rounded-full bg-[#1E2D52]" />
          <span>3 Languages</span>
        </div>
      </section>

      {/* SECTION 2 — CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
            <LayoutGrid className="w-5 h-5 text-gold" />
          </div>
          <h2 className="text-2xl font-bold">📂 {t('browseByCategory')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map(cat => {
            const count = getCategoryCount(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="cc-card p-6 flex flex-col items-center text-center cursor-pointer group hover:shadow-[0_0_20px_rgba(212,168,83,0.15)]"
              >
                <span className="text-[32px] mb-4 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                <span className="text-sm font-semibold text-text-white group-hover:text-gold transition-colors">
                  {language === 'en' ? cat.labelEn : language === 'ar' ? cat.labelAr : cat.labelKu}
                </span>
                <span className="text-[11px] text-text-faint mt-1.5 font-medium">
                  {count > 0 ? `${count} ${t('places')}` : t('comingSoon')}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 — FEATURED BUSINESSES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h2 className="text-2xl font-bold">⭐ {t('featuredInIraq')}</h2>
          </div>
          <p className="text-text-muted mt-2 text-sm">{t('highestRatedSub')}</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
          {featuredBusinesses.map(business => (
            <div key={business.id} className="snap-start">
              <BusinessCard
                business={business}
                onSelect={onSelectBusiness}
                language={language}
                compact
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — AI EVENTS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-[#0F1629]/50 border border-[#1E2D52] rounded-[32px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-2xl font-bold">✨ {t('aiCuratedEvents')}</h2>
              </div>
              <p className="text-text-muted text-sm">{t('aiEventsSub')}</p>
            </div>
            <button 
              onClick={handleGenerateEvents}
              disabled={isGenerating}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold to-gold-bright text-bg-deep font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? t('loading') : t('generateEvents')}
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory relative z-10">
            {isGenerating ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="w-[280px] flex-shrink-0 bg-[#0F1629] border border-[#1E2D52] rounded-2xl p-4 animate-pulse">
                  <div className="aspect-[4/3] bg-bg-elevated rounded-xl mb-4" />
                  <div className="h-4 bg-bg-elevated rounded w-3/4 mb-3" />
                  <div className="h-3 bg-bg-elevated rounded w-1/2" />
                </div>
              ))
            ) : (
              events.map(event => (
                <div key={event.id} className="w-[280px] flex-shrink-0 cc-card p-4 snap-start group">
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-4 bg-bg-elevated">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-teal/10 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-gold/20 border border-gold/30 text-gold text-[10px] font-bold backdrop-blur-md">✨ AI</div>
                  </div>
                  <h3 className="font-bold text-text-white mb-2 line-clamp-1">{event.eventName}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-teal/10 border border-teal/20 text-teal text-[10px] font-bold uppercase">{event.city}</span>
                    <span className="text-[11px] text-text-faint font-medium">{event.suggestedDate}</span>
                  </div>
                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{event.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CITY NAVIGATOR */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
            <Map className="w-5 h-5 text-gold" />
          </div>
          <h2 className="text-2xl font-bold">🗺 {t('exploreByGov')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GOVERNORATES.map(gov => {
            const count = getGovCount(gov);
            return (
              <div
                key={gov}
                onClick={() => onCitySelect(gov)}
                className="cc-card p-6 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-bg-elevated flex items-center justify-center mb-4 border border-[#1E2D52] group-hover:border-gold/50 transition-all shadow-inner">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {GOV_EMOJIS[gov] || '📍'}
                  </span>
                </div>
                <span className="font-bold text-text-white group-hover:text-gold transition-colors">{gov}</span>
                <span className="text-[11px] text-text-faint mt-1.5 font-medium uppercase tracking-wider">
                  {count} {t('businesses')}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
