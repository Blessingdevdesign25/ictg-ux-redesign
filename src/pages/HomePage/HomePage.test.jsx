import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderAt } from '../../test/renderWithRouter.jsx';
import { SERVICES } from '../../data/services.js';

describe('HomePage', () => {
  it('has a single semantic h1 with "Welcome to" as an eyebrow, not a heading', () => {
    renderAt('/');
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Faith Tabernacle ICT Group');
    expect(screen.queryByRole('heading', { name: /welcome to/i })).toBeNull();
  });

  it('never skips a heading level', () => {
    const { container } = renderAt('/');
    const levels = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1]));
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1);
    });
  });

  it('names every section by its heading', () => {
    renderAt('/');
    for (const name of [/technology in service/i, /latest messages/i, /our core values/i, /built by ictg/i]) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
  });

  it('shows all five services in a static list (no carousel)', () => {
    renderAt('/');
    const section = screen.getByRole('region', { name: /technology in service/i });
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(SERVICES.length);
    expect(within(section).queryByRole('button')).toBeNull();
  });

  it('shows 3 latest messages and links to the full library', () => {
    renderAt('/');
    const section = screen.getByRole('region', { name: /latest messages/i });
    expect(within(section).getAllByRole('article')).toHaveLength(3);
    expect(within(section).getByRole('link', { name: /browse all messages/i })).toHaveAttribute('href', '/messages');
  });

  it('has no href="#" links and signposts every new-tab link', () => {
    const { container } = renderAt('/');
    expect(container.querySelector('a[href="#"]')).toBeNull();
    container.querySelectorAll('a[target="_blank"]').forEach((a) => {
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
      expect(a.textContent).toMatch(/\(opens in a new tab\)/);
    });
  });
});
