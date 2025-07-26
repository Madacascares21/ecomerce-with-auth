import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function SizeFilter({
  availableSizes,
  selectedSizes,
  onSizeChange,
  isOpen,
  setIsOpen,
}: {
  availableSizes: string[];
  selectedSizes: string[];
  onSizeChange: (size: string, checked: boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium text-lg">Mărimi</h3>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            {availableSizes.map((size) => (
              <Label key={size} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) =>
                    onSizeChange(size, checked as boolean)
                  }
                />
                <span>{size}</span>
              </Label>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
