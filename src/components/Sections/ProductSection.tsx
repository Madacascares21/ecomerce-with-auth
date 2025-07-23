import { useState } from "react";
import { ProductCarousel } from "../Product/ProductCarousel";
import { getApolloClient } from "@/server/product/productREST";
import {
  GET_NEW_PRODUCTS,
  GetProductsResponse,
} from "@/server/product/queries";
import { queryProducts } from "@/lib/query-products";

// Sample product data

export default async function NewProductSection() {
  const { data, error } = await queryProducts(GET_NEW_PRODUCTS);
  // if (error) {
  //   console.log(error);
  // }
  if (data === undefined) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-200">
        <span>No products yet</span>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-200">
      <ProductCarousel products={data.products} title="Produse Noi" />
    </div>
  );
}
