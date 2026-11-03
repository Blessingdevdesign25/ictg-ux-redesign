import { describe, it, expect } from 'vitest';
import {
  applyFilters,
  countActiveFilters,
  escapeRegExp,
  getFilterOptions,
  matchesQuery,
  normalize,
  sortMessages,
} from './filterMessages.js';
import { parseFilters, serializeFilters } from './queryParams.js';

const DATA = [
  { id: '1', title: 'Covenant Day of Settlement', speaker: 'Speaker A', category: 'Covenant Day', date: '2026-01-04', description: 'answered prayers', tags: ['covenant'] },
  { id: '2', title: 'Healing Miracle Service', speaker: 'Speaker A', category: 'Healing', date: '2026-01-18', description: 'ministration', tags: ['healing'] },
  { id: '3', title: 'Family Life Service', speaker: 'Speaker B', category: 'Fellowship', date: '2025-10-19', description: 'marriage and parenting', tags: ['family'] },
  { id: '4', title: 'Ánnual Thanksgiving', speaker: 'Speaker A', category: 'Special', date: '2025-06-29', description: '', tags: [] },
];

describe('normalize / matchesQuery', () => {
  it('lowercases, strips accents and collapses whitespace', () => {
    expect(normalize('  Ánnual   THANKS ')).toBe('annual thanks');
  });
  it('matches across title, description and tags; all terms required', () => {
    expect(matchesQuery(DATA[2], 'parenting')).toBe(true);
    expect(matchesQuery(DATA[2], 'family marriage')).toBe(true);
    expect(matchesQuery(DATA[2], 'family healing')).toBe(false);
    expect(matchesQuery(DATA[3], 'annual')).toBe(true);
  });
  it('empty query matches everything', () => {
    expect(matchesQuery(DATA[0], '   ')).toBe(true);
  });
});

describe('applyFilters', () => {
  it('filters by speaker, category and year, combined with search', () => {
    expect(applyFilters(DATA, { speaker: 'Speaker B' }).map((m) => m.id)).toEqual(['3']);
    expect(applyFilters(DATA, { category: 'Healing' }).map((m) => m.id)).toEqual(['2']);
    expect(applyFilters(DATA, { year: '2025' }).map((m) => m.id)).toEqual(['3', '4']);
    expect(applyFilters(DATA, { speaker: 'Speaker A', q: 'service' }).map((m) => m.id)).toEqual(['2']);
  });
  it('returns empty array when nothing matches', () => {
    expect(applyFilters(DATA, { q: 'zzzz' })).toEqual([]);
  });
  it('does not mutate input', () => {
    const before = DATA.map((m) => m.id);
    applyFilters(DATA, { sort: 'az' });
    expect(DATA.map((m) => m.id)).toEqual(before);
  });
});

describe('sortMessages', () => {
  it('sorts newest, oldest and A–Z', () => {
    expect(sortMessages(DATA, 'newest').map((m) => m.id)).toEqual(['2', '1', '3', '4']);
    expect(sortMessages(DATA, 'oldest').map((m) => m.id)).toEqual(['4', '3', '1', '2']);
    expect(sortMessages(DATA, 'az').map((m) => m.id)).toEqual(['4', '1', '3', '2']);
  });
});

describe('getFilterOptions / countActiveFilters / escapeRegExp', () => {
  it('derives distinct sorted options', () => {
    const opts = getFilterOptions(DATA);
    expect(opts.speakers).toEqual(['Speaker A', 'Speaker B']);
    expect(opts.years).toEqual(['2026', '2025']);
    expect(opts.categories).toContain('Healing');
  });
  it('counts active filters excluding sort', () => {
    expect(countActiveFilters({ q: 'x', speaker: '', category: 'Healing', year: '', sort: 'az' })).toBe(2);
  });
  it('escapes regex metacharacters', () => {
    expect(new RegExp(escapeRegExp('a+b(c)')).test('a+b(c)')).toBe(true);
  });
});

describe('query params', () => {
  it('round-trips and omits defaults', () => {
    const filters = { q: 'grace', speaker: '', category: 'Healing', year: '2026', sort: 'newest' };
    const params = serializeFilters(filters);
    expect(params.toString()).toBe('q=grace&category=Healing&year=2026');
    expect(parseFilters(params)).toEqual(filters);
  });
  it('falls back on invalid sort', () => {
    expect(parseFilters('?sort=random').sort).toBe('newest');
  });
});
