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
export const GET_BY_CATEGORY_PRODUCTS = gql`
  query ($category: String, $subCategory: String, $page: Int, $pageSize: Int) {
    products_connection(
      filters: {
        categories: { categoryName: { eq: $category } }
        sub_categories: { title: { eq: $subCategory } }
      }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      nodes {
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
      pageInfo {
        pageCount
      }
    }
  }
`;

export interface GetProductsResponse {
  products: ProductType[];
}

export interface GetCategoryesResponse {
  products_connection: {
    nodes: ProductType[];
    pageInfo: { pageCount: number; total: number };
  };
}


