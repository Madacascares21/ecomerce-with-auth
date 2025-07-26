import ProductCard from "@/components/Product/ProductCard";

export default function ProductGrid({ products }: { products: ProductType[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );
}
