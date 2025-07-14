import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/server/auth-actions";
import LogoutMenuItem from "./dropdown-log-out-menu-item";
import SettingsMenuItem from "./dropdown-settings-menu-item";
import UserAvatar from "./user-avatar";
import { SecuritySettings } from "./settingsDialog/tabs/security-settings";
import { Shield, User2 } from "lucide-react";
import { JSX } from "react";
import { ProfileSettings } from "./settingsDialog/tabs/profile-settings";
type DialogContentType = {
  label: string;
  children?: JSX.Element;
  icon?: React.ReactNode;
  description?: string;
};
const UserProfileDropDownButton = async () => {
  const dialogContent: DialogContentType[] = [
    {
      label: "Profile",
      children: <ProfileSettings />,
      icon: <User2 />,
      description: "Manage your security settings and protect your account.",
    },
    {
      label: "Security",
      children: <SecuritySettings />,
      icon: <Shield />,
      description: "Manage your security settings and protect your account.",
    },
  ] as const;
  const data = await getSession();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar className="size-10" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel>
            <div className="flex  gap-4 py-1 items-center justify-center">
              <UserAvatar className="size-11 " />
              <div className="flex flex-col">
                <span className="text-md">{data?.user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {data?.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SettingsMenuItem dialogContent={dialogContent} />
          <LogoutMenuItem />
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileDropDownButton;
