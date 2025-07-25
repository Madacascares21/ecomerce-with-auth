import { ProductCarousel } from "../Product/ProductCarousel";
import { GET_BEST_DISCOUNT_PRODUCTS } from "@/server/product/queries";
import { queryProducts } from "@/lib/query-products";

export default async function BestDiscountsProductSection() {
  const { data } = await queryProducts(GET_BEST_DISCOUNT_PRODUCTS);
  if (data === undefined) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-200">
        <span>No products yet</span>
      </div>
    );
  }

  return (
      <ProductCarousel products={data.products}  />

  );
}
