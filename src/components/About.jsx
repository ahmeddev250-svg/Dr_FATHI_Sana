import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import doctorOfficeImg from '../assets/images/doctor-office.webp';

export default function About() {
  const { t } = useLanguage();
  const pillarIcons = [Sparkles, ShieldCheck, HeartHandshake];

  return (
    <section id="medecin" className="py-16 lg:py-24 bg-brand-ivory">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="glass-card p-3 sm:p-4 max-w-lg mx-auto">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-brand-sand">
                <img
                  src={doctorOfficeImg}
                  alt={t.hero.doctorCardTitle}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="inline-block text-sm font-bold uppercase tracking-wider text-brand-gold">
              {t.about.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-espresso leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg text-brand-taupe leading-relaxed">{t.about.p1}</p>
            <p className="text-base sm:text-lg text-brand-taupe leading-relaxed">{t.about.p2}</p>

            <div className="glass-card p-6 bg-brand-champagne/75 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-espresso font-bold text-base sm:text-lg">
                <Award className="w-5 h-5 text-brand-gold shrink-0" />
                <h3>{t.about.credentialsTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {t.about.credentials.map((cred, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-brand-espresso/90"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {t.about.pillars.map((pillar, idx) => {
                const Icon = pillarIcons[idx % pillarIcons.length];
                return (
                  <div key={idx} className="glass-card p-5 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold-soft flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <h3 className="text-base font-bold text-brand-espresso">{pillar.title}</h3>
                    <p className="text-sm text-brand-taupe leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
