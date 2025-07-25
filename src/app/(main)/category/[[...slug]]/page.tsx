import { queryProductCategories, queryProducts } from "@/lib/query-products";
import { GET_BY_CATEGORY_PRODUCTS } from "@/server/product/queries";
import React from "react";
import CategoryPage from "./_components/page";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] | undefined[] }>;
  searchParams: Promise<{ page: string | undefined }>;
}) => {
  const nu = (await searchParams).page || "";
  const page = parseInt(nu) || 1; // default to page 1

  const [category, subCategory] = (await params).slug;
  const variables = {
    category: category || "",
    subCategory,
    page,
    pageSize: 11,
  };
  const { data } = await queryProductCategories({
    variables,
  });
  
  if (data === undefined) {
    return "o no";
  }
  return (
    <>
      <CategoryPage
        sampleProducts={data.products_connection.nodes}
        currentPage={page}
        totalPages={data.products_connection.pageInfo.pageCount}
      />
    </>
  );
};

export default page;
