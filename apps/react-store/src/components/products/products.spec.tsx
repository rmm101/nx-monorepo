import { render, screen } from '@testing-library/react';

import Products from './products';

describe('Products', () => {
  it('renders the Products component', () => {
    render(<Products />);
    expect(screen.getByText('Products page')).toBeTruthy();
    expect(screen.getByText('ProductList component')).toBeTruthy();
  });
});
