"use client";
import { authClient } from "@/lib/authClient";
import { UploadButton } from "@/lib/upload-thing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const UploadThingAvatarBTN = () => {
  const router = useRouter();
  return (
    <UploadButton
      appearance={{ button: "bg-primary w-full ", allowedContent: "hidden" }}
      endpoint="imageUploader"
      
      onClientUploadComplete={async (res) => {
        // Do something with the response
        await authClient.updateUser({
          image: res[0].ufsUrl,
        });
        router.refresh();
        toast.success("Profile Pictures updated succesfuly ✅");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadThingAvatarBTN;
