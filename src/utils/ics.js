export const DEFAULT_EVENT_HOURS = 2;

const pad = (n) => String(n).padStart(2, '0');

/** Date → iCalendar UTC timestamp, e.g. 20261114T090000Z */
export function toIcsDate(date) {
  const d = new Date(date);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

/** Escape text per RFC 5545 (backslash, semicolon, comma, newline). */
export function escapeIcsText(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** Build a single-event .ics file body. Events have no end time in the data → assume DEFAULT_EVENT_HOURS. */
export function buildIcs(event, { now = new Date() } = {}) {
  const start = new Date(event.start);
  const end = new Date(start.getTime() + DEFAULT_EVENT_HOURS * 60 * 60 * 1000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Faith Tabernacle ICTG//Activities prototype//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@ictg-prototype`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `CATEGORIES:${escapeIcsText(event.type)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function icsFileName(event) {
  return `${String(event.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.ics`;
}

/** Trigger a client-side download of the event as .ics (Blob, no server). */
export function downloadIcs(event) {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = icsFileName(event);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
