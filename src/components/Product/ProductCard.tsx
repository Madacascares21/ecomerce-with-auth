"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const variant: VariantType = product.variants[selectedVariantIndex];

  const { amount, currency, discount } = variant.price;
  const now = new Date();
  const discountValid = discount && new Date(discount.valid_until) > now;
  const discountedPrice = discountValid ? amount - discount.amount : null;

  const descriptionText = product.description?.[0]?.children?.[0]?.text ?? "";

  const colorOptions = product.variants.map((v, index) => {
    const colorAttr = v.attributes.find((a) => a.Key === "Color");
    return {
      hex: colorAttr?.Value ?? "#000000",
      index,
      inStock: v.inStock,
    };
  });

  const handleColorSelect = (index: number) => {
    setSelectedVariantIndex(index);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 relative">
        <img
          src={`http://localhost:1337${variant.images?.[0]?.url}`}
          alt={product.productName}
          width={400}
          height={400}
          className="h-64 w-full object-cover object-bottom rounded-t-md"
        />
        {!variant.inStock && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Out of stock
          </Badge>
        )}
        {/* {discountedPrice !== null && (
          <Badge className="absolute top-2 right-2">Sale</Badge>
        )} */}

        {colorOptions.length > 1 && (
          <div className="space-y-2 absolute bottom-0 right-0 pr-4 pb-4">
            <label className="text-sm font-medium sr-only">Color</label>
            <div className="flex items-center gap-2">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(index)}
                  className={`relative size-5 rounded-full border-1 transition-all duration-200 ${
                    selectedVariantIndex === index
                      ? "border-gray-500  "
                      : " scale-90"
                  } ${
                    !color.inStock
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  disabled={!color.inStock}
                  aria-label={`Select color ${color.hex}`}
                >
                  {selectedVariantIndex === index && (
                    <div className="absolute inset-0 rounded-full border-2 border-white" />
                  )}
                  {!color.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-gray-600 rotate-45" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4 ">
        <div>
          <h3 className="text-lg font-semibold">{product.productName}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-1">(4.8)</span>
          </div>
        </div>
        {/* <p className="text-sm text-muted-foreground line-clamp-2">
          {descriptionText}
        </p> */}
        <div className="flex items-baseline gap-2">
          {discountedPrice !== null ? (
            <>
              <span className="text-xl font-bold">
                {discountedPrice} {currency}
              </span>
              <span className="line-through text-muted-foreground">
                {amount} {currency}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold">
              {amount} {currency}
            </span>
          )}
        </div>

        {/* <div className="text-sm text-muted-foreground">
          {variant.inStock ? (
            <span className="text-green-600">
              In stock ({variant.quantity} available)
            </span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div> */}
      </CardContent>

      {/* <CardFooter className="">
        <Button className="w-full" disabled={!variant.inStock}>
          {variant.inStock ? "Add to cart" : "Notify me"}
        </Button>
      </CardFooter> */}
    </Card>
  );
}
