import { gql } from '@apollo/client';
import { DetailedProduct } from '@react-monorepo/types';

import apolloClient from '../apollo-client';

export const getAllProducts = async (): Promise<DetailedProduct[]> => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllProducts {
        productCollection {
          items {
            title
            slug
          }
        }
      }
    `,
  });
  return data.productCollection.items;
};

export const getAllProductsSlugs = async (): Promise<DetailedProduct[]> => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllProducts {
        productCollection {
          items {
            slug
          }
        }
      }
    `,
  });
  return data.productCollection.items;
};

export const getProductBySlug = async (
  slug: string
): Promise<DetailedProduct> => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetProductBySlug($slug: String!) {
        productCollection(where: { slug: $slug }) {
          items {
            title
            slug
            image {
              url
              description
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });
  return data.productCollection.items[0];
};
