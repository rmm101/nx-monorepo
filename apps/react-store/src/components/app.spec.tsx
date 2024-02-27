import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('renders the App component on default route', () => {
    render(<App />);
    expect(screen.getByText('Home page')).toBeTruthy();
  });
});
