import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnnouncementBar from './AnnouncementBar.jsx';

const announcement = { id: 'test', text: 'Registration is open.', cta: { label: 'Register', href: 'https://example.com' } };

describe('AnnouncementBar', () => {
  beforeEach(() => window.localStorage.clear());

  it('shows the message and an external Register link', () => {
    render(<AnnouncementBar announcement={announcement} />);
    expect(screen.getByText(/registration is open/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register \(opens in a new tab\)/i })).toHaveAttribute('target', '_blank');
  });

  it('dismisses and remembers the dismissal', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<AnnouncementBar announcement={announcement} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss announcement' }));
    expect(screen.queryByRole('complementary', { name: 'Announcement' })).toBeNull();
    unmount();
    render(<AnnouncementBar announcement={announcement} />);
    expect(screen.queryByRole('complementary', { name: 'Announcement' })).toBeNull();
  });

  it('still works when localStorage throws', async () => {
    const spy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const user = userEvent.setup();
    render(<AnnouncementBar announcement={announcement} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss announcement' }));
    expect(screen.queryByRole('complementary', { name: 'Announcement' })).toBeNull();
    spy.mockRestore();
  });
});
