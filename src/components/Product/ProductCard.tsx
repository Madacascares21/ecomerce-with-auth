"use client";
import Link from "next/link";
import React, { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const variant = product.variants[selectedVariantIndex];
  const mainImage = variant.images[0]?.url;

  const getDiscountedPrice = (amount: number, discount: DiscounType) => {
    return discount ? (amount - discount.amount).toFixed(0) : amount;
  };

  // Extract unique colors with the first variant index
  const colorMap: { [color: string]: number } = {};
  product.variants.forEach((v, idx) => {
    const color = v.attributes.find((a) => a.Key === "Color")?.Value;
    if (color && !(color in colorMap)) {
      colorMap[color] = idx;
    }
  });
  const uniqueColors = Object.entries(colorMap).map(([color, index]) => ({
    color,
    index,
  }));

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="w-[250px] bg-white shadow-md rounded-xl overflow-hidden">
        {/* Image */}
        <div className="relative">
          <img
            src={`http://localhost:1337${mainImage}`}
            alt={product.productName}
            className="w-full h-[300px] object-cover object-top"
          />

          {/* Unique color dots */}
          <div className="absolute bottom-2 right-2 flex space-x-2">
            {uniqueColors.map(({ color, index }) => (
              <button
                key={color}
                className={`w-4 h-4 rounded-full border-2 ${
                  index === selectedVariantIndex
                    ? "border-black"
                    : "border-white"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedVariantIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h2 className="text-sm font-semibold leading-snug">
            {product.productName}
          </h2>

          {/* Star rating (hardcoded) */}
          <div className="flex items-center mt-1 text-yellow-500 text-sm">
            {"★".repeat(5)} <span className="text-gray-500 ml-1">(4.8)</span>
          </div>

          {/* Prices */}
          <div className="mt-2">
            <span className="text-lg font-bold text-black">
              {getDiscountedPrice(variant.price.amount, variant.price.discount)}{" "}
              {variant.price.currency}
            </span>
            {variant.price.discount && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {variant.price.amount} {variant.price.currency}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
