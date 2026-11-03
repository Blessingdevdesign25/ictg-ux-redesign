import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAt } from '../../../test/renderWithRouter.jsx';

// jsdom's matchMedia stub reports no match → the header renders in mobile mode.
describe('MobileNav (via SiteHeader)', () => {
  it('renders the primary nav exactly once', () => {
    renderAt('/');
    expect(screen.getAllByRole('navigation', { name: 'Primary', hidden: true })).toHaveLength(1);
  });

  it('opens and closes with the Menu button', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const toggle = screen.getByRole('button', { name: 'Menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: 'Primary' })).toBeNull();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const toggle = screen.getByRole('button', { name: 'Menu' });
    await user.click(toggle);
    await user.tab();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('traps focus inside the open menu', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const toggle = screen.getByRole('button', { name: 'Menu' });
    await user.click(toggle);
    // Shift+Tab from the toggle wraps to the last control in the panel (the Join CTA).
    await user.tab({ shift: true });
    expect(within(document.getElementById('site-menu')).getByRole('link', { name: /join ictg/i })).toHaveFocus();
    await user.tab();
    expect(toggle).toHaveFocus();
  });

  it('expands sub-menus as accordions and closes after navigating', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    const about = within(nav).getByRole('button', { name: 'About' });
    await user.click(about);
    expect(about).toHaveAttribute('aria-expanded', 'true');

    await user.click(within(nav).getByRole('link', { name: 'Messages' }));
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('heading', { level: 1, name: /messages library/i })).toBeInTheDocument();
  });
});
