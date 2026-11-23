import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import doctorOfficeImg from '../assets/images/doctor-office.webp';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="docteur" className="py-20 sm:py-28 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Authentic Doctor Office Photo with Diplomas Wall */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[28px] overflow-hidden shadow-xl border border-brand-plum/10">
              <img
                src={doctorOfficeImg}
                alt="Dr. FATHI Sana au cabinet médical"
                loading="lazy"
                className="w-full h-[440px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 glass-card p-4">
                <p className="text-xs sm:text-sm italic font-medium text-brand-plum leading-relaxed">
                  {t.about.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative & Academic Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-plum/10 text-brand-plum text-sm font-bold">
              <Award className="w-4 h-4" />
              <span>{t.about.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-plum leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-base sm:text-lg text-brand-ink/80 leading-relaxed">
              {t.about.p2}
            </p>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-bold text-brand-plum">
                {t.about.credentialsTitle}
              </h3>
              <ul className="space-y-3">
                {t.about.credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-brand-ink/85 font-medium">
                      {cred}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
