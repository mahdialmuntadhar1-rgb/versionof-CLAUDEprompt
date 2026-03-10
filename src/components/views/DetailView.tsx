import React from 'react';
import { MapPin, Star, Phone, Globe, Clock, ArrowLeft, ArrowRight, Share2, CheckCircle } from 'lucide-react';
import { Business, Language } from '../../types';
import { CATEGORIES, MOCK_BUSINESSES } from '../../constants';
import { BusinessCard } from '../ui/BusinessCard';
import { cn } from '../../utils/cn';
import { motion } from 'motion/react';

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
  onSelectBusiness,
}) => {
  const isRTL = language === 'ar' || language === 'ku';
  const category = CATEGORIES.find(c => c.id === business.category);
  
  const name = language === 'en' ? business.name : language === 'ar' ? business.nameAr : business.nameKu;
  const description = language === 'en' ? business.description : language === 'ar' ? business.descriptionAr : business.descriptionKu;
  const actualName = name || business.name;

  const gradients = [
    'from-gold/20 to-teal/20',
    'from-teal/20 to-gold/20',
    'from-gold/20 via-bg-elevated to-teal/20',
    'from-teal/20 via-bg-elevated to-gold/20'
  ];
  const gradient = gradients[business.id.length % gradients.length];

  return (
    <div className="pb-20 md:pb-10">
      {/* HERO SECTION */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button 
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-text-white/80 hover:text-gold transition-colors font-bold text-xs sm:text-sm uppercase tracking-widest bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10 min-h-[44px] min-w-[44px]"
              >
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {t('back')}
              </button>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="badge-gold flex items-center gap-2 px-3 py-1 shadow-xl">
                      <span className="text-lg">{category?.emoji}</span>
                      <span className="text-[10px] tracking-widest uppercase font-black">{language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}</span>
                    </div>
                    {business.isVerified && (
                      <div className="badge-green flex items-center gap-2 px-3 py-1 shadow-xl">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-[10px] tracking-widest uppercase font-black">VERIFIED</span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-text-white tracking-tighter mb-4">{actualName}</h1>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-text-white/80">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5 sm:w-4 h-4", i < Math.floor(business.rating) ? "text-gold fill-gold" : "text-white/20")} />
                        ))}
                      </div>
                      <span className="text-base sm:text-lg font-black text-gold">{business.rating.toFixed(1)}</span>
                      <span className="text-xs sm:text-sm font-bold">({business.reviewCount} {t('reviews')})</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 h-4 text-gold" />
                      {business.city}, {business.governorate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="btn-gold flex-1 sm:flex-none px-8 h-14 text-sm flex items-center justify-center gap-2 shadow-2xl shadow-gold/20 min-h-[44px]">
                    <Phone className="w-4 h-4" />
                    {t('callNow')}
                  </button>
                  <button className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-text-white hover:bg-gold hover:text-bg-deep hover:border-gold transition-all duration-300 min-h-[44px] min-w-[44px]">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <div className="cc-card p-8 md:p-10">
              <h2 className="text-2xl font-black text-text-white tracking-tight mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gold rounded-full" />
                {t('about')}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                {description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-border-custom/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-text-faint uppercase tracking-widest">{t('priceRange')}</span>
                  <span className="text-gold font-mono text-lg">{'$'.repeat(business.priceRange || 1)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-text-faint uppercase tracking-widest">{t('status')}</span>
                  <span className="text-teal font-bold text-sm uppercase tracking-wider">Open Now</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-text-faint uppercase tracking-widest">Est.</span>
                  <span className="text-text-white font-bold text-sm">2018</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-text-faint uppercase tracking-widest">Capacity</span>
                  <span className="text-text-white font-bold text-sm">150+</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-text-white tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gold rounded-full" />
                  {t('reviews')}
                </h2>
                <button className="btn-ghost text-xs py-2 px-4 uppercase tracking-widest font-black">
                  {t('writeReview')}
                </button>
              </div>

              <div className="grid gap-6">
                {business.reviews?.map(review => (
                  <div key={review.id} className="cc-card p-6 md:p-8 group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-teal/20 border border-border-custom flex items-center justify-center text-gold font-black text-lg">
                          {review.authorName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-text-white group-hover:text-gold transition-colors">{review.authorName}</h4>
                          <span className="text-[10px] text-text-faint font-bold uppercase tracking-widest">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "text-gold fill-gold" : "text-border-custom")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-text-muted text-base leading-relaxed font-medium italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="cc-card p-8 sticky top-32">
              <h3 className="text-xl font-black text-text-white tracking-tight mb-8">{t('contactInfo')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-bg-deep transition-all duration-300">
                    <MapPin className="w-5 h-5 text-gold group-hover:text-bg-deep" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-1">{t('address')}</p>
                    <p className="text-sm font-bold text-text-white leading-relaxed">{business.city}, {business.governorate}, Iraq</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-bg-deep transition-all duration-300">
                    <Phone className="w-5 h-5 text-gold group-hover:text-bg-deep" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-1">{t('phone')}</p>
                    <p className="text-sm font-bold text-text-white">{business.phone || '+964 770 123 4567'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-bg-deep transition-all duration-300">
                    <Clock className="w-5 h-5 text-gold group-hover:text-bg-deep" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-1">{t('hours')}</p>
                    <p className="text-sm font-bold text-text-white">{business.openHours || '09:00 AM - 11:00 PM'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-bg-deep transition-all duration-300">
                    <Globe className="w-5 h-5 text-gold group-hover:text-bg-deep" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-1">{t('website')}</p>
                    <p className="text-sm font-bold text-text-white">{business.website || `www.${actualName.toLowerCase().replace(/\s+/g, '')}.iq`}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-border-custom/50">
                <button className="w-full btn-gold h-14 text-sm font-black uppercase tracking-widest shadow-xl shadow-gold/10">
                  {t('getDirections')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SIMILAR PLACES */}
        <div className="mt-24">
          <h2 className="text-2xl font-black text-text-white tracking-tight mb-8 flex items-center gap-3 px-4 sm:px-0">
            <div className="w-1.5 h-8 bg-gold rounded-full" />
            {t('similarPlaces')}
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory px-4 sm:px-0">
            {MOCK_BUSINESSES.filter(b => b.category === business.category && b.id !== business.id).slice(0, 4).map(similar => (
              <div key={similar.id} className="snap-start">
                <BusinessCard
                  business={similar}
                  onSelect={onSelectBusiness}
                  language={language}
                  compact
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
