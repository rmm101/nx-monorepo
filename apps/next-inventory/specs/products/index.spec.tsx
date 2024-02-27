import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailedProduct } from '@react-monorepo/types';

import ProductsPage from '../../pages/products';

jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    ApolloClient: jest.fn(() => ({
      query: jest.fn().mockResolvedValue({ data: {} }),
    })),
  };
});

describe('ProductsPage', () => {
  const mockProducts: DetailedProduct[] = [
    {
      title: 'Product 1',
      slug: 'product-1',
      image: { url: 'url1', description: 'desc1' },
    },
    {
      title: 'Product 2',
      slug: 'product-2',
      image: { url: 'url2', description: 'desc2' },
    },
  ];

  it('renders the products page with product list', () => {
    render(<ProductsPage products={mockProducts} />);
    expect(
      screen.getByRole('heading', { name: /products page/i })
    ).toBeTruthy();
    expect(screen.getByText('ProductList component')).toBeTruthy();
    mockProducts.forEach((product: DetailedProduct) => {
      expect(screen.getByText(product.title || '')).toBeTruthy();
    });
  });
});
