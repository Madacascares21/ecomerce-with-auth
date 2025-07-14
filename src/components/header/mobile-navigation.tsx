"use client";

import * as React from "react";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { navConfig, NavItem as NavItemType } from "./constants";




const NavItem = ({ item, level = 0 }: { item: NavItemType; level?: number }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <a
        href={item.label}
        className={cn(
          "flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md",
          level > 0 && "pl-2",
          level > 1 && "pl-2",
          level > 2 && "pl-2"
        )}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md",
            level > 0 && "pl-2",
            level > 1 && "pl-2",
            level > 2 && "pl-2"
          )}
        >
          <span>{item.label}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1">
        <div className="border-l-2 border-gray-200 ml-5 pl-2">
          {item.children?.map((child, index) => (
            <NavItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Navigation = () => {
  return (
    <nav className="py-2">
      {navConfig.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </nav>
  );
};

export function NavSheet() {
  return (
    <div className="md:hidden ml-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="text-foreground size-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[350px] overflow-auto"
        >
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <Navigation />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
