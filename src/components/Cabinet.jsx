import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  MessageCircle,
  Instagram,
  Facebook,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { CLINIC_INFO } from '../translations.js';
import { getClinicStatus } from '../utils/clinicStatus.js';

import receptionImg from '../assets/images/reception.webp';
import waitingImg from '../assets/images/waiting-room.webp';
import treatmentImg from '../assets/images/treatment-room.webp';
import officeImg from '../assets/images/doctor-office.webp';

const CABINET_IMAGES = {
  reception: receptionImg,
  waiting: waitingImg,
  treatment: treatmentImg,
  office: officeImg,
};

export default function Cabinet() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => setStatus(getClinicStatus(lang)), 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const filteredPhotos =
    activeFilter === 'all'
      ? t.cabinet.photos
      : t.cabinet.photos.filter((p) => p.category === activeFilter);

  const addressText = lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressFr;

  return (
    <section id="cabinet" className="py-16 lg:py-24 bg-brand-ivory">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-brand-gold">
            {t.cabinet.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-espresso">
            {t.cabinet.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-taupe">{t.cabinet.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {t.cabinet.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === filter.id
                  ? 'bg-brand-espresso text-white shadow-glass'
                  : 'bg-brand-champagne text-brand-espresso hover:bg-brand-gold-soft/60 border border-brand-gold/25'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="glass-card glass-card-hover overflow-hidden">
              <div className="aspect-[4/3] bg-brand-sand overflow-hidden">
                <img
                  src={CABINET_IMAGES[photo.imageKey]}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-brand-espresso">{photo.title}</h3>
                <p className="text-sm text-brand-taupe mt-1">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 sm:p-7 space-y-5 bg-brand-champagne/70">
              <h3 className="text-xl font-extrabold text-brand-espresso">
                {t.cabinet.contactCardTitle}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-gold-soft shrink-0">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-taupe">
                      {t.cabinet.addressLabel}
                    </p>
                    <p className="text-base font-bold text-brand-espresso mt-0.5">{addressText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-gold-soft shrink-0">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-taupe">
                      {t.cabinet.phoneLabel}
                    </p>
                    <a
                      href={`tel:${CLINIC_INFO.phoneRaw}`}
                      dir="ltr"
                      className="inline-block text-base font-extrabold text-brand-espresso hover:text-brand-gold mt-0.5"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-sand flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-brand-taupe">
                    {t.cabinet.socialLabel}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href={CLINIC_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Dr. Fathi Sana"
                      className="p-2.5 rounded-full bg-white border border-brand-gold/30 text-brand-espresso hover:bg-brand-espresso hover:text-white transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={CLINIC_INFO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Dr. Fathi Sana"
                      className="p-2.5 rounded-full bg-white border border-brand-gold/30 text-brand-espresso hover:bg-brand-espresso hover:text-white transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white border border-brand-gold/40 text-brand-espresso text-sm font-bold hover:border-brand-gold transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-brand-gold" />
                  <span>{t.cabinet.directionsBtn}</span>
                </a>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.cabinet.whatsappBtn}</span>
                </a>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-7 space-y-4 bg-brand-champagne/70">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-brand-gold" />
                  <h3 className="text-xl font-extrabold text-brand-espresso">
                    {t.cabinet.hoursCardTitle}
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border ${
                    status.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  {status.isOpen ? (
                    <DoorOpen className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <DoorClosed className="w-4 h-4 text-amber-700" />
                  )}
                  <span>{status.badge}</span>
                </span>
              </div>

              <div className="divide-y divide-brand-sand">
                {t.cabinet.scheduleRows.map((row, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <span className="text-sm sm:text-base font-bold text-brand-espresso">
                      {row.days}
                    </span>
                    <span
                      dir="ltr"
                      className="text-sm sm:text-base font-semibold text-brand-taupe"
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-brand-taupe font-medium">
                {t.cabinet.closedSundayNote} • {status.detail}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card p-3 h-full min-h-[380px] flex flex-col">
              <iframe
                title="Localisation Cabinet Médical Dr. Fathi Sana Rabat"
                src={CLINIC_INFO.googleMapsEmbedUrl}
                className="w-full h-full min-h-[360px] rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
