"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RemoveAvatarBTN = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true); // Start loading
    try {
      await authClient.updateUser({
        image: "",
      });
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="outline"
      size="sm"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Remove picture"}
    </Button>
  );
};

export default RemoveAvatarBTN;
