"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  KanbanIcon,
  ListTodoIcon,
  CalendarDaysIcon,
  UsersIcon,
  Settings2Icon,
  FolderKanbanIcon,
  RocketIcon,
  BriefcaseIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Alex Kim",
    email: "alex@acme.com",
    avatar: "/avatars/alex.jpg",
  },
  teams: [
    {
      name: "Workspace 1",
      logo: <BriefcaseIcon />,
      plan: "Enterprise",
    },
    {
      name: "Workspace 2",
      logo: <RocketIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        { title: "My Tasks",   url: "my-task" },
        { title: "Assigned",   url: "#" },
      ],
    },
    {
      title: "Board",
      url: "#",
      icon: <KanbanIcon />,
      items: [
        { title: "Sprint 14",  url: "/sprint-14" },
        { title: "Backlog",    url: "#" },
        { title: "Roadmap",    url: "#" },
      ],
    },
    {
      title: "Tasks",
      url: "#",
      icon: <ListTodoIcon />,
      items: [
        { title: "All Tasks",   url: "/board" },
        { title: "In Progress", url: "#" },
        { title: "Completed",   url: "#" },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: <CalendarDaysIcon />,
      items: [
        { title: "Month View",  url: "#" },
        { title: "Week View",   url: "#" },
        { title: "Deadlines",   url: "#" },
      ],
    },
    {
      title: "Members",
      url: "#",
      icon: <UsersIcon />,
      items: [
        { title: "Team",        url: "#" },
        { title: "Workload",    url: "#" },
        { title: "Invite",      url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
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
      icon: <FolderKanbanIcon />,
    },
    {
      name: "Marketing Campaign",
      url: "#",
      icon: <BriefcaseIcon />,
    },
    {
      name: "Platform Infra",
      url: "#",
      icon: <RocketIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
