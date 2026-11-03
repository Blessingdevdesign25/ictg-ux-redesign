import { describe, it, expect } from 'vitest';
import { formatDate, formatDuration } from './formatDate.js';

describe('formatDate', () => {
  it('formats ISO dates as en-GB short dates without timezone shift', () => {
    expect(formatDate('2026-01-04')).toBe('4 Jan 2026');
    expect(formatDate('2025-12-28')).toBe('28 Dec 2025');
  });
  it('returns empty string for invalid input', () => {
    expect(formatDate('not-a-date')).toBe('');
  });
});

describe('formatDuration', () => {
  it('formats minutes as hours and minutes', () => {
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(60)).toBe('1 hr');
    expect(formatDuration(74)).toBe('1 hr 14 min');
  });
});
