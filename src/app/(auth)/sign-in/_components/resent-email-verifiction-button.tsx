"use client";
import { Button } from "@/components/ui/button";
import { authClient, useSession } from "@/lib/authClient";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";

const VerificationEmailBtn = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return <Loader2 className="animate-spin" />;
  }
  async function handleClick() {
    setLoading(true); // Start loading
    try {
      await authClient.sendVerificationEmail({
        email: session?.user.email || "",
        // callbackURL: "/", // The redirect URL after verification
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }
  return (
    <Button
      variant={"link"}
      onClick={handleClick}
      disabled={loading}
      type="submit"
      className="p-0 m-0 cursor-pointer flex gap-2 items-center"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Mail className=" h-4 w-4 text-destructive" />
          <span>Resend Email</span>
        </>
      )}
    </Button>
  );
};

export default VerificationEmailBtn;
