import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose when and how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Notification Frequency</Label>
            <RadioGroup defaultValue="immediately">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediately" id="immediately" />
                <Label htmlFor="immediately">Immediately</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily digest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly digest</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Notifications</CardTitle>
          <CardDescription>Choose which activities you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">When someone mentions you in a comment or post.</p>
            </div>
            <Switch id="mentions" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comments">Comments</Label>
              <p className="text-sm text-muted-foreground">When someone comments on your posts.</p>
            </div>
            <Switch id="comments" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="follows">Follows</Label>
              <p className="text-sm text-muted-foreground">When someone follows you.</p>
            </div>
            <Switch id="follows" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
