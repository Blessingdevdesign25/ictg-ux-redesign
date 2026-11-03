import { describe, it, expect } from 'vitest';
import { splitHighlight } from './highlight.js';

describe('splitHighlight', () => {
  it('returns the whole string when there is no query', () => {
    expect(splitHighlight('Covenant Day', '')).toEqual([{ text: 'Covenant Day', match: false }]);
  });

  it('marks case-insensitive matches for every term', () => {
    expect(splitHighlight('Covenant Day of Settlement', 'covenant settle')).toEqual([
      { text: 'Covenant', match: true },
      { text: ' Day of ', match: false },
      { text: 'Settle', match: true },
      { text: 'ment', match: false },
    ]);
  });

  it('escapes regex metacharacters in user input', () => {
    expect(() => splitHighlight('Faith (A+)', 'a+( [')).not.toThrow();
    expect(splitHighlight('Faith (A+)', '(a+)')).toEqual([
      { text: 'Faith ', match: false },
      { text: '(A+)', match: true },
    ]);
  });
});
