import { describe, it, expect } from 'vitest';
import { filterEvents } from './filterEvents.js';
import { buildIcs, escapeIcsText, icsFileName, toIcsDate } from './ics.js';

const NOW = new Date('2026-11-02T12:00:00+01:00');
const EVENTS = [
  { id: 'a', title: 'Workshop', type: 'Training', start: '2026-11-14T10:00:00+01:00', location: 'Hub' },
  { id: 'b', title: 'Meeting', type: 'Meeting', start: '2026-11-08T16:00:00+01:00', location: 'Online' },
  { id: 'c', title: 'Old training', type: 'Training', start: '2026-10-17T10:00:00+01:00', location: 'Hub' },
  { id: 'd', title: 'Stream support', type: 'Service support', start: '2026-11-01T06:00:00+01:00', location: 'FT' },
];

describe('filterEvents', () => {
  it('splits upcoming (soonest first) and past (most recent first)', () => {
    expect(filterEvents(EVENTS, { when: 'upcoming', now: NOW }).map((e) => e.id)).toEqual(['b', 'a']);
    expect(filterEvents(EVENTS, { when: 'past', now: NOW }).map((e) => e.id)).toEqual(['d', 'c']);
  });
  it('filters by one or more types', () => {
    expect(filterEvents(EVENTS, { when: 'upcoming', types: ['Training'], now: NOW }).map((e) => e.id)).toEqual(['a']);
    expect(filterEvents(EVENTS, { when: 'past', types: ['Training', 'Service support'], now: NOW })).toHaveLength(2);
    expect(filterEvents(EVENTS, { when: 'upcoming', types: ['Outreach'], now: NOW })).toEqual([]);
  });
});

describe('ics', () => {
  it('formats UTC timestamps', () => {
    expect(toIcsDate('2026-11-14T10:00:00+01:00')).toBe('20261114T090000Z');
  });
  it('escapes RFC 5545 special characters', () => {
    expect(escapeIcsText('A, B; C\\D\nE')).toBe('A\\, B\\; C\\\\D\\nE');
  });
  it('builds a valid single-event calendar with a 2h default duration', () => {
    const ics = buildIcs(EVENTS[0], { now: NOW });
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics).toContain('DTSTART:20261114T090000Z');
    expect(ics).toContain('DTEND:20261114T110000Z');
    expect(ics).toContain('SUMMARY:Workshop');
    expect(ics.endsWith('END:VCALENDAR')).toBe(true);
  });
  it('makes a safe file name', () => {
    expect(icsFileName({ title: 'Digital skills outreach — Ota schools' })).toBe('digital-skills-outreach-ota-schools.ics');
  });
});
