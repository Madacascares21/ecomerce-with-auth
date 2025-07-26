import React, { Suspense } from "react";
import CategoryPage from "./_components";
import ProductCategorySkeleton from "./_components/skeleton";

const page = ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] | undefined[] }>;
  searchParams: Promise<{ page: string | undefined }>;
}) => {
  return (
    <Suspense fallback={<ProductCategorySkeleton/>}>
      <CategoryPage params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default page;
