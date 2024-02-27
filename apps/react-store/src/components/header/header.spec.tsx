import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './header';

describe('Header', () => {
  it('renders the Header component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('101 Ways')).toBeTruthy();
    expect(screen.getByText('My products')).toBeTruthy();
  });
});
