import { Button } from "@/components/ui/button";
import { getSession } from "@/server/auth-actions";
import Link from "next/link";
import UserProfileDropDownButton from "./user-profile-button";
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
export default async function Header() {
  const session = await getSession();
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary"></div>
          <span className="text-xl font-bold">Brand</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary"
          >
            About
          </Link>
        </nav>

        {/* Auth CTA - Desktop */}
        {!session ? (
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        ) : (
          <UserProfileDropDownButton />
        )}
      </div>
    </header>
  );
}
