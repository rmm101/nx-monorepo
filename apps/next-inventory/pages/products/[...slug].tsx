import { ProductDetails } from '@react-monorepo/next-components';
import { DetailedProduct } from '@react-monorepo/types';

import { getProductBySlug, getAllProductsSlugs } from '../../queries';

interface ProductPageProps {
  product: DetailedProduct;
}

function ProductPage({ product }: ProductPageProps) {
  return (
    <div>
      <h1>Product page</h1>
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductPage;

interface StaticPathsParams {
  paths: { params: { slug: string[] } }[];
  fallback: boolean;
}

interface StaticPropsParams {
  params: {
    slug: string[];
  };
}

export async function getStaticPaths(): Promise<StaticPathsParams> {
  const products: DetailedProduct[] = await getAllProductsSlugs();
  const paths = products.map((product: DetailedProduct) => ({
    params: { slug: [product.slug] },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: StaticPropsParams): Promise<{ props: ProductPageProps }> {
  const slug = params.slug[0];
  const product: DetailedProduct = await getProductBySlug(slug);
  return {
    props: {
      product,
    },
  };
}
