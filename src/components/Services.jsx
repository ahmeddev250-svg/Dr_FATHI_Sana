import React from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import rhinoplastyImg from '../assets/images/service-rhinoplasty.webp';
import lipFillerImg from '../assets/images/service-lip-filler.webp';
import botoxImg from '../assets/images/service-botox.webp';
import injectionImg from '../assets/images/service-injection.webp';
import hyperhidrosisImg from '../assets/images/service-hyperhidrosis.webp';
import phototherapyImg from '../assets/images/service-phototherapy.webp';

const SERVICE_IMAGES = {
  rhinoplasty: rhinoplastyImg,
  lipFiller: lipFillerImg,
  botox: botoxImg,
  injection: injectionImg,
  hyperhidrosis: hyperhidrosisImg,
  phototherapy: phototherapyImg,
};

export default function Services({ onOpenBooking }) {
  const { t } = useLanguage();

  return (
    <section id="soins" className="py-20 sm:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-plum text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>{t.services.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service) => (
            <article
              key={service.id}
              className="glass-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-brand-sand">
                  <img
                    src={SERVICE_IMAGES[service.imageKey]}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-brand-plum/90 text-white text-xs font-bold backdrop-blur-md">
                    {service.category}
                  </div>
                  <div className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-brand-plum text-xs font-bold shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{t.services.durationBadge}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-brand-plum leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-brand-sand text-brand-plum text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-plum/10 text-brand-plum hover:bg-brand-plum hover:text-white font-bold text-sm transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.services.bookService}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
