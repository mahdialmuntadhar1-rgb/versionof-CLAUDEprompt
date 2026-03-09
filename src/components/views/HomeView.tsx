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
      <section className="relative min-h-[640px] flex flex-col items-center justify-center px-4 pt-40 pb-24 text-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-from)_0%,_transparent_60%)] from-gold/15" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-from)_0%,_transparent_50%)] from-teal/10" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Top badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-bold mb-10 backdrop-blur-md tracking-widest uppercase">
            <Compass className="w-4 h-4" />
            {t('discoverIraq')}
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(36px,8vw,64px)] font-black leading-[1.05] mb-8 tracking-tighter">
            <span className="text-white block opacity-90">{t('findBest')}</span>
            <span className="text-gradient block py-2">
              {t('businessesEvents')}
            </span>
            <span className="text-white block opacity-90">{t('acrossIraq')}</span>
          </h1>

          {/* Subheading */}
          <p className="text-text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('restaurants')} · {t('hotels')} · {t('cafes')} · {t('hospitals')} · {t('more')}
          </p>

          {/* Big search bar */}
          <form onSubmit={handleSearch} className="relative max-w-[720px] mx-auto mb-12 group">
            <div className="flex items-center h-[72px] bg-bg-card/40 backdrop-blur-md border border-border-custom rounded-[24px] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] focus-within:border-gold/50 focus-within:ring-4 focus-within:ring-gold/10 transition-all duration-500">
              <Search className="w-6 h-6 text-gold ml-5 shrink-0 group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent border-none focus:ring-0 text-text-white px-5 text-lg placeholder:text-text-faint font-medium"
              />
              <button type="submit" className="h-full px-10 rounded-[18px] btn-gold text-base">
                {t('search')}
              </button>
            </div>
          </form>

          {/* City chips */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] text-text-faint font-bold uppercase tracking-[0.3em]">{t('browseByCity')}</span>
            <div className="flex items-center justify-center gap-3 flex-wrap max-w-3xl">
              {cities.slice(0, 8).map(city => (
                <button
                  key={city.id}
                  onClick={() => onCitySelect(city.id)}
                  className="px-6 py-2.5 rounded-xl border border-border-custom text-text-muted text-xs font-bold whitespace-nowrap hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all duration-300 bg-bg-card/30 backdrop-blur-sm"
                >
                  {language === 'en' ? city.nameEn : language === 'ar' ? city.nameAr : city.nameKu}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="mt-24 flex items-center gap-6 md:gap-12 text-text-faint text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg">500+</span>
            <span>{t('businesses')}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg">18</span>
            <span>{t('governorate')}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
          <div className="flex items-center gap-3">
            <span className="text-gold text-lg">3</span>
            <span>{t('languages')}</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-lg shadow-gold/5">
            <LayoutGrid className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-white tracking-tight">{t('browseByCategory')}</h2>
            <p className="text-text-muted text-sm mt-1 font-medium">Explore the best of Iraq by category</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map(cat => {
            const count = getCategoryCount(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="cc-card p-8 flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-elevated/50 flex items-center justify-center mb-6 border border-border-custom group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-500 shadow-inner">
                  <span className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">{cat.emoji}</span>
                </div>
                <span className="text-base font-bold text-text-white group-hover:text-gold transition-colors duration-300">
                  {language === 'en' ? cat.labelEn : language === 'ar' ? cat.labelAr : cat.labelKu}
                </span>
                <span className="text-[11px] text-text-faint mt-2 font-bold uppercase tracking-widest">
                  {count > 0 ? `${count} ${t('places')}` : t('comingSoon')}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 — FEATURED BUSINESSES */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-lg shadow-gold/5">
              <Star className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text-white tracking-tight">{t('featuredInIraq')}</h2>
              <p className="text-text-muted text-sm mt-1 font-medium">{t('highestRatedSub')}</p>
            </div>
          </div>
          <button onClick={() => onCategorySelect(null as any)} className="btn-ghost text-sm py-2.5">
            {t('browseAll')}
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory">
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
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-bg-card/40 backdrop-blur-md border border-border-custom rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-xl shadow-gold/5">
                  <Sparkles className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-text-white tracking-tighter">{t('aiCuratedEvents')}</h2>
              </div>
              <p className="text-text-muted text-lg font-medium leading-relaxed">{t('aiEventsSub')}</p>
            </div>
            <button 
              onClick={handleGenerateEvents}
              disabled={isGenerating}
              className="btn-gold h-16 px-10 text-lg flex items-center gap-3 shadow-2xl shadow-gold/20"
            >
              <Sparkles className="w-5 h-5" />
              {isGenerating ? t('loading') : t('generateEvents')}
            </button>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory relative z-10">
            {isGenerating ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="w-[320px] flex-shrink-0 bg-bg-card/60 border border-border-custom rounded-3xl p-6 animate-pulse">
                  <div className="aspect-[16/10] bg-bg-elevated rounded-2xl mb-6" />
                  <div className="h-5 bg-bg-elevated rounded-lg w-3/4 mb-4" />
                  <div className="h-4 bg-bg-elevated rounded-lg w-1/2" />
                </div>
              ))
            ) : (
              events.map(event => (
                <div key={event.id} className="w-[320px] flex-shrink-0 cc-card p-6 snap-start group">
                  <div className="aspect-[16/10] relative rounded-2xl overflow-hidden mb-6 bg-bg-elevated">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-teal/20 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-bg-deep/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-gold/20 border border-gold/30 text-gold text-[10px] font-black backdrop-blur-md tracking-widest">✨ AI CURATED</div>
                  </div>
                  <h3 className="text-xl font-bold text-text-white mb-3 line-clamp-1 group-hover:text-gold transition-colors duration-300">{event.eventName}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-lg bg-teal/10 border border-teal/20 text-teal text-[10px] font-black uppercase tracking-widest">{event.city}</span>
                    <span className="text-xs text-text-faint font-bold">{event.suggestedDate}</span>
                  </div>
                  <p className="text-sm text-text-muted line-clamp-2 leading-relaxed font-medium">{event.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CITY NAVIGATOR */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-lg shadow-gold/5">
            <Map className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-text-white tracking-tight">{t('exploreByGov')}</h2>
            <p className="text-text-muted text-sm mt-1 font-medium">Discover businesses across all 18 governorates</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {GOVERNORATES.map(gov => {
            const count = getGovCount(gov);
            return (
              <div
                key={gov}
                onClick={() => onCitySelect(gov)}
                className="cc-card p-8 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-bg-elevated/50 flex items-center justify-center mb-6 border border-border-custom group-hover:border-gold/40 group-hover:bg-gold/5 transition-all duration-500 shadow-inner overflow-hidden relative">
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {GOV_EMOJIS[gov] || '📍'}
                  </span>
                </div>
                <span className="text-base font-bold text-text-white group-hover:text-gold transition-colors duration-300">{gov}</span>
                <span className="text-[10px] text-text-faint mt-2 font-black uppercase tracking-[0.2em]">
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
