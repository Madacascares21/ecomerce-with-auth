import React from "react";
import ProductPage from "./_components/page";
import { getProduct } from "@/lib/query-products";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string | undefined }>;
}) => {
  const { slug } = await params;
  const data = await getProduct(slug || "");

  return (
    <div>
      <ProductPage product={data.data.products_connection.nodes[0]} />
    </div>
  );
};

export default page;
