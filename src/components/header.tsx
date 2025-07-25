import { Button } from "@/components/ui/button";
import { getSession } from "@/server/auth-actions";
import Link from "next/link";
import UserProfileDropDownButton from "./user-profile-button";
import Navigation from "./header/navigation";
import { NavSheet } from "./header/mobile-navigation";
import {
  Badge,
  Heart,
  HelpCircle,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Input } from "./ui/input";
import AccountButton from "./AccountButton";
import Container from "./Container";
export type SessionType = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined | undefined;
    userAgent?: string | null | undefined | undefined;
  };
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  };
} | null;
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
const navItems = [
  { name: "Produse", href: "#", active: true },
  { name: "Regilate", href: "#" },
  { name: "Card eMAG", href: "#" },
  { name: "Genius", href: "#" },
  { name: "Genius Deals", href: "#" },
  { name: "Easy BuyBack", href: "#" },
  { name: "Ofertele eMAG", href: "#" },
];
export default async function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary  border-b">
        <Container className="py-0">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-4 text-white">
              <span className="">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <a href="#">Help</a>
              <a href="#">Track Order</a>
              <a href="#">Store Locator</a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Container className="py-2 border-b">
        <div className="flex items-center justify-between h-16">
          <NavSheet />
          {/* Logo */}
          <div className="flex items-center flex-1">
            <a href="#" className="text-2xl font-bold text-gray-900">
              ShopHub
            </a>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden lg:flex items-center">
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-light transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div> */}

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <AccountButton />

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10 pr-4 w-full"
          />
        </div>
      </div>
      <nav className="hidden  px-4 py-2 md:block">
        <Container className="py-0 flex items-center justify-between ">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="font-thin">
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            href="#"
            className="flex items-center space-x-1  text-sm font-medium hover:text-gray-200 transition-colors hover:bg-white/10 px-3 py-1 rounded-md"
          >
            <span className="font-thin">eMAG Help</span>
          </Link>
        </Container>
      </nav>
    </header>
  );
}
