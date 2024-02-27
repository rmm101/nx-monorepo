import { ProductList } from '@react-monorepo/next-components';
import { DetailedProduct } from '@react-monorepo/types';

import { getAllProducts } from '../../queries';

interface ProductsPageProps {
  products: DetailedProduct[];
}

function ProductsPage({ products }: ProductsPageProps) {
  return (
    <div>
      <h1>Products page</h1>
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;

export async function getStaticProps(): Promise<{ props: ProductsPageProps }> {
  const products: DetailedProduct[] = await getAllProducts();
  return {
    props: {
      products,
    },
  };
}
