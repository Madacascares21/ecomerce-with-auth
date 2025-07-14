import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/server/auth-actions";
import UserAvatar from "../../user-avatar";
import ProfileInfo from "./profileInfo";
import RemoveAvatarBTN from "./profileSettings/remove-picture-btn";
import UploadThingAvatarBTN from "../upload-button/upload-thing-avatar-btn";
export async function ProfileSettings() {
  const session = await getSession();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Your profile picture will be shown across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <UserAvatar className="h-24 w-24" />
            <div className="grid gap-2">
              {/* <Button variant="outline" size="sm">
                Upload new picture
              </Button> */}
              <UploadThingAvatarBTN />
              <RemoveAvatarBTN />
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileInfo session={session} />
    </div>
  );
}
