"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Link2, Check, Mail, Clock } from "lucide-react";

// Replace with your invites endpoint (e.g. GET/POST /workspaces/:id/invites)
const INITIAL_PENDING = [
  { id: "p1", email: "harper@collabai.dev", role: "Member", sentAt: "2 days ago" },
  { id: "p2", email: "leo@collabai.dev", role: "Viewer", sentAt: "5 days ago" },
];

const ROLES = ["Admin", "Member", "Viewer"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVITE_LINK = "https://collabai.dev/join/9f3a1c";

function EmailChip({ email, valid, onRemove }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm ${
        valid ? "border-input bg-muted" : "border-destructive/50 bg-destructive/10 text-destructive"
      }`}
    >
      {email}
      <button onClick={onRemove} className="rounded-sm hover:bg-background/60">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export default function Page() {
  const [draft, setDraft] = useState("");
  const [emails, setEmails] = useState([]);
  const [role, setRole] = useState("Member");
  const [pending, setPending] = useState(INITIAL_PENDING);
  const [linkCopied, setLinkCopied] = useState(false);

  const addEmails = (raw) => {
    const parts = raw
      .split(/[,\s]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (!parts.length) return;
    setEmails((prev) => [...prev, ...parts.filter((p) => !prev.includes(p))]);
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      if (draft.trim()) {
        e.preventDefault();
        addEmails(draft);
      }
    } else if (e.key === "Backspace" && !draft && emails.length) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };

  const removeEmail = (email) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  const sendInvites = () => {
    if (!emails.length) return;
    const newInvites = emails.map((email) => ({
      id: `${email}-${Date.now()}`,
      email,
      role,
      sentAt: "Just now",
    }));
    setPending((prev) => [...newInvites, ...prev]);
    setEmails([]);
  };

  const revokeInvite = (id) => {
    setPending((prev) => prev.filter((invite) => invite.id !== id));
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(INVITE_LINK);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500);
  };

  const allValid = emails.every((e) => EMAIL_RE.test(e));

  return (
    <section className="min-h-screen w-full bg-background p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Invite people</h1>
          <p className="text-sm text-muted-foreground">
            Add teammates to this workspace by email, or share an invite link.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invite by email</CardTitle>
            <CardDescription>
              Enter one or more addresses, separated by commas or spaces.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background p-2 focus-within:ring-1 focus-within:ring-ring">
              {emails.map((email) => (
                <EmailChip
                  key={email}
                  email={email}
                  valid={EMAIL_RE.test(email)}
                  onRemove={() => removeEmail(email)}
                />
              ))}
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => draft.trim() && addEmails(draft)}
                placeholder={emails.length ? "" : "name@company.com"}
                className="min-w-[140px] flex-1 bg-transparent px-1 py-1 text-sm outline-none"
              />
            </div>

            {emails.length > 0 && !allValid && (
              <p className="text-xs text-destructive">
                One or more addresses don't look like a valid email.
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Role</span>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={sendInvites}
                disabled={!emails.length || !allValid}
              >
                Send invite{emails.length > 1 ? "s" : ""}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Invite link</p>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can join as a Member
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={copyLink}>
              {linkCopied ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                </>
              ) : (
                "Copy link"
              )}
            </Button>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">
            Pending invitations{" "}
            <span className="text-muted-foreground">({pending.length})</span>
          </h2>
        </div>

        {pending.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
            No invitations waiting on a response.
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {pending.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between gap-3 rounded-md border px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm">{invite.email}</span>
                  <Badge variant="outline" className="font-normal">
                    {invite.role}
                  </Badge>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {invite.sentAt}
                  </span>
                  <button
                    onClick={() => revokeInvite(invite.id)}
                    className="text-xs font-medium text-muted-foreground hover:text-destructive"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}