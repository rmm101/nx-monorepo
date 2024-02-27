import { DetailedProduct } from '@react-monorepo/types';

interface ProductListProps {
  products: DetailedProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h2>ProductList component</h2>
      <ul>
        {products.map((product: DetailedProduct, i: number) => (
          <li key={i}>
            <a href={`/products/${product.slug}`}>{product.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
