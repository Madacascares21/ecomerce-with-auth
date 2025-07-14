"use client";

// Generic key-value map for variant attributes (any string keys and string values)
type VariantAttributes = {
  [attributeName: string]: string;
};

// Single product variant type
interface ProductVariant {
  variantId: string; // Unique ID for this variant
  attributes: VariantAttributes; // Dynamic attributes like color, size, material, etc.
  priceInCents: number; // Price in cents (integer)
  stock: number; // Stock count available
  sku?: string; // Optional SKU code
  imageUrls?: string[]; // Optional images for this variant
  // Add more optional fields here as needed
}

// Product type with variants
interface Product {
  productName: string;
  slug: string; // URL-friendly unique identifier
  variants: ProductVariant[]; // Array of variants for this product
  description?: string; // Optional description of product
  category?: string; // Optional category or tags
  // Add more optional fields here as needed
}

import { useState } from "react";
export const products: Product[] = [
  {
    productName: "Running Shoe",
    slug: "running-shoe",
    variants: [
      {
        variantId: "1",
        attributes: { size: "9", color: "Black", material: "Mesh" },
        priceInCents: 7500,
        stock: 4,
      },
      {
        variantId: "2",
        attributes: { size: "9", color: "White", material: "Leather" },
        priceInCents: 7700,
        stock: 2,
      },
      {
        variantId: "3",
        attributes: { size: "10", color: "Black", material: "Mesh" },
        priceInCents: 7500,
        stock: 3,
      },
    ],
  },
  {
    productName: "Sex mchine",
    slug: "asas",
    description: "asds",
    category: "Figurine",
    variants: [
      {
        variantId: "asasdd",
        attributes: {
          culoare: "turquize",
          marime: "mic",
        },
        priceInCents: 66,
        stock: 4,
      },
      {
        variantId: "asasdd22",
        attributes: {
          culoare: "mov",
          marime: "mare",
        },
        priceInCents: 5454,
        stock: 32,
      },
    ],
  },
];

export default function ProductGrid() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  // Step 1: Dynamically find all attribute keys across all variants
  const attributeKeys = Array.from(
    new Set(product.variants.flatMap((v) => Object.keys(v.attributes)))
  );

  // Step 2: For each key, collect unique possible values
  const attributeValues: { [key: string]: string[] } = {};
  attributeKeys.forEach((key) => {
    attributeValues[key] = Array.from(
      new Set(product.variants.map((v) => v.attributes[key]))
    );
  });

  // Step 3: Find a variant that matches all selected attributes
  const matchingVariant = product.variants.find((v) =>
    attributeKeys.every((key) => v.attributes[key] === selectedAttributes[key])
  );

  // Step 4: Update selected attributes
  const handleChange = (key: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="border p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">{product.productName}</h2>

      {attributeKeys.map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium mb-1 capitalize">
            {key}
          </label>
          <select
            className="border p-2 w-full"
            value={selectedAttributes[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            {attributeValues[key].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}

      {matchingVariant ? (
        <div className="mt-3 text-sm">
          <p>
            <strong>Price:</strong> $
            {(matchingVariant.priceInCents / 100).toFixed(2)}
          </p>
          <p>
            <strong>Stock:</strong> {matchingVariant.stock}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-500">Please select options</p>
      )}
    </div>
  );
}
