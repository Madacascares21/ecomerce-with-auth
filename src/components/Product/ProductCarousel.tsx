import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductCarouselProps {
  products: ProductType[];
  href?: string;
}

export function ProductCarousel({ products, href }: ProductCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2 md:-ml-4 p-2">
        {products.map((product) => (
          <CarouselItem
            key={product.productName}
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
        <CarouselItem className="  rounded grid place-content-center pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          <Link href={href || "#"} className="underline">
            Vezi mai mult
          </Link>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
