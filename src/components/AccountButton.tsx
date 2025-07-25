import React from "react";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import UserProfileDropDownButton from "./user-profile-button";
import { getSession } from "@/server/auth-actions";
const AccountButton = async () => {
  const session = await getSession();

  return (
    <>
      {!session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <div className="flex items-start gap-3 ">
                <div className="flex-1 w-max">
                  <p className="w-xs mb-3">
                    Conecteaza te sau creaza-ti un cont pentru a beneficia de
                    toate serviciile
                  </p>
                  <div className="md:flex items-center gap-4 hidden">
                    <Button variant="link" asChild>
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild className="rounded-full">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <UserProfileDropDownButton />
      )}
    </>
  );
};

export default AccountButton;
