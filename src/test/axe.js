import { configureAxe } from 'vitest-axe';

/**
 * axe configured for jsdom. Colour contrast can't be computed in jsdom (no layout/canvas),
 * so it's disabled HERE ONLY — verify contrast in a real browser (axe DevTools / Lighthouse).
 */
export const axe = configureAxe({
  rules: {
    'color-contrast': { enabled: false },
  },
});
