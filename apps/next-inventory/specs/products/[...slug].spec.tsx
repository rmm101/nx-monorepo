import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailedProduct } from '@react-monorepo/types';

import ProductPage from '../../pages/products/[...slug]';

jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    ApolloClient: jest.fn(() => ({
      query: jest.fn().mockResolvedValue({ data: {} }),
    })),
  };
});

describe('Dynamic ProductPage', () => {
  const mockProduct: DetailedProduct = {
    title: 'Sample Product',
    slug: 'sample-product',
    image: {
      url: 'http://example.com/sample.jpg',
      description: 'Sample Description',
    },
  };

  it('renders the product page with product details', () => {
    render(<ProductPage product={mockProduct} />);
    expect(screen.getByRole('heading', { name: /product page/i })).toBeTruthy();
    expect(screen.getByText('ProductDetails component')).toBeTruthy();
    expect(screen.getByText(mockProduct.title || '')).toBeTruthy();
  });
});
