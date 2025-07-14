import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function PrivacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Manage your privacy settings and control who can see your information.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Profile Privacy</CardTitle>
          <CardDescription>Control who can see your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Visibility</Label>
            <RadioGroup defaultValue="public">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="followers" id="followers" />
                <Label htmlFor="followers">Followers only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private">Private</Label>
              </div>
            </RadioGroup>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="online-status">Online Status</Label>
              <p className="text-sm text-muted-foreground">Show when you're active on the platform.</p>
            </div>
            <Switch id="online-status" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Cookies</CardTitle>
          <CardDescription>Manage how your data is used and stored.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Analytics Cookies</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect anonymous usage data to improve our service.
              </p>
            </div>
            <Switch id="analytics" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="personalization">Personalization</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to personalize your experience based on your activity.
              </p>
            </div>
            <Switch id="personalization" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="third-party">Third-Party Sharing</Label>
              <p className="text-sm text-muted-foreground">Allow us to share your data with trusted partners.</p>
            </div>
            <Switch id="third-party" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Download my data</Button>
          <Button>Save preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
