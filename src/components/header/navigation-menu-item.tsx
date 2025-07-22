"use client";

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { navigationMenuTriggerStyle, RenderDropdownItems } from "./navigation";
import { useState } from "react";
import { NavItem } from "./constants";
import { cn } from "@/lib/utils";

export const NavigationMenuItemComponent = (item: NavItem) => {
  // const [open, setOpen] = useState(false);

  return (
    <NavigationMenuItem key={item.label} className="relative">
      <div
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
      >
        <DropdownMenu
        // open={open} onOpenChange={setOpen}
        >
          <DropdownMenuTrigger asChild>
            <button className={cn("flex items-center ",navigationMenuTriggerStyle())}>
              {item.label}
              <ChevronDownIcon
                className={` size-3 transition-transform `}
                //   className={`ml-1 size-3 transition-transform
                //     ${open ? "rotate-180" : ""}`
                // }
                aria-hidden="true"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="  p-4 flex flex-col items-center">
            <RenderDropdownItems items={item.children!} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </NavigationMenuItem>
  );
};
