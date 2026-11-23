import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/translations';
import logoImg from '../assets/images/logo.png';

export default function Navbar({ onOpenBooking }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#docteur', label: t.nav.about },
    { href: '#soins', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.reviews },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-navigation">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-4 lg:gap-6">
          {/* Brand Logo & Name */}
          <a href="#accueil" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logoImg}
              alt={BUSINESS_INFO.clinicNameFr}
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-brand-plum tracking-tight whitespace-nowrap">
                {t.brandTitle}
              </span>
              <span className="text-xs sm:text-sm font-medium text-brand-ink/70 whitespace-nowrap">
                {t.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-brand-ink/85 hover:text-brand-plum transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            {/* Language Switcher */}
            <div
              className="inline-flex items-center rounded-full bg-brand-sand/80 p-1 border border-brand-plum/15 shrink-0"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  lang === 'fr'
                    ? 'bg-brand-plum text-white shadow-sm'
                    : 'text-brand-ink/75 hover:text-brand-plum'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  lang === 'ar'
                    ? 'bg-brand-plum text-white shadow-sm'
                    : 'text-brand-ink/75 hover:text-brand-plum'
                }`}
              >
                AR
              </button>
            </div>

            {/* Direct Phone Pill */}
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              dir="ltr"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-plum/20 bg-white/80 text-brand-plum hover:bg-brand-plum hover:text-white transition-all text-sm font-bold whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            {/* Appointment Trigger */}
            <button
              type="button"
              onClick={() => onOpenBooking('')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-plum text-white hover:bg-brand-plumDark shadow-md hover:shadow-lg transition-all text-sm font-bold whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-sand text-brand-plum text-sm font-bold border border-brand-plum/15"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/80 border border-brand-plum/15 text-brand-plum hover:bg-brand-sand transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-brand-plum/10 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold text-brand-ink hover:bg-brand-sand/70 hover:text-brand-plum transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-brand-plum/10 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              dir="ltr"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-brand-plum/25 text-brand-plum font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('');
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-plum text-white font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
