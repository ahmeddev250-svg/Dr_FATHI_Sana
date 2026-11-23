// Schedule for Cabinet Médical Dr. FATHI Sana (Timezone: Africa/Casablanca)
// Monday - Friday: 10:00 - 18:30 (continuous)
// Saturday: 10:00 - 14:00
// Sunday: Closed

export const CLINIC_SCHEDULE = {
  1: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10h00 – 18h30', labelAr: '10:00 – 18:30' },
  2: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10h00 – 18h30', labelAr: '10:00 – 18:30' },
  3: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10h00 – 18h30', labelAr: '10:00 – 18:30' },
  4: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10h00 – 18h30', labelAr: '10:00 – 18:30' },
  5: { open: 10 * 60, close: 18 * 60 + 30, labelFr: '10h00 – 18h30', labelAr: '10:00 – 18:30' },
  6: { open: 10 * 60, close: 14 * 60, labelFr: '10h00 – 14h00', labelAr: '10:00 – 14:00' },
  0: null,
};

const DAY_NAMES = {
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};

export function getCasablancaNow() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Casablanca',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const map = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = weekdayMap[map.weekday] ?? now.getDay();
  const hour = parseInt(map.hour === '24' ? '0' : map.hour, 10);
  const minute = parseInt(map.minute, 10);
  const minutesSinceMidnight = hour * 60 + minute;
  const dateStr = `${map.year}-${map.month}-${map.day}`;

  return { dayOfWeek, hour, minute, minutesSinceMidnight, dateStr };
}

function formatMinutes(totalMins) {
  const h = String(Math.floor(totalMins / 60)).padStart(2, '0');
  const m = String(totalMins % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export function getClinicStatus(lang = 'fr') {
  const { dayOfWeek, minutesSinceMidnight } = getCasablancaNow();
  const todaySched = CLINIC_SCHEDULE[dayOfWeek];

  if (todaySched && minutesSinceMidnight >= todaySched.open && minutesSinceMidnight < todaySched.close) {
    const closeTime = formatMinutes(todaySched.close);
    return {
      isOpen: true,
      badge: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert maintenant',
      detail: lang === 'ar' ? `يغلق على الساعة ${closeTime}` : `Ferme à ${closeTime}`,
    };
  }

  if (todaySched && minutesSinceMidnight < todaySched.open) {
    const openTime = formatMinutes(todaySched.open);
    return {
      isOpen: false,
      badge: lang === 'ar' ? 'مغلق حالياً' : 'Fermé actuellement',
      detail: lang === 'ar' ? `يفتح اليوم على ${openTime}` : `Ouvre aujourd'hui à ${openTime}`,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (dayOfWeek + offset) % 7;
    const sched = CLINIC_SCHEDULE[nextDay];
    if (sched) {
      const openTime = formatMinutes(sched.open);
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
            ? `يفتح ${dayLabel} على ${openTime}`
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

export function generateTimeSlotsForDate(dateStr) {
  if (!dateStr) return [];
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const dayOfWeek = dateObj.getDay();
  const sched = CLINIC_SCHEDULE[dayOfWeek];

  if (!sched) return [];

  const { dateStr: todayStr, minutesSinceMidnight } = getCasablancaNow();
  const isToday = dateStr === todayStr;

  const slots = [];
  for (let start = sched.open; start + 30 <= sched.close; start += 30) {
    const end = start + 30;
    const label = `${formatMinutes(start)} – ${formatMinutes(end)}`;
    const disabled = isToday && start <= minutesSinceMidnight + 15;
    slots.push({
      value: label,
      label,
      disabled,
    });
  }
  return slots;
}
