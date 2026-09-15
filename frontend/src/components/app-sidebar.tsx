"use client"
import * as React from "react"
import { NavMain } from "@/components/nav-main"
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
  KanbanIcon,
  CalendarDaysIcon,
  UsersIcon,
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
      name: "Workspace",
      logo: <BriefcaseIcon />,
      plan: "Enterprise",
    },
    {
      name: "Workspace",
      logo: <RocketIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    // {
    //   title: "Overview",
    //   url: "#",
    //   icon: <LayoutDashboardIcon />,
    //   isActive: true,
    //   items: [
    //     { title: "My Tasks",   url: "/task/" },
    //     { title: "Assigned",   url: "#" },
    //   ],
    // },
    {
      title: "Board",
      url: "/",
      icon: <KanbanIcon />,
      items: [
        { title: "Sprint 14",  url: "/" },
        // { title: "Backlog",    url: "#" },
        // { title: "Roadmap",    url: "#" },
        { title: "My Tasks",   url: "/task/2" },
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
        { title: "Team",        url: "/team" },
        { title: "Invite",      url: "/invite" },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: <Settings2Icon />,
    //   items: [
    //     { title: "General",     url: "#" },
    //     { title: "Workspace",   url: "#" },
    //     { title: "Billing",     url: "#" },
    //     { title: "Notifications", url: "#" },
    //   ],
    // },
  ],
}

export function AppSidebar({ workspace_name, ...props }:{ workspace_name:string} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} workspace_name={workspace_name} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
