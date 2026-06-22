import type { Column, Member } from "@/features/workspace/type/type"

export const MEMBERS: Member[] = [
  { id: "ak", initials: "AK", name: "Alex Kim",     color: "bg-violet-200 text-violet-800" },
  { id: "mr", initials: "MR", name: "Maya Rowe",    color: "bg-emerald-200 text-emerald-800" },
  { id: "js", initials: "JS", name: "Jordan Shaw",  color: "bg-orange-200 text-orange-800" },
  { id: "tp", initials: "TP", name: "Tyler Park",   color: "bg-blue-200 text-blue-800" },
];

const [AK, MR, JS, TP] = MEMBERS;

export const INITIAL_COLUMNS: Column[] = [
  {
    id: "backlog",
    label: "Backlog",
    color: "#94a3b8",
    tasks: [
      { id: "b1", title: "Audit competitor onboarding flows", tag: "Research", priority: "low",    assignees: [AK],     dueDate: "Jun 3" },
      { id: "b2", title: "Define new icon language for v3",   tag: "Design",   priority: "medium", assignees: [JS],     dueDate: "Jun 8" },
      { id: "b3", title: "Spike: evaluate Redis for sessions",tag: "Backend",  priority: "low",    assignees: [TP],     dueDate: "Jun 10" },
    ],
  },
  {
    id: "in_progress",
    label: "In Progress",
    color: "#3b82f6",
    tasks: [
      { id: "p1", title: "Fix race condition in auth refresh",       tag: "Bug",     priority: "high",   assignees: [MR],     dueDate: "May 22", isOverdue: true },
      { id: "p2", title: "Redesign empty state for dashboard",       tag: "Design",  priority: "high",   assignees: [JS],     dueDate: "May 24" },
      { id: "p3", title: "Implement webhook delivery retry queue",   tag: "Backend", priority: "medium", assignees: [TP],     dueDate: "May 28" },
      { id: "p4", title: "Add bulk invite to workspace settings",    tag: "Feature", priority: "medium", assignees: [AK],     dueDate: "May 30" },
    ],
  },
  {
    id: "in_review",
    label: "In Review",
    color: "#f59e0b",
    tasks: [
      { id: "r1", title: "Real-time cursor presence on board",        tag: "Feature", priority: "high",   assignees: [MR, AK], dueDate: "May 22" },
      { id: "r2", title: "Migrate file upload to S3 multipart",       tag: "Backend", priority: "medium", assignees: [TP],     dueDate: "May 23" },
      { id: "r3", title: "Update typography to new design tokens",    tag: "Design",  priority: "low",    assignees: [JS],     dueDate: "May 25" },
    ],
  },
  {
    id: "done",
    label: "Done",
    color: "#10b981",
    tasks: [
      { id: "d1", title: "Notification preference center",            tag: "Feature", priority: "low", assignees: [AK], dueDate: "May 19" },
      { id: "d2", title: "Rate limiting on public API endpoints",     tag: "Backend", priority: "low", assignees: [TP], dueDate: "May 18" },
      { id: "d3", title: "Timezone offset bug in recurring tasks",    tag: "Bug",     priority: "low", assignees: [MR], dueDate: "May 16" },
    ],
  },
];



export const data = {
  user: {
    name: "Alex Kim",
    email: "alex@acme.com",
    avatar: "/avatars/alex.jpg",
  },
  teams: [
    {
      name: "Workspace 1",
      plan: "Enterprise",
    },
    {
      name: "Workspace 2",
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      isActive: true,
      items: [
        { title: "My Tasks",   url: "my-task" },
        { title: "Assigned",   url: "#" },
      ],
    },
    {
      title: "Board",
      url: "#",
      items: [
        { title: "Sprint 14",  url: "/sprint-14" },
        { title: "Backlog",    url: "#" },
        { title: "Roadmap",    url: "#" },
      ],
    },
    {
      title: "Tasks",
      url: "#",
      items: [
        { title: "All Tasks",   url: "/board" },
        { title: "In Progress", url: "#" },
        { title: "Completed",   url: "#" },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      items: [
        { title: "Month View",  url: "#" },
        { title: "Week View",   url: "#" },
        { title: "Deadlines",   url: "#" },
      ],
    },
    {
      title: "Members",
      url: "#",
      items: [
        { title: "Team",        url: "#" },
        { title: "Workload",    url: "#" },
        { title: "Invite",      url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        { title: "General",     url: "#" },
        { title: "Workspace",   url: "#" },
        { title: "Billing",     url: "#" },
        { title: "Notifications", url: "#" },
      ],
    },
  ],
  projects: [
    {
      name: "Product — Sprint 14",
      url: "#",
    },
    {
      name: "Marketing Campaign",
      url: "#",
    },
    {
      name: "Platform Infra",
      url: "#",
    },
  ],
}