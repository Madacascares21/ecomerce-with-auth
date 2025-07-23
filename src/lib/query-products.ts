import { getApolloClient } from "@/server/product/productREST";
import { GetProductsResponse } from "@/server/product/queries";
import { ApolloError } from "@apollo/client";
import { DocumentNode } from "graphql";

export async function queryProducts(query: DocumentNode, limit = 7) {
  const client = getApolloClient();
  try {
    const { data } = await client.query<GetProductsResponse>({
      query: query,
      variables: { limit },
    });
    if (data.products.length === 0) {
      return { data: undefined, error: undefined };
    }
    return { data, error: undefined };
  } catch (error) {
    if (error instanceof ApolloError) {
      return { data: undefined, error: error.message };
    }
    return { data: undefined, error: "Server Error" };
  }
}
