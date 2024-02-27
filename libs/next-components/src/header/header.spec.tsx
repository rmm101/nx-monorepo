import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('renders the Header component', () => {
    render(<Header />);
    expect(screen.getByText('101 Ways')).toBeTruthy();
    expect(screen.getByText('My products')).toBeTruthy();
  });
});
