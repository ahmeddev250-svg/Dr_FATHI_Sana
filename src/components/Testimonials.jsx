import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { CLINIC_INFO } from '../translations.js';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="avis" className="py-16 lg:py-24 bg-brand-champagne">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-brand-gold">
            {t.testimonials.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-espresso">
            {t.testimonials.title}
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/90 border border-brand-gold/35 shadow-glass">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-base sm:text-lg font-extrabold text-brand-espresso">
              {t.testimonials.ratingSummary}
            </span>
            <span className="text-sm text-brand-taupe font-medium">
              ({t.testimonials.reviewCountLabel})
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          <span className="text-sm font-bold text-brand-taupe me-1">
            {t.testimonials.keywordsTitle}
          </span>
          {t.testimonials.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/85 border border-brand-gold/30 text-sm font-bold text-brand-espresso"
            >
              <span>{kw.word}</span>
              <span className="px-2 py-0.5 rounded-full bg-brand-gold-soft text-xs font-extrabold text-brand-espresso">
                {kw.count}
              </span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
          {t.testimonials.items.map((review) => (
            <article
              key={review.id}
              className="glass-card glass-card-hover p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-gold/45" />
                </div>
                <p className="text-sm sm:text-base text-brand-espresso/90 leading-relaxed">
                  “{review.text}”
                </p>
              </div>

              <div className="pt-4 border-t border-brand-sand flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-brand-espresso">
                    {review.author}
                  </p>
                  <p className="text-xs text-brand-taupe">{review.meta}</p>
                </div>
                <span className="text-xs font-semibold text-brand-taupe">{review.date}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-brand-ivory border border-brand-gold/45 text-brand-espresso text-sm sm:text-base font-bold shadow-glass transition-all"
          >
            <span>{t.testimonials.ctaGoogle}</span>
            <ExternalLink className="w-4 h-4 text-brand-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}
