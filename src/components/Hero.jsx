import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Star, DoorOpen, DoorClosed, Sparkles, ShieldCheck, Syringe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/translations';
import { getClinicStatus } from '../utils/clinicStatus';
import doctorHeroImg from '../assets/images/doctor-hero.webp';
import logoImg from '../assets/images/logo.png';

export default function Hero({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => {
      setStatus(getClinicStatus(lang));
    }, 60000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <section
      id="accueil"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-brand-sand/70 via-brand-cream to-brand-cream"
    >
      <div className="pointer-events-none absolute -top-24 start-1/4 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 end-10 w-80 h-80 rounded-full bg-brand-plum/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* Real-Time Open/Closed Status */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border shadow-sm ${
                  status.isOpen
                    ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50/90 text-amber-900 border-amber-200'
                }`}
              >
                {status.isOpen ? (
                  <DoorOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <DoorClosed className="w-4 h-4 text-amber-700 shrink-0" />
                )}
                <span>{status.badge}</span>
                {status.detail && (
                  <span className="font-medium opacity-80">• {status.detail}</span>
                )}
              </div>

              {/* Google Maps Rating Badge */}
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-brand-gold/30 text-brand-ink text-sm font-semibold shadow-sm hover:border-brand-gold transition-colors"
              >
                <Star className="w-4 h-4 fill-brand-gold text-brand-gold shrink-0" />
                <span>{t.hero.ratingText}</span>
              </a>
            </div>

            <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-brand-gold">
              {t.hero.badge}
            </p>

            {/* Mandatory Bienvenue / مرحباً بكم Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-brand-plum leading-[1.18] whitespace-pre-line">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking('')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-brand-plum text-white hover:bg-brand-plumDark font-bold text-base shadow-lg hover:shadow-xl transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.hero.ctaPrimary}</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/90 text-brand-plum border border-brand-plum/20 hover:border-brand-plum font-bold text-base shadow-sm transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </div>

            {/* Three Glass Quick Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              <div className="glass-card p-4">
                <div className="w-10 h-10 rounded-xl bg-brand-plum/10 text-brand-plum flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold text-brand-plum">{t.hero.card1Title}</h2>
                <p className="text-xs text-brand-ink/75 mt-1">{t.hero.card1Desc}</p>
              </div>

              <div className="glass-card p-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-plum flex items-center justify-center mb-3">
                  <Syringe className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold text-brand-plum">{t.hero.card2Title}</h2>
                <p className="text-xs text-brand-ink/75 mt-1">{t.hero.card2Desc}</p>
              </div>

              <div className="glass-card p-4">
                <div className="w-10 h-10 rounded-xl bg-brand-plum/10 text-brand-plum flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold text-brand-plum">{t.hero.card3Title}</h2>
                <p className="text-xs text-brand-ink/75 mt-1">{t.hero.card3Desc}</p>
              </div>
            </div>
          </div>

          {/* Right Authentic Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-[28px] overflow-hidden shadow-2xl border-4 border-white/80 bg-brand-sand">
                <img
                  src={doctorHeroImg}
                  alt={BUSINESS_INFO.clinicNameFr}
                  className="w-full h-[460px] sm:h-[540px] object-cover object-top"
                />
              </div>

              {/* Floating Official Logo Glass Badge */}
              <div className="glass-card p-3.5 sm:p-4 flex items-center gap-3.5 absolute -bottom-6 start-4 end-4 sm:start-6 sm:end-6 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0">
                  <img
                    src={logoImg}
                    alt="Logo Dr. FATHI Sana"
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold text-brand-plum text-base truncate">
                    {BUSINESS_INFO.doctorName}
                  </p>
                  <p className="text-xs sm:text-sm text-brand-ink/75 truncate">
                    {t.brandSubtitle} • Rabat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
