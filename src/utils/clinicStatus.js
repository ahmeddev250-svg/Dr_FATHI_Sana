/**
 * Real-time Open / Closed status & 30-minute appointment slot generator
 * Synchronized with Africa/Casablanca timezone for Cabinet Médical Dr. Fathi Sana
 * Schedule:
 * - Monday to Friday (1..5): 10:00 – 18:30 (continuous)
 * - Saturday (6): 10:00 – 13:30
 * - Sunday (0): Closed
 */

export const CLINIC_TIMEZONE = 'Africa/Casablanca';

export const WEEKLY_HOURS = {
  0: null, // Sunday: Closed
  1: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10:00 – 18:30', labelAr: '10:00 – 18:30' },
  2: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10:00 – 18:30', labelAr: '10:00 – 18:30' },
  3: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10:00 – 18:30', labelAr: '10:00 – 18:30' },
  4: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10:00 – 18:30', labelAr: '10:00 – 18:30' },
  5: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10:00 – 18:30', labelAr: '10:00 – 18:30' },
  6: { open: 10 * 60, close: 13 * 60 + 30, labelFr: '10:00 – 13:30', labelAr: '10:00 – 13:30' },
};

const DAY_NAMES = {
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};

export function getCasablancaNow(referenceDate = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(referenceDate);
  const map = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = weekdayMap[map.weekday] ?? referenceDate.getDay();
  const hour = parseInt(map.hour, 10) % 24;
  const minute = parseInt(map.minute, 10);
  const dateStr = `${map.year}-${map.month}-${map.day}`;

  return {
    dayOfWeek,
    hour,
    minute,
    totalMinutes: hour * 60 + minute,
    dateStr,
  };
}

function formatMinutes(totalMins) {
  const h = String(Math.floor(totalMins / 60)).padStart(2, '0');
  const m = String(totalMins % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export function getClinicStatus(lang = 'fr', referenceDate = new Date()) {
  const now = getCasablancaNow(referenceDate);
  const todayHours = WEEKLY_HOURS[now.dayOfWeek];

  if (todayHours && now.totalMinutes >= todayHours.open && now.totalMinutes < todayHours.close) {
    const closeTime = formatMinutes(todayHours.close);
    return {
      isOpen: true,
      badge: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert maintenant',
      detail:
        lang === 'ar'
          ? `يغلق اليوم على الساعة ${closeTime}`
          : `Ferme aujourd'hui à ${closeTime}`,
    };
  }

  // Closed right now: determine when it next opens
  if (todayHours && now.totalMinutes < todayHours.open) {
    const openTime = formatMinutes(todayHours.open);
    return {
      isOpen: false,
      badge: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
      detail:
        lang === 'ar'
          ? `يفتح اليوم على الساعة ${openTime}`
          : `Ouvre aujourd'hui à ${openTime}`,
    };
  }

  // Find next open day
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (now.dayOfWeek + offset) % 7;
    const nextHours = WEEKLY_HOURS[nextDay];
    if (nextHours) {
      const openTime = formatMinutes(nextHours.open);
      const dayLabel =
        offset === 1
          ? lang === 'ar'
            ? 'غداً'
            : 'demain'
          : DAY_NAMES[lang][nextDay];
      return {
        isOpen: false,
        badge: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
        detail:
          lang === 'ar'
            ? `يفتح ${dayLabel} على الساعة ${openTime}`
            : `Ouvre ${dayLabel} à ${openTime}`,
      };
    }
  }

  return {
    isOpen: false,
    badge: lang === 'ar' ? 'مغلق' : 'Fermé',
    detail: '',
  };
}

/**
 * Generate fixed 30-minute appointment slots for a given YYYY-MM-DD date string.
 * Disables slots that have already passed when dateStr === today in Africa/Casablanca.
 */
export function generateThirtyMinuteSlots(dateStr, referenceDate = new Date()) {
  if (!dateStr) return [];

  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return [];

  // Create UTC noon date to safely determine weekday without DST drift
  const utcDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dayOfWeek = utcDate.getUTCDay();
  const schedule = WEEKLY_HOURS[dayOfWeek];

  if (!schedule) {
    return [];
  }

  const now = getCasablancaNow(referenceDate);
  const isToday = dateStr === now.dateStr;
  const isPastDate = dateStr < now.dateStr;

  if (isPastDate) {
    return [];
  }

  const slots = [];
  for (let start = schedule.open; start + 30 <= schedule.close; start += 30) {
    const end = start + 30;
    const startStr = formatMinutes(start);
    const endStr = formatMinutes(end);
    const label = `${startStr} – ${endStr}`;
    // Require at least 15 minutes lead time for same-day slots
    const disabled = isToday && start <= now.totalMinutes + 15;

    slots.push({
      id: startStr,
      start: startStr,
      end: endStr,
      label,
      disabled,
    });
  }

  return slots;
}
