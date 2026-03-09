import React from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone, Clock, Share2, Star, CheckCircle, Navigation } from 'lucide-react';
import { Business, Language } from '../../types';
import { CATEGORIES, MOCK_REVIEWS, MOCK_BUSINESSES } from '../../constants';
import { BusinessCard } from '../ui/BusinessCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DetailViewProps {
  business: Business;
  language: Language;
  t: (key: string) => string;
  onBack: () => void;
  onSelectBusiness: (id: string) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  business,
  language,
  t,
  onBack,
  onSelectBusiness
}) => {
  const category = CATEGORIES.find(c => c.id === business.category);
  const reviews = MOCK_REVIEWS.filter(r => r.businessId === business.id);
  const related = MOCK_BUSINESSES.filter(b => b.category === business.category && b.id !== business.id).slice(0, 3);

  const actualName = language === 'en' ? business.name : language === 'ar' ? business.nameAr : business.nameKu;
  const description = language === 'en' ? business.description : language === 'ar' ? business.descriptionAr : business.descriptionKu;
  const isRTL = language === 'ar' || language === 'ku';

  // Consistent gradient
  const gradients = [
    'from-gold/20 to-teal/20',
    'from-teal/20 to-gold/20',
    'from-gold/30 to-bg-card',
    'from-teal/30 to-bg-card',
    'from-bg-elevated to-gold/20'
  ];
  const gradient = gradients[parseInt(business.id) % gradients.length] || gradients[0];

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-20 px-4">
      {/* BACK BUTTON */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#8A9BB5] hover:text-gold transition-colors mb-8 group px-4 py-2 rounded-xl hover:bg-gold/5"
      >
        {isRTL ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
        <span className="text-sm font-bold">{t('back')}</span>
      </button>

      {/* HERO IMAGE */}
      <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden mb-10 border border-[#1E2D52] shadow-2xl">
        <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#F0EDE8] drop-shadow-lg">{actualName}</h1>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="space-y-8">
        <section>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-lg bg-gold/10 border border-gold/20 text-gold text-[11px] font-bold uppercase tracking-wider">
              {category?.emoji} {language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}
            </div>
            <div className="px-3 py-1 rounded-lg bg-teal/10 border border-teal/20 text-teal text-[11px] font-bold uppercase tracking-wider">
              {business.city}
            </div>
            {business.isVerified && (
              <div className="px-3 py-1 rounded-lg bg-green/10 border border-green/20 text-green text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3" />
                {t('verified')}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-5 h-5",
                    i < Math.floor(business.rating) ? "text-gold fill-gold" : "text-[#1E2D52]"
                  )} 
                />
              ))}
            </div>
            <span className="text-xl font-bold text-gold">{business.rating.toFixed(1)}</span>
            <span className="text-[#8A9BB5] font-medium">({business.reviewCount} {t('reviews')})</span>
          </div>

          <p className="text-[#8A9BB5] text-[15px] leading-relaxed max-w-3xl">
            {description}
          </p>
        </section>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="cc-card p-6 flex flex-col items-center text-center group hover:border-gold/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center mb-4 border border-gold/10 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <span className="text-[10px] text-[#4A5568] uppercase font-bold mb-2 tracking-widest">{t('phone')}</span>
            <span className="text-sm font-bold text-[#F0EDE8]">{business.phone || 'N/A'}</span>
          </div>
          <div className="cc-card p-6 flex flex-col items-center text-center group hover:border-gold/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center mb-4 border border-gold/10 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <span className="text-[10px] text-[#4A5568] uppercase font-bold mb-2 tracking-widest">{t('address')}</span>
            <span className="text-sm font-bold text-[#F0EDE8] line-clamp-1">{business.address}</span>
          </div>
          <div className="cc-card p-6 flex flex-col items-center text-center group hover:border-gold/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center mb-4 border border-gold/10 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <span className="text-[10px] text-[#4A5568] uppercase font-bold mb-2 tracking-widest">{t('hours')}</span>
            <span className="text-sm font-bold text-[#F0EDE8]">{business.openHours || 'N/A'}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="flex-1 h-14 rounded-xl bg-gradient-to-r from-gold to-gold-bright text-bg-deep font-bold text-base flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg shadow-gold/10">
            <Navigation className="w-5 h-5" />
            {t('directions')}
          </button>
          <button 
            className="flex-1 h-14 rounded-xl border border-[#1E2D52] text-[#F0EDE8] font-bold text-base flex items-center justify-center gap-3 hover:bg-[#162040] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!business.phone}
          >
            <Phone className="w-5 h-5 text-gold" />
            {t('call')}
          </button>
          <button className="h-14 px-6 rounded-xl border border-[#1E2D52] text-[#F0EDE8] font-bold text-base flex items-center justify-center gap-3 hover:bg-[#162040] transition-colors">
            <Share2 className="w-5 h-5 text-gold" />
            {t('share')}
          </button>
        </div>

        {/* REVIEWS SECTION */}
        <section className="pt-12">
          <h2 className="text-2xl font-bold mb-8 text-[#F0EDE8]">{t('reviews')}</h2>
          <div className="grid grid-cols-1 gap-4">
            {reviews.map(review => (
              <div key={review.id} className="cc-card p-6 hover:border-gold/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center text-bg-deep font-black text-lg shadow-lg">
                      {review.authorName[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#F0EDE8] text-base">{review.authorName}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "text-gold fill-gold" : "text-[#1E2D52]")} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#4A5568] font-bold uppercase tracking-wider">{review.date}</span>
                </div>
                <p className="text-[#8A9BB5] text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED SECTION */}
        <section className="pt-12 border-t border-[#1E2D52]">
          <h3 className="text-xl font-bold mb-8 text-[#F0EDE8]">
            {t('moreIn')} {language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
            {related.map(item => (
              <div key={item.id} className="snap-start">
                <BusinessCard
                  business={item}
                  onSelect={onSelectBusiness}
                  language={language}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
