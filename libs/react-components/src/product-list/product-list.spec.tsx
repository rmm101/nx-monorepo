import { render } from '@testing-library/react';

import ProductList from './product-list';

describe('ProductList', () => {
  it('should render successfully', () => {
    const { getByText, baseElement } = render(<ProductList />);
    expect(baseElement).toBeTruthy();
    expect(getByText('ProductList component')).toBeTruthy();
    expect(getByText('ProductDetails component')).toBeTruthy();
  });
});
