const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** '2026-01-04' → '4 Jan 2026'. Date-only ISO strings are parsed as local dates (no TZ shift). */
export function formatDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  const date = match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return DATE_FORMAT.format(date);
}

/** 74 → '1 hr 14 min', 45 → '45 min'. */
export function formatDuration(minutes) {
  const m = Math.max(0, Math.round(Number(minutes) || 0));
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h === 0) return `${rest} min`;
  return rest === 0 ? `${h} hr` : `${h} hr ${rest} min`;
}
