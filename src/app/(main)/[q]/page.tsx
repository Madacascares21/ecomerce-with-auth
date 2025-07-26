import { getProductsBySlug } from "@/lib/query-products";
import { notFound } from "next/navigation";
import CategoryPage from "../category/[...slug]/_components/CategoryList";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ q: "cele-mai-vandute" | "produse-noi" }>;
  searchParams: Promise<{ page: string | undefined }>;
}) {
  const { q } = await params;
  const nu = (await searchParams).page || "";
  const page = parseInt(nu) || 1; // default to page 1

  if (!(q.includes("produse-noi") || q.includes("cele-mai-vandute"))) {
    return notFound();
  }
  const variables = {
    page,
    pageSize: 1,
  };

  const { data } = await getProductsBySlug(q, variables);
  if (data === undefined) {
    return "o no";
  }

  return (
    <div>
      <CategoryPage
        currentPage={page}
        totalPages={data.products_connection.pageInfo.pageCount}
        sampleProducts={data.products_connection.nodes}
      />
    </div>
  );
}
