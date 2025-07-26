import React from "react";
import { getProductCategories } from "@/lib/query-products";
import CategoryList from "./CategoryList";
import { wait } from "@/lib/utils";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] | undefined[] }>;
  searchParams: Promise<{ page: string | undefined }>;
}) => {
  const currentPageQuery = (await searchParams).page || "";
  const page = parseInt(currentPageQuery) || 1;

  const [category, subCategory] = (await params).slug;

  const { data } = await getProductCategories({
    variables: {
      category: category || "",
      subCategory,
      page,
      pageSize: 2,
    },
  });

  return (
    <>
      <CategoryList
        sampleProducts={data.products_connection.nodes}
        currentPage={page}
        totalPages={data.products_connection.pageInfo.pageCount}
      />
    </>
  );
};

export default CategoryPage;
