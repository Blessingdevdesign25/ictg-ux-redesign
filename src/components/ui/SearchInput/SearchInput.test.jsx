import { describe, it, expect } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput.jsx';

function Harness() {
  const [value, setValue] = useState('');
  return <SearchInput id="s" label="Search messages" value={value} onChange={setValue} />;
}

describe('SearchInput', () => {
  it('has an associated label and search type', () => {
    render(<Harness />);
    expect(screen.getByRole('searchbox', { name: 'Search messages' })).toHaveAttribute('type', 'search');
  });

  it('shows a labelled clear button only with a value, and refocuses the input', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByRole('searchbox', { name: 'Search messages' });
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();

    await user.type(input, 'grace');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
  });
});
