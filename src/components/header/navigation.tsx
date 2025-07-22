import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { NavigationMenuItemComponent } from "./navigation-menu-item";
import { navConfig, NavItem } from "./constants";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
export const navigationMenuTriggerStyle = cva(
  "text-foreground/80 hover:text-foreground py-2 font-bold text-md hover:bg-none"
)
export const RenderDropdownItems = ({ items }: { items: NavItem[] }) => {
  return (
    <>
      {items.map((item) =>
        item.children ? (
          <DropdownMenuSub key={item.label}>
            <DropdownMenuSubTrigger >{item.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent >
              <RenderDropdownItems items={item.children} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem className={cn( navigationMenuTriggerStyle()," text-sm")} key={item.label} asChild >
            <Link className="cursor-pointer" href={item.link || "#"}>{item.label}</Link>
          </DropdownMenuItem>
        )
      )}
    </>
  );
};

const Navigation = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn("flex  text-sm", className)}>
        {navConfig.map((item) =>
          item.children ? (
            <NavigationMenuItemComponent key={item.label} {...item} />
          ) : (
            <NavigationMenuItem key={item.label} className={cn("", navigationMenuTriggerStyle())}>
              <NavigationMenuLink asChild>
                <Link href={item.link || "#"}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
