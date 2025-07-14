"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

interface LoadingButtonProps extends ButtonProps {
  label: string;
  action: () => Promise<any>;
  icon?: React.ComponentType<{ className?: string }>;
  iconStyle?: string;
  succesMessage?: string;
}

const LoadingButton = ({
  icon: Icon,
  iconStyle,
  action,
  label,
  className,
  succesMessage,
  ...props
}: LoadingButtonProps) => {
  const mutation = useMutation({
    mutationFn: action,
  });

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (mutation.isSuccess && !hasShownToast.current) {
      toast.success(succesMessage || "✅");
      hasShownToast.current = true;
    }
    if (mutation.error && !hasShownToast.current) {
      toast.error(mutation.error.message || "Something went wrong");
      hasShownToast.current = true;
    }
    if (mutation.isPaused) {
      hasShownToast.current = false; // reset for next mutation
    }
  }, [mutation.isSuccess, mutation.error, mutation.isPaused, succesMessage]);

  function handleClick() {
    mutation.mutate();
  }

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      className={cn(className)}
      {...props}
    >
      {mutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          {Icon && <Icon className={iconStyle} />}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default LoadingButton;
