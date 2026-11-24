import React, { useState, useEffect, useMemo } from 'react';
import { X, Clock, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import { CLINIC_INFO } from '../translations.js';
import { getCasablancaNow, generateThirtyMinuteSlots } from '../utils/clinicStatus.js';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const { lang, t } = useLanguage();
  const todayStr = useMemo(() => getCasablancaNow().dateStr, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setService(initialService || t.modal.serviceDefault);
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen, initialService, t.modal.serviceDefault]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const slots = useMemo(() => generateThirtyMinuteSlots(date), [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedSlot('');
    if (errors.date || errors.time) {
      setErrors((prev) => ({ ...prev, date: '', time: '' }));
    }
  };

  if (!isOpen) return null;

  const isSunday = date ? new Date(`${date}T12:00:00Z`).getUTCDay() === 0 : false;

  const validate = () => {
    const nextErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = t.modal.errors.name;
    }
    const cleanPhone = phone.replace(/[\s\-().]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      nextErrors.phone = t.modal.errors.phone;
    }
    if (!date || date < todayStr) {
      nextErrors.date = t.modal.errors.date;
    }
    if (!selectedSlot) {
      nextErrors.time = t.modal.errors.time;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const notesText = notes.trim() || (lang === 'ar' ? 'لا توجد' : 'Aucune');
    const chosenService = service || t.modal.serviceDefault;

    const message =
      lang === 'ar'
        ? `مرحباً،\n\nأرغب في حجز موعد.\n\nالاسم : ${name.trim()}\nرقم الهاتف : ${phone.trim()}\nالخدمة المطلوبة : ${chosenService}\nالتاريخ : ${date}\nالوقت : ${selectedSlot}\nمدة الموعد : 30 دقيقة\nملاحظات : ${notesText}\n\nشكراً، يرجى تأكيد الموعد.`
        : `Bonjour,\n\nJe souhaite prendre un rendez-vous.\n\nNom : ${name.trim()}\nTéléphone : ${phone.trim()}\nPrestation : ${chosenService}\nDate : ${date}\nHeure : ${selectedSlot}\nDurée : 30 minutes\nNotes : ${notesText}\n\nMerci de me confirmer la disponibilité.`;

    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const serviceOptions = [t.modal.serviceDefault, ...t.services.items.map((item) => item.title)];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-brand-espresso-deep/65 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl bg-brand-ivory border border-brand-gold/35 shadow-glass-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-brand-espresso text-white border-b border-brand-gold/30 shrink-0">
          <div>
            <h2 id="appointment-modal-title" className="text-lg sm:text-xl font-extrabold">
              {t.modal.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-gold-light font-medium">
              {t.modal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.modal.closeBtn}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
            <span>{t.modal.closeBtn}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{t.modal.successBanner}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder={t.modal.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-sand focus:border-brand-gold focus:outline-none text-sm sm:text-base text-brand-espresso"
              />
              {errors.name && (
                <p className="text-xs font-semibold text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.phoneLabel}
              </label>
              <input
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                placeholder={t.modal.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-sand focus:border-brand-gold focus:outline-none text-sm sm:text-base text-brand-espresso"
              />
              {errors.phone && (
                <p className="text-xs font-semibold text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.serviceLabel}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-sand focus:border-brand-gold focus:outline-none text-sm sm:text-base text-brand-espresso"
              >
                {serviceOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-espresso mb-1.5">
                {t.modal.dateLabel}
              </label>
              <input
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-brand-sand focus:border-brand-gold focus:outline-none text-sm sm:text-base text-brand-espresso"
              />
              {errors.date && (
                <p className="text-xs font-semibold text-red-600 mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-sm font-bold text-brand-espresso">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>{t.modal.timeLabel}</span>
              </label>
            </div>

            {isSunday ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>{t.modal.noSlotsClosed}</span>
              </div>
            ) : slots.length === 0 || slots.every((s) => s.disabled) ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>{t.modal.noSlotsToday}</span>
              </div>
            ) : (
              <div
                dir="ltr"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1"
              >
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.label;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.disabled}
                      onClick={() => {
                        setSelectedSlot(slot.label);
                        if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        slot.disabled
                          ? 'bg-brand-sand/40 text-brand-taupe/45 border-brand-sand cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-brand-espresso text-white border-brand-espresso shadow-sm'
                          : 'bg-white text-brand-espresso border-brand-sand hover:border-brand-gold'
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.time && (
              <p className="text-xs font-semibold text-red-600 mt-1.5">{errors.time}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-espresso mb-1.5">
              {t.modal.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.modal.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-sand focus:border-brand-gold focus:outline-none text-sm text-brand-espresso"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-brand-gold-soft/70 border border-brand-gold/30 text-xs sm:text-sm text-brand-espresso/90 leading-relaxed">
            {t.modal.pendingNotice}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-brand-sand">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-brand-sand hover:border-brand-espresso text-brand-espresso text-sm font-bold transition-colors"
            >
              {t.modal.cancelBtn}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-glass transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.modal.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
