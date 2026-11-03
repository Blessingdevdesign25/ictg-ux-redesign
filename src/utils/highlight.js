import { escapeRegExp } from './filterMessages.js';

/**
 * Split `text` into segments marking case-insensitive matches of any search term.
 * Terms are regex-escaped, so user input like "a+(b" is safe.
 * → [{ text: 'Covenant', match: true }, { text: ' Day', match: false }]
 */
export function splitHighlight(text, query) {
  const source = String(text ?? '');
  const terms = String(query ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (terms.length === 0 || source === '') return [{ text: source, match: false }];

  const re = new RegExp(`(${terms.join('|')})`, 'gi');
  return source
    .split(re)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, match: terms.some((t) => new RegExp(`^${t}$`, 'i').test(part)) }));
}
