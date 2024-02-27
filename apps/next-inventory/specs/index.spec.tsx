import React from 'react';
import { screen, render } from '@testing-library/react';

import Home from '../pages';

describe('Home', () => {
  it('renders the Home component', () => {
    render(<Home />);
    expect(screen.getByText('Home page')).toBeTruthy();
  });
});
