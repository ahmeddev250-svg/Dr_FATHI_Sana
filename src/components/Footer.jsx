import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/translations';
import logoImg from '../assets/images/logo.png';

export default function Footer({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const whatsappHref = `https://wa.me/${BUSINESS_INFO.whatsappNumber}`;

  return (
    <>
      <footer className="bg-brand-plum text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-brand-cream p-2 flex items-center justify-center shrink-0 shadow-md">
                  <img
                    src={logoImg}
                    alt={BUSINESS_INFO.clinicNameFr}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {t.brandTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-brand-goldLight font-medium">
                    {t.brandSubtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
                {t.footer.description}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-plumDark text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-plumDark text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-brand-goldLight">
                {t.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <a href="#accueil" className="text-white/85 hover:text-white transition-colors">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#docteur" className="text-white/85 hover:text-white transition-colors">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#soins" className="text-white/85 hover:text-white transition-colors">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#cabinet" className="text-white/85 hover:text-white transition-colors">
                    {t.nav.cabinet}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenBooking('')}
                    className="text-brand-goldLight hover:underline font-bold"
                  >
                    {t.nav.bookBtn}
                  </button>
                </li>
              </ul>
            </div>

            {/* Coordonnées Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-brand-goldLight">
                {t.footer.contactTitle}
              </h4>
              <ul className="space-y-4 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-goldLight shrink-0 mt-1" />
                  <span className="text-white/90">
                    {lang === 'ar' ? BUSINESS_INFO.addressAr : BUSINESS_INFO.addressFr}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-goldLight shrink-0" />
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    dir="ltr"
                    className="text-white font-bold hover:text-brand-goldLight transition-colors"
                  >
                    +212 6 70 70 93 83
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-goldLight shrink-0 mt-1" />
                  <span className="text-white/85">{t.footer.hoursLabel}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/75">
            <p>
              © {new Date().getFullYear()} {BUSINESS_INFO.clinicNameFr}. {t.footer.rights}
            </p>
            <p className="text-brand-goldLight font-medium">Agdal • Rabat, Maroc</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Direct Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.footer.whatsappFloat}
        className="fixed bottom-6 end-6 z-40 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">{t.footer.whatsappFloat}</span>
      </a>
    </>
  );
}
