import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  Star,
  MapPin,
  Clock,
  Sparkles,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { CLINIC_INFO } from '../translations.js';
import { getClinicStatus } from '../utils/clinicStatus.js';
import doctorHeroImg from '../assets/images/doctor-hero.webp';
import logoImg from '../assets/images/logo.png';

export default function Hero({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const interval = setInterval(() => {
      setStatus(getClinicStatus(lang));
    }, 60000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <section
      id="accueil"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-ivory via-brand-champagne to-brand-champagne"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -end-24 w-96 h-96 rounded-full bg-brand-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -start-24 w-80 h-80 rounded-full bg-brand-gold-light/25 blur-3xl"
      />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${
                  status.isOpen
                    ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50/95 text-amber-900 border-amber-200'
                }`}
              >
                {status.isOpen ? (
                  <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <DoorClosed className="w-4 h-4 text-amber-700 shrink-0" />
                )}
                <span>{status.badge}</span>
                {status.detail && (
                  <span className="font-medium opacity-85">• {status.detail}</span>
                )}
              </span>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/85 border border-brand-gold/30 text-xs sm:text-sm font-bold text-brand-espresso hover:border-brand-gold transition-colors"
              >
                <Star className="w-4 h-4 fill-brand-gold text-brand-gold shrink-0" />
                <span>{t.hero.googleBadge}</span>
              </a>
            </div>

            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-brand-gold">
              {t.hero.badge}
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-brand-espresso leading-[1.16] tracking-tight whitespace-pre-line">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-taupe leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brand-espresso hover:bg-brand-espresso-deep text-white text-base font-bold shadow-glass-lg transition-all"
              >
                <Calendar className="w-5 h-5 text-brand-gold-light shrink-0" />
                <span>{t.hero.ctaPrimary}</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/90 hover:bg-white border border-brand-gold/45 text-brand-espresso text-base font-bold shadow-glass transition-all"
              >
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="glass-card p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-gold-soft text-brand-espresso shrink-0">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-brand-taupe">
                    {t.hero.quickCards.locationTitle}
                  </h2>
                  <p className="text-sm font-bold text-brand-espresso mt-0.5">
                    {t.hero.quickCards.locationValue}
                  </p>
                </div>
              </div>

              <div className="glass-card p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-gold-soft text-brand-espresso shrink-0">
                  <Clock className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-brand-taupe">
                    {t.hero.quickCards.hoursTitle}
                  </h2>
                  <p className="text-sm font-bold text-brand-espresso mt-0.5">
                    {t.hero.quickCards.hoursValue}
                  </p>
                </div>
              </div>

              <div className="glass-card p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-gold-soft text-brand-espresso shrink-0">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-brand-taupe">
                    {t.hero.quickCards.specialtyTitle}
                  </h2>
                  <p className="text-sm font-bold text-brand-espresso mt-0.5">
                    {t.hero.quickCards.specialtyValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="glass-card p-3 sm:p-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-brand-sand">
                  <img
                    src={doctorHeroImg}
                    alt={t.hero.doctorCardTitle}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-espresso/85 via-brand-espresso/40 to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 text-white">
                    <p className="text-lg sm:text-xl font-extrabold">{t.hero.doctorCardTitle}</p>
                    <p className="text-xs sm:text-sm text-brand-gold-light font-medium">
                      {t.hero.doctorCardRole}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -end-4 sm:-end-6 glass-card p-3 shadow-glass-lg flex items-center justify-center">
                <img
                  src={logoImg}
                  alt={CLINIC_INFO.clinicNameFr}
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
