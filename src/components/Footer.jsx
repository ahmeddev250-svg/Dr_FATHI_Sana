import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { CLINIC_INFO } from '../translations.js';
import logoImg from '../assets/images/logo.png';

export default function Footer({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const addressText = lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressFr;

  return (
    <>
      <footer className="bg-brand-espresso text-white pt-16 pb-10 border-t border-brand-gold/30">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-2xl bg-brand-ivory/95 shrink-0">
                  <img
                    src={logoImg}
                    alt={CLINIC_INFO.clinicNameFr}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {t.nav.brand}
                  </h2>
                  <p className="text-sm text-brand-gold-light font-semibold">
                    {t.nav.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-gold-light">
                {t.footer.quickLinksTitle}
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base">
                <li>
                  <a href="#accueil" className="text-white/85 hover:text-brand-gold-light transition-colors">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#medecin" className="text-white/85 hover:text-brand-gold-light transition-colors">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#soins" className="text-white/85 hover:text-brand-gold-light transition-colors">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#cabinet" className="text-white/85 hover:text-brand-gold-light transition-colors">
                    {t.nav.cabinet}
                  </a>
                </li>
                <li>
                  <a href="#avis" className="text-white/85 hover:text-brand-gold-light transition-colors">
                    {t.nav.reviews}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-gold-light">
                {t.footer.servicesTitle}
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base">
                {t.services.items.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(item.title)}
                      className="text-start text-white/85 hover:text-brand-gold-light transition-colors"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-gold-light">
                {t.footer.contactTitle}
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span>{addressText}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-gold-light shrink-0" />
                  <a
                    href={`tel:${CLINIC_INFO.phoneRaw}`}
                    dir="ltr"
                    className="font-bold hover:text-brand-gold-light transition-colors"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span>{t.hero.quickCards.hoursValue}</span>
                </li>
              </ul>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Dr. Fathi Sana"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-espresso text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={CLINIC_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Dr. Fathi Sana"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-espresso text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-sm sm:text-base text-white/75">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Cabinet Dr. Fathi Sana"
        className="fixed bottom-5 end-5 z-30 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-glass-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="text-sm">{t.footer.whatsappFloatLabel}</span>
      </a>
    </>
  );
}
