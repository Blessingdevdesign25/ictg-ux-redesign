import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../../test/renderWithRouter.jsx';
import NavDropdown from './NavDropdown.jsx';

const items = [
  { label: 'About us', href: 'https://example.com/about', external: true },
  { label: 'Messages', to: '/messages' },
];

function setup() {
  renderWithRouter(
    <>
      <nav aria-label="Primary">
        <ul>
          <NavDropdown label="About" items={items} />
        </ul>
      </nav>
      <button type="button">Outside</button>
    </>,
  );
  return screen.getByRole('button', { name: 'About' });
}

describe('NavDropdown', () => {
  it('is a disclosure button, never an href="#" link', () => {
    const trigger = setup();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
    expect(document.querySelector('a[href="#"]')).toBeNull();
  });

  it('toggles aria-expanded and shows links on click', async () => {
    const user = userEvent.setup();
    const trigger = setup();
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /about us/i })).toBeVisible();
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens with Enter and Space from the keyboard', async () => {
    const user = userEvent.setup();
    const trigger = setup();
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    const trigger = setup();
    await user.click(trigger);
    await user.tab();
    expect(screen.getByRole('link', { name: /about us/i })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('closes on outside click', async () => {
    const user = userEvent.setup();
    const trigger = setup();
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks external items with new-tab signposting', async () => {
    const user = userEvent.setup();
    await user.click(setup());
    const link = screen.getByRole('link', { name: /about us \(opens in a new tab\)/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
