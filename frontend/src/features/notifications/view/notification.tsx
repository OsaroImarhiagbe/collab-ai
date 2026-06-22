import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState({
    inApp: {
      mentions: true,
      updates: true,
      messages: false,
    },
    email: {
      mentions: true,
      weeklySummary: true,
      productUpdates: false,
    },
  });

  const updateNotification = (section: "inApp" | "email",key: string,value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-sm text-muted-foreground">
          Manage when and how you receive notifications.
        </p>
      </div>

      {/* In-App Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>In-app notifications</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <NotificationSetting
            title="Mentions"
            description="Get notified when someone mentions you."
            checked={notifications.inApp.mentions}
            onChange={(value) =>
              updateNotification("inApp", "mentions", value)
            }
          />

          <Separator />

          <NotificationSetting
            title="Account updates"
            description="Receive notifications about changes to your account."
            checked={notifications.inApp.updates}
            onChange={(value) =>
              updateNotification("inApp", "updates", value)
            }
          />

          <Separator />

          <NotificationSetting
            title="Messages"
            description="Get notified when you receive new messages."
            checked={notifications.inApp.messages}
            onChange={(value) =>
              updateNotification("inApp", "messages", value)
            }
          />
        </CardContent>
      </Card>


      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Email notifications</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <NotificationSetting
            title="Mentions"
            description="Receive emails when someone mentions you."
            checked={notifications.email.mentions}
            onChange={(value) =>
              updateNotification("email", "mentions", value)
            }
          />

          <Separator />

          <NotificationSetting
            title="Weekly summary"
            description="Get a weekly overview of your activity."
            checked={notifications.email.weeklySummary}
            onChange={(value) =>
              updateNotification("email", "weeklySummary", value)
            }
          />

          <Separator />

          <NotificationSetting
            title="Product updates"
            description="Receive emails about new features and improvements."
            checked={notifications.email.productUpdates}
            onChange={(value) =>
              updateNotification("email", "productUpdates", value)
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};


function NotificationSetting({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <Label className="text-sm font-medium">{title}</Label>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
}

export default NotificationsPage;