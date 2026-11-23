import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Instagram,
  Facebook,
  DoorOpen,
  DoorClosed,
  Building2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/translations';
import { getClinicStatus } from '../utils/clinicStatus';

import receptionImg from '../assets/images/reception.webp';
import waitingImg from '../assets/images/waiting-room.webp';
import consultationImg from '../assets/images/consultation-room.webp';
import officeImg from '../assets/images/doctor-office.webp';

const GALLERY_IMAGES = {
  reception: receptionImg,
  waiting: waitingImg,
  consultation: consultationImg,
  office: officeImg,
};

export default function Cabinet() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => {
      setStatus(getClinicStatus(lang));
    }, 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const filteredGallery = t.cabinet.gallery.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section id="cabinet" className="py-20 sm:py-28 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-sm font-bold">
            <Building2 className="w-4 h-4" />
            <span>{t.cabinet.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum">
            {t.cabinet.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-ink/75">
            {t.cabinet.subtitle}
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'all', label: t.cabinet.filters.all },
            { id: 'spaces', label: t.cabinet.filters.spaces },
            { id: 'medical', label: t.cabinet.filters.medical },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === tab.id
                  ? 'bg-brand-plum text-white shadow-md'
                  : 'bg-brand-sand text-brand-ink/80 hover:text-brand-plum'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Authentic Spaces & Equipment Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredGallery.map((item) => (
            <div
              key={item.key}
              className="group relative rounded-[22px] overflow-hidden shadow-md border border-brand-plum/10 bg-brand-sand h-72"
            >
              <img
                src={GALLERY_IMAGES[item.key]}
                alt={item.labelFr}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-plumDark/90 via-brand-plumDark/45 to-transparent p-4">
                <p className="text-white font-bold text-sm sm:text-base">{item.labelFr}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coordonnées, Hours & Interactive Google Map */}
        <div id="contact" className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-plum">
                  {t.cabinet.infoTitle}
                </h3>

                {/* Live Open/Closed Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${
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

              {/* Street Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-plum/10 text-brand-plum flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {t.cabinet.addressLabel}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-brand-ink mt-1">
                    {lang === 'ar' ? BUSINESS_INFO.addressAr : BUSINESS_INFO.addressFr}
                  </p>
                  <p className="text-xs sm:text-sm text-brand-ink/70 mt-1">
                    {t.cabinet.landmarkNote}
                  </p>
                </div>
              </div>

              {/* Unified Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-plum/10 text-brand-plum flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {t.cabinet.phoneLabel}
                  </p>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    dir="ltr"
                    className="inline-block text-base sm:text-lg font-extrabold text-brand-plum hover:underline mt-1"
                  >
                    +212 6 70 70 93 83
                  </a>
                </div>
              </div>

              {/* Operating Hours (Active Open Days) */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-plum/10 text-brand-plum flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-2">
                    {t.cabinet.hoursTitle}
                  </p>
                  <div className="space-y-1.5">
                    {t.cabinet.hoursRows.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm sm:text-base border-b border-brand-plum/10 pb-1.5 last:border-b-0"
                      >
                        <span className="font-semibold text-brand-ink">{row.days}</span>
                        <span className="font-bold text-brand-plum">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instagram & Facebook Icons inside Coordonnées */}
              <div className="pt-2 border-t border-brand-plum/10 flex items-center justify-between">
                <span className="text-sm font-bold text-brand-ink/80">
                  {t.cabinet.socialLabel}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Dr. FATHI Sana"
                    className="w-10 h-10 rounded-full bg-brand-plum/10 text-brand-plum hover:bg-brand-plum hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={BUSINESS_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Dr. FATHI Sana"
                    className="w-10 h-10 rounded-full bg-brand-plum/10 text-brand-plum hover:bg-brand-plum hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-plum text-white hover:bg-brand-plumDark font-bold text-sm shadow-md transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.cabinet.openMapsBtn}</span>
            </a>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7 rounded-[24px] overflow-hidden shadow-lg border border-brand-plum/15 min-h-[380px]">
            <iframe
              title="Localisation Cabinet Médical Dr. FATHI Sana Rabat"
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
