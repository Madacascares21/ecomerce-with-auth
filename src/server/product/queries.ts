// lib/queries.js
import { gql } from "@apollo/client";

export const GET_NEW_PRODUCTS = gql`
  query getNewProducts($limit: Int) {
    products(pagination: { limit: $limit }, sort: ["createdAt:desc"]) {
      productName
      description
      categories {
        categoryName
      }
      variants {
        attributes {
          Key
          Value
        }
        inStock
        quantity
        price {
          amount
          currency
          discount {
            amount
            valid_until
          }
        }
        images {
          url
        }
      }
    }
  }
`;

export const GET_BEST_DISCOUNT_PRODUCTS = gql`
  query ($limit: Int) {
    products(
      pagination: { limit: $limit }
      sort: ["variants.price.discount.amount:desc"]
      filters: { variants: { price: { discount: { amount: { not: null } } } } }
    ) {
      productName
      description
      categories {
        categoryName
      }
      variants {
        attributes {
          Key
          Value
        }
        inStock
        quantity
        price {
          amount
          currency
          discount {
            amount
            valid_until
          }
        }
        images {
          url
        }
      }
    }
  }
`;

export const GET_BEST_SELLER_PRODUCTS = gql`
  query ($limit: Int) {
    products(
      pagination: { limit: $limit }
      filters: { tags: { tagName: { eq: "best-seller" } } }
    ) {
      productName
      description
      tags {
        tagName
      }
      categories {
        categoryName
      }
      variants {
        attributes {
          Key
          Value
        }
        inStock
        quantity
        price {
          amount
          currency
          discount {
            amount
            valid_until
          }
        }
        images {
          url
        }
      }
    }
  }
`;
export interface GetProductsResponse {
  products: ProductType[];
}
