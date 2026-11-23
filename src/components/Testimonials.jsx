import React from 'react';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/translations';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="avis" className="py-20 sm:py-28 bg-brand-sand/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Verified Google Rating */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-brand-plum text-sm font-bold shadow-sm border border-brand-gold/30">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span>{t.reviews.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum">
            {t.reviews.title}
          </h2>

          <p className="text-base sm:text-lg font-bold text-brand-ink/80">
            {t.reviews.summary}
          </p>

          {/* Recurring Google Maps Patient Keyword Chips */}
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-ink/60 mb-3">
              {t.reviews.keywordsTitle}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {t.reviews.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-brand-plum/15 text-brand-plum text-sm font-bold shadow-sm"
                >
                  <span>{kw.word}</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-plum text-xs">
                    {kw.count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-7 mb-12">
          {t.reviews.items.map((review, idx) => (
            <div
              key={idx}
              dir={review.dir}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-plum/20" />
                </div>

                <p className="text-sm sm:text-base text-brand-ink/85 leading-relaxed">
                  « {review.text} »
                </p>
              </div>

              <div className="pt-4 border-t border-brand-plum/10">
                <p className="font-bold text-brand-plum text-sm sm:text-base">
                  {review.author}
                </p>
                <p className="text-xs text-brand-ink/60">
                  {review.badge} • {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Google Maps Reviews CTA */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-brand-plum border border-brand-plum/20 hover:bg-brand-plum hover:text-white font-bold text-sm sm:text-base shadow-sm transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t.reviews.ctaGoogle}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
