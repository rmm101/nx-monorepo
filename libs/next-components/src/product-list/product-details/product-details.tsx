import { DetailedProduct } from '@react-monorepo/types';

import classes from './product-details.module.css';

interface ProductDetailsProps {
  product: DetailedProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div>
      <h2>ProductDetails component</h2>
      <div className={classes.container}>
        <img
          src={product.image?.url}
          width={200}
          height={200}
          alt={product.title}
        />
        <div>
          <h3>{product.title}</h3>
          <p>{product.image?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
