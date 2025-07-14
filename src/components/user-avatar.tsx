import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getSession } from "@/server/auth-actions";
import { AvatarProps } from "@radix-ui/react-avatar";
import React from "react";

interface UserAvatarProps
  extends React.ComponentProps<
    React.ForwardRefExoticComponent<
      AvatarProps & React.RefAttributes<HTMLSpanElement>
    >
  > {}

const UserAvatar = async ({ className, ...props }: UserAvatarProps) => {
  const data = await getSession();
  return (
    <Avatar className={cn(className, "cursor-pointer")} {...props}>
      <AvatarImage src={data?.user.image || undefined} />
      <AvatarFallback>{data?.user.name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
