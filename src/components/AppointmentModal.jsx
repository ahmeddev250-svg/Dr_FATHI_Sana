import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Clock, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/translations';
import { getCasablancaNow, generateTimeSlotsForDate } from '../utils/clinicStatus';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const { lang, t } = useLanguage();
  const todayStr = useMemo(() => getCasablancaNow().dateStr, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const slots = useMemo(() => generateTimeSlotsForDate(date), [date]);

  const isSunday = useMemo(() => {
    if (!date) return false;
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d).getDay() === 0;
  }, [date]);

  useEffect(() => {
    setTimeSlot('');
  }, [date]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = t.booking.errors.name;
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      nextErrors.phone = t.booking.errors.phone;
    }
    if (!service) nextErrors.service = t.booking.errors.service;
    if (!date || date < todayStr || isSunday) nextErrors.date = t.booking.errors.date;
    if (!timeSlot) nextErrors.time = t.booking.errors.time;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanNotes = notes.trim() || (lang === 'ar' ? 'لا توجد ملاحظات' : 'Aucune');

    const message =
      lang === 'ar'
        ? `مرحباً،\n\nأرغب في حجز موعد.\n\nالاسم : ${name.trim()}\nرقم الهاتف : ${phone.trim()}\nالخدمة المطلوبة : ${service}\nالتاريخ : ${date}\nالوقت : ${timeSlot}\nمدة الموعد : 30 دقيقة\nملاحظات : ${cleanNotes}\n\nشكراً، يرجى تأكيد الموعد.`
        : `Bonjour,\n\nJe souhaite prendre un rendez-vous.\n\nNom : ${name.trim()}\nTéléphone : ${phone.trim()}\nPrestation : ${service}\nDate : ${date}\nHeure : ${timeSlot}\nDurée : 30 minutes\nNotes : ${cleanNotes}\n\nMerci de me confirmer la disponibilité.`;

    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plumDark/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-[28px] shadow-2xl border border-brand-plum/15 p-6 sm:p-8 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            onClose();
          }}
          className="absolute top-5 end-5 p-2 rounded-full bg-brand-sand text-brand-plum hover:bg-brand-plum hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-plum/10 text-brand-plum text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{BUSINESS_INFO.clinicNameFr}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-plum">
            {t.booking.title}
          </h2>
          <p className="text-sm text-brand-ink/75 mt-1">{t.booking.subtitle}</p>
        </div>

        {submitted && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-900">
              <p className="font-bold">{t.booking.submittedTitle}</p>
              <p className="mt-0.5">{t.booking.submittedBody}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.booking.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:border-brand-plum text-sm"
              />
              {errors.name && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.name}</p>
              )}
            </div>

            {/* Client Phone */}
            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.phoneLabel}
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.booking.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:border-brand-plum text-sm"
              />
              {errors.phone && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.serviceLabel}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:border-brand-plum text-sm"
              >
                <option value="">{t.booking.servicePlaceholder}</option>
                {t.services.items.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.service}</p>
              )}
            </div>

            {/* Desired Date */}
            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.dateLabel}
              </label>
              <input
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:border-brand-plum text-sm"
              />
              {errors.date && (
                <p className="text-xs text-red-600 font-semibold mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          {/* 30-Minute Time Slots */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-brand-ink mb-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              <span>{t.booking.timeLabel}</span>
            </label>

            {isSunday ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
                {t.booking.closedDayNotice}
              </div>
            ) : slots.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
                {t.booking.noSlotsNotice}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                {slots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => setTimeSlot(slot.value)}
                    dir="ltr"
                    className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      slot.disabled
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                        : timeSlot === slot.value
                        ? 'bg-brand-plum text-white border-brand-plum shadow-sm'
                        : 'bg-brand-sand/50 text-brand-ink border-brand-plum/15 hover:border-brand-plum'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            )}
            {errors.time && (
              <p className="text-xs text-red-600 font-semibold mt-1">{errors.time}</p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-bold text-brand-ink mb-1.5">
              {t.booking.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.booking.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:border-brand-plum text-sm"
            />
          </div>

          {/* Pending Confirmation Disclaimer */}
          <div className="p-3.5 rounded-xl bg-brand-sand/70 border border-brand-gold/30 flex items-start gap-2.5 text-xs text-brand-ink/80">
            <AlertCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
            <span>{t.booking.pendingNotice}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-brand-plum hover:bg-brand-plumDark text-white font-bold text-base shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
            <span>{t.booking.submitBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
