import { describe, it, expect } from 'vitest';
import { axe } from './axe.js';
import { renderAt } from './renderWithRouter.jsx';

describe.each(['/', '/messages', '/messages?q=zzzz', '/activities'])('accessibility: %s', (url) => {
  it('has no axe violations', async () => {
    const { container } = renderAt(url);
    expect(await axe(container)).toHaveNoViolations();
  }, 20000);

  it('has exactly one h1', () => {
    const { container } = renderAt(url);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
  });
});
