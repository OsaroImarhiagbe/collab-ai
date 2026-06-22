import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  ShieldCheck,
  Mail,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  Circle,
} from "lucide-react";
import type { ProfileModalData  } from "../type/types";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function formatRelativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

const platformRoleStyles: Record<string, string> = {
  ADMIN:
    "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800",
  USER: "bg-muted text-muted-foreground border-border",
  GUEST: "bg-muted text-muted-foreground border-border",
};
const mockData: ProfileModalData = {
  user: {
    id: "u_1",
    fullName: "Emmanuel Rivera",
    email: "emmanuel@example.com",
    avatarUrl: null,
    platformRole: "ADMIN",
    createdAt: "2025-02-11T00:00:00Z",
    twoFactorEnabled: false,
  },
  sessions: [
    {
      sessionId: "s_1",
      device: "Chrome on macOS",
      ipAddress: "73.162.10.4",
      location: "Alexandria, VA",
      lastActiveAt: new Date().toISOString(),
      isCurrentSession: true,
    },
    {
      sessionId: "s_2",
      device: "Safari on iPhone",
      ipAddress: "73.162.10.4",
      location: "Alexandria, VA",
      lastActiveAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      isCurrentSession: false,
    },
    {
      sessionId: "s_3",
      device: "Firefox on Ubuntu",
      ipAddress: "104.28.4.19",
      lastActiveAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      isCurrentSession: false,
    },
  ],
};
const Profile = () => {
    const { user, sessions } = mockData;
    const [revoking, setRevoking] = useState<string | null>(null);
    async function handleRevoke(sessionId: string) {
    setRevoking(sessionId);
    try {
    //   await onRevokeSession(sessionId);
    } finally {
      setRevoking(null);
    }
  }
    return (
        <section className="px-5">
          {/* Header */}
          <div className="mb-2">
            <h1 className="leading-tight tracking-tight">Profile</h1>
            <p className="font-sans font-medium text-md tracking-tight leading-tight">Manage your profile, account information, and devices</p>
          </div>
          {/* Compact identity header */}
           <div className="mt-5">
            <h3 className="font-semibold font-sans tracking-tight leading-tight text-lg">
              Account
            </h3>
          </div>
          <Separator className="mb-5"/>
        <div className="flex items-center gap-3 pb-2">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={user.avatarUrl ?? undefined} alt={user.fullName} />
            <AvatarFallback className="text-sm font-medium">
              {initials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-muted-foreground font-sans">Preferred Name</p>
            <Input value={user.fullName} className="truncate text-base font-semibold leading-tight border-2"/>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge
            variant="outline"
            className={`ml-auto shrink-0 gap-1 text-[11px] ${platformRoleStyles[user.platformRole]}`}
          >
            <Shield className="h-3 w-3" />
            {user.platformRole}
          </Badge>
        </div>

        {/* Login information */}
        <section className="pt-3">
          <h3 className="text-lg font-semibold font-sans">
            Login information
          </h3>
           <Separator className="mb-5"/>
          <div className="bg-card space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
               <div className="flex flex-row items-center gap-2">
                  <span className="text-muted-foreground">Email</span>
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
               </div>
               <span className="truncate text-sm">{user.email}</span>
              </div>
               <span className="truncate text-sm">{user.email}</span> 
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span>Password</span>
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                // onClick={onChangePassword}
              >
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                {user.twoFactorEnabled ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span>Two-factor auth</span>
              </div>
              <Button
                variant={user.twoFactorEnabled ? "outline" : "default"}
                size="sm"
                className="h-7 text-xs"
                // onClick={onToggleTwoFactor}
              >
                {user.twoFactorEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
        </section>

        {/* Devices */}
        <section className="pt-4">
          <h3 className="mb-2 text-xs font-medium font-sans text-lg tracking-tight leading-tight text-muted-foreground">
            Devices ({sessions.length})
          </h3>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {sessions.map((session, idx) => (
              <div
                key={session.sessionId}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
                  idx !== sessions.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  {session.isCurrentSession ? (
                    <Circle className="h-2 w-2 shrink-0 fill-emerald-500 text-emerald-500" />
                  ) : (
                    <MonitorSmartphone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="truncate">{session.device}</span>
                      {session.isCurrentSession && (
                        <Badge
                          variant="outline"
                          className="h-4.5 shrink-0 px-1.5 text-[10px] font-normal text-muted-foreground"
                        >
                          this device
                        </Badge>
                      )}
                    </div>
                    <div
                      className="truncate text-xs text-muted-foreground"
                      style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)" }}
                    >
                      {session.ipAddress}
                      {session.location ? ` · ${session.location}` : ""} ·{" "}
                      {formatRelativeTime(session.lastActiveAt)}
                    </div>
                  </div>
                </div>
                {!session.isCurrentSession && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 px-2 text-xs text-muted-foreground hover:text-destructive"
                    disabled={revoking === session.sessionId}
                    onClick={() => handleRevoke(session.sessionId)}
                  >
                    <LogOut className="mr-1 h-3 w-3" />
                    {revoking === session.sessionId ? "Revoking…" : "Revoke"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </section>
        </section>
    )
}
export default Profile;