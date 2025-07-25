import { getApolloClient } from "@/server/product/productREST";
import {
  GET_BY_CATEGORY_PRODUCTS,
  GetCategoryesResponse,
  GetProductsResponse,
} from "@/server/product/queries";
import { ApolloError } from "@apollo/client";
import { DocumentNode } from "graphql";
const client = getApolloClient();

export async function queryProducts(query: DocumentNode, variables: {}) {
  try {
    const { data } = await client.query<GetProductsResponse>({
      query: query,
      variables: variables,
    });
    if (data.products.length === 0) {
      return { data: undefined, error: undefined };
    }
    return { data, error: undefined };
  } catch (error) {
    if (error instanceof ApolloError) {
      return { data: undefined, error: error.message };
    }
    return { data: undefined, error: error };
  }
}

// export async function queryProductCategories(variables: {
//   category: string;
//   subCategory?: string | undefined;
//   limit?: 7;
// }) {
//   if (variables.subCategory === undefined) {
//     try {
//       const { data } = await client.query<GetCategoryesResponse>({
//         query: GET_BY_CATEGORY_PRODUCTS,
//         variables: { category: variables.category, limit: variables.limit },
//       });
//       if (data.categories.length === 0) {
//         return { data: undefined, error: undefined };
//       }
//       return { data: data.categories[0].products, error: undefined };
//     } catch (error) {
//       if (error instanceof ApolloError) {
//         return { data: undefined, error: error.message };
//       }
//       return { data: undefined, error: error };
//     }
//   }
//   try {
//     const { data } = await client.query<GetSubCategoryesResponse>({
//       query: GET_BY_SUBCATEGORY_PRODUCTS,
//       variables: variables,
//     });
//     console.log(data);
//     if (data.categories.length === 0) {
//       return { data: undefined, error: undefined };
//     } else if (data.categories[0].sub_categories.length === 0) {
//       return { data: undefined, error: undefined };
//     }

//     return {
//       data: data.categories[0].sub_categories[0].products,
//       error: undefined,
//     };
//   } catch (error) {
//     console.log(error);

//     if (error instanceof ApolloError) {
//       return { data: undefined, error: error.message };
//     }
//     return { data: undefined, error: error };
//   }
// }

// Assume this is your product type

type QueryVariables = {
  category: string;
  subCategory?: string;
  page?: number;
};

const DEFAULT_LIMIT = 7;

// export async function queryProductCategories(
//   variables: QueryVariables
// ): Promise<QueryResult> {
//   const { page, category, subCategory } = variables;

//   try {
//     if (!subCategory) {
//       const { data } = await client.query<GetCategoryesResponse>({
//         query: GET_BY_CATEGORY_PRODUCTS,
//         variables: { category, page },
//       });

//       const products = extractProductsFromCategory(data);
//       return {
//         data: products,
//         error: undefined,
//         totalPages: data.products_connection.pageInfo.total,
//       };
//     }

//     const { data } = await client.query<GetSubCategoryesResponse>({
//       query: GET_BY_SUBCATEGORY_PRODUCTS,
//       variables: { category, subCategory, page },
//     });

//     const products = extractProductsFromSubCategory(data);
//     return {
//       data: products,
//       error: undefined,
//       totalPages: data.subCategories_connection.pageInfo.total,
//     };
//   } catch (error) {
//     console.log(error);
//     const message = error instanceof ApolloError ? error.message : error;
//     return { data: undefined, error: message, totalPages: 0 };
//   }
// }

export async function queryProductCategories({
  variables,
}: {
  variables: {
    category: string;
    subCategory?: string;
    page: number;
    pageSize: number;
  };
}): Promise<{ data: GetCategoryesResponse; error: ApolloError | undefined }> {
  const { data, error } = await client.query<GetCategoryesResponse>({
    query: GET_BY_CATEGORY_PRODUCTS,
    variables,
  });
  console.log(data.products_connection.nodes)
  return { data, error };
}
