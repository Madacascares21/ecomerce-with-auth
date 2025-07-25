"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ProductCard from "@/components/Product/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryPage({
  sampleProducts,
  currentPage,
  totalPages,
}: {
  sampleProducts: ProductType[];
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [sortOption, setSortOption] = useState("none");

  // Extract all sizes and max price from the data
  const sizesSet = new Set<string>();
  let maxPrice = 0;

  sampleProducts.forEach((product) => {
    product.variants.forEach((variant) => {
      const sizeAttr = variant.attributes.find((attr) => attr.Key === "Size");
      if (sizeAttr) sizesSet.add(sizeAttr.Value);
      if (variant.price.amount > maxPrice) {
        maxPrice = variant.price.amount;
      }
    });
  });

  const availableSizes = Array.from(sizesSet).sort((a, b) => {
    const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
    return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
  });

  // Set default price range on mount or maxPrice change
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [sampleProducts]);

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes((prev) => [...prev, size]);
    } else {
      setSelectedSizes((prev) => prev.filter((s) => s !== size));
    }
  };

  // Filter + Sort products
  const filteredAndSortedProducts = sampleProducts
    .filter((product) =>
      product.variants.some((variant) => {
        const price = variant.price.amount;
        if (price < priceRange[0] || price > priceRange[1]) return false;

        if (selectedSizes.length > 0) {
          const sizeAttr = variant.attributes.find(
            (attr) => attr.Key === "Size"
          );
          if (!sizeAttr || !selectedSizes.includes(sizeAttr.Value))
            return false;
        }

        return true;
      })
    )
    .sort((a, b) => {
      const getLowestPrice = (product: ProductType) =>
        Math.min(...product.variants.map((v) => v.price.amount));

      if (sortOption === "price-asc") {
        return getLowestPrice(a) - getLowestPrice(b);
      } else if (sortOption === "price-desc") {
        return getLowestPrice(b) - getLowestPrice(a);
      } else if (sortOption === "name-asc") {
        return a.productName.localeCompare(b.productName);
      } else if (sortOption === "name-desc") {
        return b.productName.localeCompare(a.productName);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Header */}
      <div className="lg:hidden bg-white border-b p-4">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5" />
          <h1 className="text-lg font-medium">Filtru</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filter Sidebar */}
          <div className="space-y-6">
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold mb-6">Filtru</h1>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium text-lg">Preț</h3>
                  {isPriceOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          Number.parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                      placeholder="Lei 0"
                      className="text-center"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value) || maxPrice,
                        ])
                      }
                      placeholder={`Lei ${maxPrice}`}
                      className="text-center"
                    />
                  </div>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={maxPrice}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Size Filter */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Collapsible open={isSizeOpen} onOpenChange={setIsSizeOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium text-lg">Mărimi</h3>
                  {isSizeOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {availableSizes.map((size) => (
                      <Label
                        key={size}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={(checked) =>
                            handleSizeChange(size, checked as boolean)
                          }
                        />
                        <span>{size}</span>
                      </Label>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Produse ({filteredAndSortedProducts.length})
              </h2>
              <p className="text-gray-600">
                {selectedSizes.length > 0 &&
                  `Mărimi: ${selectedSizes.join(", ")} • `}
                Preț: {priceRange[0]} - {priceRange[1]} Lei
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex justify-end mb-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="none">Sortează după</option>
                <option value="price-asc">Preț (crescător)</option>
                <option value="price-desc">Preț (descrescător)</option>
                <option value="name-asc">Alfabetic (A-Z)</option>
                <option value="name-desc">Alfabetic (Z-A)</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nu au fost găsite produse cu filtrele selectate.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setPriceRange([0, maxPrice]);
                    setSelectedSizes([]);
                    setSortOption("none");
                  }}
                >
                  Resetează filtrele
                </Button>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 gap-4">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-600">
                Pagina {currentPage} din {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Următoarea
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
