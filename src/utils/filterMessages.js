/**
 * Pure search / filter / sort logic for the Messages Library.
 * UI must call `applyFilters` — never re-implement filtering in components.
 */

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'Title A–Z' },
];

export const DEFAULT_FILTERS = Object.freeze({
  q: '',
  speaker: '',
  category: '',
  year: '',
  sort: 'newest',
});

/** Lowercase, strip diacritics, collapse whitespace. */
export function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function getYear(isoDate) {
  return String(isoDate).slice(0, 4);
}

/** Every whitespace-separated term must appear in title, speaker, category, description or tags. */
export function matchesQuery(message, query) {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalize(
    [message.title, message.speaker, message.category, message.description, ...(message.tags ?? [])].join(' '),
  );
  return terms.every((term) => haystack.includes(term));
}

export function sortMessages(messages, sort = 'newest') {
  const copy = [...messages];
  switch (sort) {
    case 'oldest':
      return copy.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
    case 'az':
      return copy.sort((a, b) => a.title.localeCompare(b.title) || b.date.localeCompare(a.date));
    case 'newest':
    default:
      return copy.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  }
}

export function applyFilters(messages, filters = DEFAULT_FILTERS) {
  const f = { ...DEFAULT_FILTERS, ...filters };
  const filtered = messages.filter(
    (m) =>
      matchesQuery(m, f.q) &&
      (!f.speaker || m.speaker === f.speaker) &&
      (!f.category || m.category === f.category) &&
      (!f.year || getYear(m.date) === f.year),
  );
  return sortMessages(filtered, f.sort);
}

/** Distinct, sorted option lists derived from data (years newest first). */
export function getFilterOptions(messages) {
  const uniq = (arr) => [...new Set(arr)];
  return {
    speakers: uniq(messages.map((m) => m.speaker)).sort((a, b) => a.localeCompare(b)),
    categories: uniq(messages.map((m) => m.category)).sort((a, b) => a.localeCompare(b)),
    years: uniq(messages.map((m) => getYear(m.date))).sort((a, b) => b.localeCompare(a)),
  };
}

/** Number of active (non-default) filters, excluding sort. Used for the "Filters (n)" button. */
export function countActiveFilters(filters) {
  return ['q', 'speaker', 'category', 'year'].filter((k) => Boolean(filters?.[k])).length;
}

/** Escape a user string for safe use inside a RegExp (for <mark> highlighting). */
export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
