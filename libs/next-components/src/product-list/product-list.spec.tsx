import React from 'react';
import { render } from '@testing-library/react';
import { DetailedProduct } from '@react-monorepo/types';

import ProductList from './product-list';

describe('ProductList', () => {
  const mockProducts = [
    { title: 'Product 1', slug: 'product-1' },
    { title: 'Product 2', slug: 'product-2' },
  ];

  it('renders correctly with products', () => {
    const { getByText, getAllByRole, baseElement } = render(
      <ProductList products={mockProducts} />
    );
    expect(baseElement).toBeTruthy();
    expect(getByText('ProductList component')).toBeTruthy();
    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(mockProducts.length);
  });

  it('renders correctly without products', () => {
    const { getByText, queryAllByRole, baseElement } = render(
      <ProductList products={[]} />
    );
    expect(baseElement).toBeTruthy();
    expect(getByText('ProductList component')).toBeTruthy();
    const listItems = queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });

  it('displays product titles and links correctly', () => {
    const { getByText } = render(<ProductList products={mockProducts} />);
    mockProducts.forEach((product: DetailedProduct) => {
      const link = getByText(product.title || '');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe(`/products/${product.slug}`);
    });
  });
});
