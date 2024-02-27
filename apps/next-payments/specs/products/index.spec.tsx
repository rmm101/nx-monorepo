import { render } from '@testing-library/react';

import Products from '../../pages/products';

describe('Products', () => {
  it('renders the Products component', () => {
    render(<Products />);
  });
});
