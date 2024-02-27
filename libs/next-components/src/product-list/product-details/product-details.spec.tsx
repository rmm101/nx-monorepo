import React from 'react';
import { render } from '@testing-library/react';
import { DetailedProduct } from '@react-monorepo/types';

import ProductDetails from './product-details';

describe('ProductDetails', () => {
  const mockProduct: DetailedProduct = {
    title: 'Sample Product',
    slug: 'Sample-product',
    image: {
      url: 'http://example.com/sample.jpg',
      description: 'Sample Description',
    },
  };

  it('renders product details correctly', () => {
    const { getByText, getByAltText, baseElement } = render(
      <ProductDetails product={mockProduct} />
    );
    expect(baseElement).toBeTruthy();
    expect(getByText('ProductDetails component')).toBeTruthy();
    expect(getByText(mockProduct.title || '')).toBeTruthy();
    const image = getByAltText(mockProduct.title || '') as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.src).toBe(mockProduct.image?.url);
    expect(image.alt).toBe(mockProduct.title);
    expect(getByText(mockProduct.image?.description || '')).toBeTruthy();
  });
});
