import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PriceFilter({
  priceRange,
  setPriceRange,
  isOpen,
  setIsOpen,
  maxPrice,
}: {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  maxPrice: number;
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium text-lg">Preț</h3>
          {isOpen ? (
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
                setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
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
                  parseInt(e.target.value) || maxPrice,
                ])
              }
              placeholder={`Lei ${maxPrice}`}
              className="text-center"
            />
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={maxPrice}
            min={0}
            step={1}
            className="px-2"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
