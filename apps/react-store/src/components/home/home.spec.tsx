import { render, screen } from '@testing-library/react';

import Home from './home';

// Mock getCurrentTime
vi.mock('@react-monorepo/utils', () => ({
  getCurrentTime: vi.fn(() => '12:00 PM'),
}));

describe('Home', () => {
  it('renders the Home component', () => {
    render(<Home />);
    expect(screen.getByText('Home page')).toBeTruthy();
  });

  it('displays the current time', () => {
    render(<Home />);
    expect(screen.getByText('Current time: 12:00 PM')).toBeTruthy();
  });
});
