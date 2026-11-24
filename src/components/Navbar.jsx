import React, { useState } from 'react';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { CLINIC_INFO } from '../translations.js';
import logoImg from '../assets/images/logo.png';

export default function Navbar({ onOpenBooking }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#medecin', label: t.nav.about },
    { href: '#soins', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 glass-navigation">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24 gap-4 lg:gap-6">
          <a href="#accueil" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logoImg}
              alt={CLINIC_INFO.clinicNameFr}
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="block text-lg sm:text-xl font-extrabold text-brand-espresso tracking-tight whitespace-nowrap">
                {t.nav.brand}
              </span>
              <span className="block text-xs sm:text-sm font-medium text-brand-taupe whitespace-nowrap">
                {t.nav.subtitle}
              </span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-brand-espresso/85 hover:text-brand-gold transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <div
              className="inline-flex items-center rounded-full bg-brand-champagne border border-brand-gold/30 p-1"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  lang === 'fr'
                    ? 'bg-brand-espresso text-white shadow-sm'
                    : 'text-brand-espresso/75 hover:text-brand-espresso'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  lang === 'ar'
                    ? 'bg-brand-espresso text-white shadow-sm'
                    : 'text-brand-espresso/75 hover:text-brand-espresso'
                }`}
              >
                AR
              </button>
            </div>

            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              aria-label={t.nav.callAria}
              dir="ltr"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 border border-brand-gold/35 text-brand-espresso hover:border-brand-gold text-sm font-bold shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-espresso hover:bg-brand-espresso-deep text-white text-sm font-bold shadow-glass transition-all whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 text-brand-gold-light shrink-0" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="px-3 py-1.5 rounded-full bg-brand-champagne border border-brand-gold/35 text-xs font-bold text-brand-espresso"
            >
              {lang === 'fr' ? 'AR' : 'FR'}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? t.nav.menuClose : t.nav.menuOpen}
              className="p-2.5 rounded-xl bg-white/85 border border-brand-gold/25 text-brand-espresso"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-brand-ivory/95 backdrop-blur-xl border-t border-brand-gold/20 px-4 pt-4 pb-6 space-y-4 shadow-glass-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl text-base font-semibold text-brand-espresso hover:bg-brand-gold-soft/50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-brand-sand flex flex-col gap-3">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              dir="ltr"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white border border-brand-gold/40 text-brand-espresso text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-espresso text-white text-sm font-bold"
            >
              <Calendar className="w-4 h-4 text-brand-gold-light" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
