'use client'
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Mail, MoreHorizontal } from "lucide-react";
import { initials } from "@/features/team/helper-functions/functions";
import { Role } from "@/features/team/types/types";
// Replace with a query to your members endpoint (e.g. GET /workspaces/:id/members)
const MEMBERS = [
  {
    id: "1",
    name: "Ava Chen",
    email: "ava@collabai.dev",
    role: "Owner",
    status: "online",
    avatarUrl: "",
  },
  {
    id: "2",
    name: "Marcus Reid",
    email: "marcus@collabai.dev",
    role: "Admin",
    status: "online",
    avatarUrl: "",
  },
  {
    id: "3",
    name: "Priya Nair",
    email: "priya@collabai.dev",
    role: "Member",
    status: "away",
    avatarUrl: "",
  },
  {
    id: "4",
    name: "Diego Alvarez",
    email: "diego@collabai.dev",
    role: "Member",
    status: "offline",
    avatarUrl: "",
  },
  {
    id: "5",
    name: "Sophie Laurent",
    email: "sophie@collabai.dev",
    role: "Member",
    status: "online",
    avatarUrl: "",
  },
  {
    id: "6",
    name: "Jordan Blake",
    email: "jordan@collabai.dev",
    role: "Viewer",
    status: "offline",
    avatarUrl: "",
  },
];

const ROLE_ORDER = ["Owner", "Admin", "Member", "Viewer"];

const ROLE_BADGE_VARIANT = {
  Owner: "default",
  Admin: "secondary",
  Member: "outline",
  Viewer: "outline",
};

const STATUS_STYLES = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-slate-300",
};



export default function Page() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");

  const filtered = useMemo(() => {
    return MEMBERS.filter((member) => {
      const matchesQuery =
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole =
        roleFilter === "All roles" || member.role === roleFilter;
      return matchesQuery && matchesRole;
    }).sort((a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role));
  }, [query, roleFilter]);

  return (
    <div className="min-h-dvh p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">
            {MEMBERS.length} members in this workspace
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email"
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                {roleFilter}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["All roles", ...ROLE_ORDER].map((role) => (
                <DropdownMenuItem key={role} onClick={() => setRoleFilter(role)}>
                  {role}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <p className="text-sm font-medium">No members match your search</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different name, email, or role filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((member) => (
              <Card key={member.id} className="transition-colors hover:bg-accent/40">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="relative shrink-0">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{initials(member.name)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${STATUS_STYLES[member.status]}`}
                      title={member.status}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{member.name}</p>
                      <button className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <Mail className="h-3 w-3 shrink-0" />
                      {member.email}
                    </p>
                    <Badge
                      variant={ROLE_BADGE_VARIANT[member.role]}
                      className="mt-2 font-normal"
                    >
                      {member.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}