"use client";
import React, { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/server/auth-actions";
import { Loader2, LogOut } from "lucide-react";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DropdownLogoutMenuItem = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true); // Start loading
    try {
      await signOut();
      toast.success("Sign Out succesfuly 😁");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }
  return (
    <DropdownMenuItem
      variant="destructive"
      onSelect={(e) => {
        e.preventDefault(); // prevent closing
      }}
    >
      <button
        onClick={handleClick}
        disabled={loading}
        type="submit"
        className="p-0 m-0 cursor-pointer flex gap-2 items-center"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <LogOut className=" h-4 w-4 text-destructive" />
            <span>Log Out</span>
          </>
        )}
      </button>
    </DropdownMenuItem>
  );
};

export default DropdownLogoutMenuItem;
