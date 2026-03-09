import React from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Share2, Star, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { Business, Review, Language } from '../../types';
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
  const related = MOCK_BUSINESSES.filter(b => b.category === business.category && b.id !== business.id).slice(0, 4);

  const actualName = language === 'en' ? business.name : language === 'ar' ? business.nameAr : business.nameKu;
  const description = language === 'en' ? business.description : language === 'ar' ? business.descriptionAr : business.descriptionKu;

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
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">{t('back')}</span>
      </button>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8 border border-border-custom">
        <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="badge-gold backdrop-blur-md">
              {category?.emoji} {language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}
            </div>
            <div className="badge-teal backdrop-blur-md">{business.city}</div>
            {business.isVerified && (
              <div className="badge-green backdrop-blur-md flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {t('verified')}
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-white">{actualName}</h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(business.rating) ? "text-gold fill-gold" : "text-border-custom"
                    )} 
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-gold">{business.rating.toFixed(1)}</span>
              <span className="text-text-muted">({business.reviewCount} {t('reviews')})</span>
            </div>
            <p className="text-text-white/90 text-lg leading-relaxed">
              {description}
            </p>
          </section>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="cc-card p-4 flex flex-col items-center text-center">
              <Phone className="w-5 h-5 text-gold mb-2" />
              <span className="text-[10px] text-text-faint uppercase font-bold mb-1">{t('call')}</span>
              <span className="text-xs font-medium text-text-white">{business.phone || 'N/A'}</span>
            </div>
            <div className="cc-card p-4 flex flex-col items-center text-center">
              <MapPin className="w-5 h-5 text-gold mb-2" />
              <span className="text-[10px] text-text-faint uppercase font-bold mb-1">{t('city')}</span>
              <span className="text-xs font-medium text-text-white">{business.city}, {business.governorate}</span>
            </div>
            <div className="cc-card p-4 flex flex-col items-center text-center">
              <Clock className="w-5 h-5 text-gold mb-2" />
              <span className="text-[10px] text-text-faint uppercase font-bold mb-1">Hours</span>
              <span className="text-xs font-medium text-text-white">{business.openHours || 'N/A'}</span>
            </div>
          </div>

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-bold mb-6">{t('reviews')}</h2>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="cc-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold">
                          {review.authorName[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-text-white">{review.authorName}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("w-3 h-3", i < review.rating ? "text-gold fill-gold" : "text-border-custom")} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-text-faint">{review.date}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-bg-elevated/30 rounded-2xl border border-dashed border-border-custom">
                  <MessageCircle className="w-8 h-8 text-text-faint mx-auto mb-2" />
                  <p className="text-text-faint text-sm">No reviews yet. Be the first!</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Actions & Related */}
        <div className="space-y-8">
          <div className="cc-card p-6 sticky top-24">
            <h3 className="font-bold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="btn-gold w-full flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('directions')}
              </button>
              <button className="btn-ghost w-full flex items-center justify-center gap-2" disabled={!business.phone}>
                <Phone className="w-4 h-4" />
                {t('call')}
              </button>
              <button className="btn-ghost w-full flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                {t('share')}
              </button>
              {business.website && (
                <a 
                  href={business.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-ghost w-full flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>

          <section className="mt-12 pt-12 border-t border-border-custom">
            <h3 className="text-xl font-bold mb-6">
              More in {language === 'en' ? category?.labelEn : language === 'ar' ? category?.labelAr : category?.labelKu}
            </h3>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
              {related.map(item => (
                <BusinessCard
                  key={item.id}
                  business={item}
                  onSelect={onSelectBusiness}
                  language={language}
                  compact={true}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
