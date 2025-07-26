"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type ProductPageProps = {
  product: ProductType;
};

const ProductPage = ({ product }: ProductPageProps) => {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Derive attribute options
  const attributeOptions: Record<string, string[]> = (() => {
    const map: Record<string, Set<string>> = {};
    product.variants.forEach((variant) => {
      variant.attributes.forEach(({ Key, Value }) => {
        if (!map[Key]) map[Key] = new Set();
        map[Key].add(Value);
      });
    });
    return Object.fromEntries(
      Object.entries(map).map(([key, set]) => [key, Array.from(set)])
    );
  })();

  // Derive selected variant
  const selectedVariant: VariantType | undefined = product.variants.find(
    (variant) =>
      variant.attributes.every(
        ({ Key, Value }) => selectedAttributes[Key] === Value
      )
  );

  // Set main image and reset quantity when variant changes
  useEffect(() => {
    if (selectedVariant?.images?.length) {
      setMainImage(selectedVariant.images[0].url);
      setQuantity(1);
    }
  }, [selectedVariant]);

  const handleAttributeChange = (changedKey: string, changedValue: string) => {
    const updatedAttributes = {
      ...selectedAttributes,
      [changedKey]: changedValue,
    };

    let matchedVariant = product.variants.find((variant) =>
      variant.attributes.every(
        ({ Key, Value }) => updatedAttributes[Key] === Value
      )
    );

    if (!matchedVariant) {
      matchedVariant = product.variants.find((variant) =>
        variant.attributes.some(
          ({ Key, Value }) => Key === changedKey && Value === changedValue
        )
      );
    }

    if (matchedVariant) {
      const newSelectedAttrs: Record<string, string> = {};
      matchedVariant.attributes.forEach(({ Key, Value }) => {
        newSelectedAttrs[Key] = Value;
      });
      setSelectedAttributes(newSelectedAttrs);
    } else {
      setSelectedAttributes(updatedAttributes);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
      {/* Left: Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        {mainImage && (
          <div className="w-full max-w-md">
            <img
              src={`http://localhost:1337${mainImage}`}
              alt="Selected product"
              className="w-full object-cover object-top h-[500px] rounded-md border shadow"
            />
          </div>
        )}
        {selectedVariant?.images?.length > 1 && (
          <div className="mt-4 flex gap-3 flex-wrap justify-center">
            {selectedVariant.images.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:1337${img.url}`}
                onClick={() => setMainImage(img.url)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <div className="flex items-center mt-1 text-yellow-500 text-xl">
            {"★".repeat(5)}{" "}
            <span className="text-gray-500 text-sm ml-1">(4.8)</span>
          </div>
        </div>

        {Object.entries(attributeOptions).map(([key, values]) => (
          <div key={key}>
            <p className="font-semibold">{key}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {values.map((value) => (
                <button
                  key={value}
                  onClick={() => handleAttributeChange(key, value)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedAttributes[key] === value
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
                  style={
                    key.toLowerCase() === "color"
                      ? {
                          backgroundColor: value,
                          borderColor:
                            selectedAttributes[key] === value
                              ? "black"
                              : "#ccc",
                          width: "2.5rem",
                          height: "2.5rem",
                          padding: 0,
                        }
                      : {}
                  }
                >
                  {key.toLowerCase() === "color" ? "" : value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {selectedVariant && (
          <div>
            <p className="text-lg font-semibold">
              {selectedVariant.price.discount ? (
                <>
                  <span className="line-through text-gray-500 mr-2">
                    {selectedVariant.price.amount}{" "}
                    {selectedVariant.price.currency}
                  </span>
                  <span className="text-red-600 font-bold">
                    {selectedVariant.price.amount -
                      selectedVariant.price.discount.amount}{" "}
                    {selectedVariant.price.currency}
                  </span>
                </>
              ) : (
                <>
                  {selectedVariant.price.amount}{" "}
                  {selectedVariant.price.currency}
                </>
              )}
            </p>
            <span className="font-bold my-3 block">Disponibilitate</span>
            <p
              className={`text-sm mt-1 px-2 py-1 border w-max border-foreground ${
                selectedVariant.inStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {selectedVariant.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>
        )}

        {selectedVariant?.inStock && (
          <div className="mt-4 flex items-center gap-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center border rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg font-semibold border-r hover:bg-gray-100"
              >
                −
              </button>
              <div className="px-4 py-1 text-lg">{quantity}</div>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(selectedVariant.quantity, q + 1))
                }
                className="px-3 py-1 text-lg font-semibold border-l hover:bg-gray-100"
              >
                +
              </button>
            </div>
            {selectedVariant.quantity <= 5 && (
              <span className="text-sm text-gray-500">
                (Doar {selectedVariant.quantity} bucati ramase)
              </span>
            )}
          </div>
        )}

        <div className="mt-4">
          <button
            disabled={!selectedVariant?.inStock}
            onClick={() => {
              // Add to cart logic
            }}
            className={`px-6 py-3 rounded-md text-white font-semibold transition ${
              selectedVariant?.inStock
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
