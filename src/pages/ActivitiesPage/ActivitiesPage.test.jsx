import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe.js';
import { renderWithRouter } from '../../test/renderWithRouter.jsx';
import ActivitiesPage from './ActivitiesPage.jsx';

const NOW = new Date('2026-11-02T12:00:00+01:00');
const setup = () => renderWithRouter(<ActivitiesPage now={NOW} />);

describe('ActivitiesPage', () => {
  it('shows upcoming activities soonest first by default', () => {
    setup();
    expect(screen.getByRole('radio', { name: 'Upcoming' })).toBeChecked();
    const titles = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titles[0]).toBe('Monthly members meeting');
    expect(screen.getByRole('status')).toHaveTextContent('Showing 4 of 4 upcoming activities');
  });

  it('switches to past activities', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('radio', { name: 'Past' }));
    expect(screen.getByRole('status')).toHaveTextContent('Showing 2 of 2 past activities');
    expect(screen.queryByRole('button', { name: /add to calendar/i })).toBeNull();
  });

  it('filters by type with aria-pressed chips', async () => {
    const user = userEvent.setup();
    setup();
    const chip = screen.getByRole('button', { name: 'Training' });
    await user.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Showing 1 of 4');
    expect(screen.getByRole('heading', { level: 2, name: 'Frontend fundamentals workshop' })).toBeInTheDocument();
  });

  it('shows an empty state with a recovery action', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('radio', { name: 'Past' }));
    await user.click(screen.getByRole('button', { name: 'Outreach' }));
    expect(screen.getByRole('heading', { name: /no past activities/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByRole('status')).toHaveTextContent('Showing 2 of 2');
  });

  it('has no axe violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  }, 20000);
});
