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

export const RenderDropdownItems = ({ items }: { items: NavItem[] }) => {
  return (
    <>
      {items.map((item) =>
        item.children ? (
          <DropdownMenuSub key={item.label}>
            <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <RenderDropdownItems items={item.children} />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem key={item.label} asChild>
            <Link className="cursor-pointer" href={item.link || "#"}>{item.label}</Link>
          </DropdownMenuItem>
        )
      )}
    </>
  );
};

const Navigation = () => {
  return (
    <div className=" hidden md:block mr-auto">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4 text-sm">
          {navConfig.map((item) =>
            item.children ? (
              <NavigationMenuItemComponent key={item.label} {...item} />
            ) : (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                  <Link href={item.link || "#"}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
