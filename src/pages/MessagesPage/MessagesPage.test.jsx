import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe.js';
import { mockDesktop, renderAt } from '../../test/renderWithRouter.jsx';
import { MESSAGES } from '../../data/messages.js';

const TOTAL = MESSAGES.length;
const status = () => screen.getByRole('status');
const location = () => screen.getByTestId('location').textContent;
const cards = () => within(screen.getByRole('main')).queryAllByRole('article');

describe('MessagesPage (desktop filter bar)', () => {
  let restore;
  beforeEach(() => {
    restore = mockDesktop();
  });
  afterEach(() => restore());

  it('renders the h1, breadcrumb and the full list by default', () => {
    renderAt('/messages');
    expect(screen.getByRole('heading', { level: 1, name: 'Messages library' })).toBeInTheDocument();
    const crumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(crumb).getByText('Messages')).toHaveAttribute('aria-current', 'page');
    expect(status()).toHaveTextContent(`Showing ${TOTAL} of ${TOTAL} messages`);
    expect(cards()).toHaveLength(TOTAL);
  });

  it('typing "covenant" filters to matching titles and updates the status text', async () => {
    const user = userEvent.setup();
    renderAt('/messages', { withLocation: true });
    await user.type(screen.getByRole('searchbox', { name: 'Search messages' }), 'covenant');

    const expected = MESSAGES.filter((m) => /covenant/i.test(`${m.title} ${m.category} ${m.description} ${m.tags.join(' ')}`));
    expect(cards()).toHaveLength(expected.length);
    cards().forEach((card) => expect(card).toHaveTextContent(/covenant/i));
    await waitFor(() => expect(status()).toHaveTextContent(`Showing ${expected.length} of ${TOTAL} messages`));
    expect(location()).toContain('q=covenant');
    // matched term is highlighted
    expect(within(cards()[0]).getAllByText(/covenant/i, { selector: 'mark' }).length).toBeGreaterThan(0);
  });

  it('selecting a speaker narrows results and writes speaker= to the URL', async () => {
    const user = userEvent.setup();
    renderAt('/messages', { withLocation: true });
    await user.selectOptions(screen.getByRole('combobox', { name: 'Speaker' }), 'Pst. Mrs Faith A. Oyedepo');

    const expected = MESSAGES.filter((m) => m.speaker === 'Pst. Mrs Faith A. Oyedepo').length;
    expect(cards()).toHaveLength(expected);
    expect(status()).toHaveTextContent(`Showing ${expected} of ${TOTAL}`);
    expect(location()).toContain('speaker=Pst.+Mrs+Faith+A.+Oyedepo');
  });

  it('loading /messages?category=Communion pre-applies the filter', () => {
    renderAt('/messages?category=Communion');
    const expected = MESSAGES.filter((m) => m.category === 'Communion').length;
    expect(screen.getByRole('combobox', { name: 'Service type' })).toHaveValue('Communion');
    expect(cards()).toHaveLength(expected);
    expect(screen.getByRole('button', { name: 'Remove filter: Service type Communion' })).toBeInTheDocument();
  });

  it('removing a filter chip clears that filter', async () => {
    const user = userEvent.setup();
    renderAt('/messages?category=Communion&year=2025', { withLocation: true });
    await user.click(screen.getByRole('button', { name: 'Remove filter: Year 2025' }));
    expect(location()).not.toContain('year=');
    expect(location()).toContain('category=Communion');
  });

  it('"Clear all" resets everything and the URL', async () => {
    const user = userEvent.setup();
    renderAt('/messages?q=service&speaker=Bishop+David+Oyedepo&year=2025', { withLocation: true });
    expect(screen.getByRole('searchbox', { name: 'Search messages' })).toHaveValue('service');
    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(location()).toBe('/messages');
    expect(screen.getByRole('searchbox', { name: 'Search messages' })).toHaveValue('');
    expect(cards()).toHaveLength(TOTAL);
    expect(screen.queryByRole('button', { name: 'Clear all' })).toBeNull();
  });

  it('sorts A–Z', async () => {
    const user = userEvent.setup();
    renderAt('/messages');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort by' }), 'az');
    const titles = cards().map((c) => within(c).getByRole('heading').textContent);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  });

  it('zero-result query shows the empty state; "Clear filters" restores the full list', async () => {
    const user = userEvent.setup();
    renderAt('/messages?q=zzzz');
    expect(screen.getByRole('heading', { name: /no messages match “zzzz”/i })).toBeInTheDocument();
    expect(status()).toHaveTextContent(`Showing 0 of ${TOTAL} messages`);
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(cards()).toHaveLength(TOTAL);
  });

  it('has no axe violations in default and empty states', async () => {
    const { container, unmount } = renderAt('/messages');
    expect(await axe(container)).toHaveNoViolations();
    unmount();
    const empty = renderAt('/messages?q=zzzz');
    expect(await axe(empty.container)).toHaveNoViolations();
  }, 20000);
});

describe('MessagesPage (mobile filter dialog)', () => {
  it('opens filters in a dialog, applies a filter, and returns focus on close', async () => {
    const user = userEvent.setup();
    renderAt('/messages', { withLocation: true });
    expect(screen.queryByRole('combobox', { name: 'Speaker' })).toBeNull();

    const trigger = screen.getByRole('button', { name: 'Filters' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Filter messages' });
    await user.selectOptions(within(dialog).getByRole('combobox', { name: 'Year' }), '2026');

    const expected = MESSAGES.filter((m) => m.date.startsWith('2026')).length;
    expect(location()).toContain('year=2026');
    await user.click(within(dialog).getByRole('button', { name: `Show ${expected} results` }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Filters (1)' })).toHaveFocus();
  });

  it('has no axe violations with the dialog open', async () => {
    const user = userEvent.setup();
    const { container } = renderAt('/messages');
    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(await axe(container)).toHaveNoViolations();
  }, 20000);
});
