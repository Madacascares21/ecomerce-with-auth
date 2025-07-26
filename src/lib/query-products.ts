import { getApolloClient } from "@/server/product/productREST";
import {
  GET_BESTSELLER_PRODUCTS_PAGINATION,
  GET_BY_CATEGORY_PRODUCTS,
  GET_NEW_PRODUCTS_PAGINATION,
  GET_PRODUCT,
  GetCategoryesResponse,
  GetProductsResponse,
} from "@/server/product/queries";
import { ApolloError } from "@apollo/client";
import { DocumentNode } from "graphql";
import { wait } from "./utils";
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

export async function getProduct(slug: string) {
  const { data, error } = await client.query<GetProductsResponse>({
    query: GET_PRODUCT,
    variables: { slug },
  });
  console.log(data);
  return { data, error };
}

export async function getProductCategories({
  variables,
}: {
  variables: {
    category: string;
    subCategory?: string;
    page: number;
    pageSize: number;
  };
}): Promise<{ data: GetCategoryesResponse; error: ApolloError | undefined }> {
  await wait(9000)
  const { data, error } = await client.query<GetCategoryesResponse>({
    query: GET_BY_CATEGORY_PRODUCTS,
    variables,
  });
  return { data, error };
}

export async function getProductsBySlug(
  slug: "cele-mai-vandute" | "produse-noi",
  variables: {
    page: number;
    pageSize: number;
  }
) {
  if (slug === "produse-noi") {
    try {
      const { data, error } = await client.query<GetCategoryesResponse>({
        query: GET_NEW_PRODUCTS_PAGINATION,
        variables,
      });
      return { data, error: undefined };
    } catch (error) {
      return { data: undefined, error: "ups" };
    }
  }
  if (slug === "cele-mai-vandute") {
    try {
      const { data, error } = await client.query<GetCategoryesResponse>({
        query: GET_BESTSELLER_PRODUCTS_PAGINATION,
        variables,
      });
      return { data, error: undefined };
    } catch (error) {
      return { data: undefined, error: "ups" };
    }
  }
  return { data: undefined, error: "No data with this slug" };
}
