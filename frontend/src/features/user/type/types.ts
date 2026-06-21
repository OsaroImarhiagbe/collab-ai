// types.ts
// Shape these to match your actual API contracts (users, workspaces, auth modules).
// Kept separate so ProfilePage stays a pure presentational component.

export type PlatformRole = "ADMIN" | "USER" | "GUEST";
export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "GUEST";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  platformRole: PlatformRole;
  createdAt: string; // ISO timestamp
  twoFactorEnabled: boolean;
}

export interface WorkspaceMembership {
  workspaceId: string;
  workspaceName: string;
  role: WorkspaceRole;
  memberCount: number;
  // Optional small accent color / icon set by the workspace itself
  colorTag?: string;
}

export interface ActiveSession {
  sessionId: string;
  device: string; // e.g. "Chrome on macOS"
  ipAddress: string;
  location?: string; // best-effort, may be omitted entirely if you don't geo-resolve
  lastActiveAt: string; // ISO timestamp
  isCurrentSession: boolean;
}

export interface ActivityItem {
  id: string;
  type: "task_created" | "task_completed" | "comment" | "workspace_joined" | "role_changed";
  description: string;
  workspaceName?: string;
  timestamp: string; // ISO timestamp
}

export interface ProfilePageData {
  user: UserProfile;
  workspaces: WorkspaceMembership[];
  sessions: ActiveSession[];
  activity: ActivityItem[];
}

// types.ts
//
// Scoped down from the full ProfilePage: just enough to cover profile info,
// login/security, and active devices. No workspaces, no activity feed.

// export type PlatformRole = "ADMIN" | "USER" | "GUEST";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  platformRole: PlatformRole;
  createdAt: string; // ISO timestamp
  twoFactorEnabled: boolean;
}

export interface ActiveSession {
  sessionId: string;
  device: string; // e.g. "Chrome on macOS"
  ipAddress: string;
  location?: string;
  lastActiveAt: string; // ISO timestamp
  isCurrentSession: boolean;
}

export interface ProfileModalData {
  user: UserProfile;
  sessions: ActiveSession[];
}


export interface UserContextType {
  open: boolean,
  handleSetOpen:() => void
}