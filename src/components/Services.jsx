import React, { useState } from 'react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';

import rhino1Img from '../assets/images/service-rhino-1.webp';
import rhino2Img from '../assets/images/service-rhino-2.webp';
import lip1Img from '../assets/images/service-lip-1.webp';
import lip2Img from '../assets/images/service-lip-2.webp';
import phototherapyImg from '../assets/images/service-phototherapy.webp';
import hyperhidrosisImg from '../assets/images/service-hyperhidrosis.webp';
import injectionImg from '../assets/images/service-injection.webp';

const SERVICE_IMAGES = {
  rhino1: rhino1Img,
  rhino2: rhino2Img,
  lip1: lip1Img,
  lip2: lip2Img,
  phototherapy: phototherapyImg,
  hyperhidrosis: hyperhidrosisImg,
  injection: injectionImg,
};

export default function Services({ onOpenBooking }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems =
    activeCategory === 'all'
      ? t.services.items
      : t.services.items.filter((item) => item.category === activeCategory);

  return (
    <section id="soins" className="py-16 lg:py-24 bg-brand-champagne">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-brand-gold">
            {t.services.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-espresso">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-taupe">{t.services.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {t.services.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-espresso text-white shadow-glass'
                  : 'bg-white/80 text-brand-espresso hover:bg-white border border-brand-gold/25'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((service) => (
            <article
              key={service.id}
              className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-brand-sand overflow-hidden">
                  <img
                    src={SERVICE_IMAGES[service.imageKey]}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 start-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-espresso/90 text-brand-gold-light text-xs font-bold backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t.services.durationBadge}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {service.tagline}
                  </p>
                  <h3 className="text-xl font-extrabold text-brand-espresso">{service.title}</h3>
                  <p className="text-sm sm:text-base text-brand-taupe leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-brand-gold-soft/80 text-brand-espresso text-xs font-semibold"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-espresso hover:bg-brand-espresso-deep text-white text-sm font-bold transition-colors"
                >
                  <Calendar className="w-4 h-4 text-brand-gold-light" />
                  <span>{t.services.bookAction}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
