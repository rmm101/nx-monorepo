import { render } from '@testing-library/react';

import ProductDetails from './product-details';

describe('ProductDetails', () => {
  it('should render successfully', () => {
    const { getByText, baseElement } = render(<ProductDetails />);
    expect(baseElement).toBeTruthy();
    expect(getByText('ProductDetails component')).toBeTruthy();
  });
});
