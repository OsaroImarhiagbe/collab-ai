'use client'
import { useState } from "react";

import InvitePeopleCard from "@/features/settings/components/people-invite";
import PeopleTabs from "@/features/settings/components/people-tab";
import PeopleTable from "@/features/settings/components/people-table"


import type {
  Person,
  PeopleTab,
} from "@/features/settings/type/types";


const PeoplePage = () => {


  const [activeTab, setActiveTab] =
    useState<PeopleTab>("members");


  const [inviteLink, setInviteLink] =
    useState("");


  const people: Person[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "Admin",
      type: "member",
    },

    {
      id: "2",
      name: "Sarah Lee",
      email: "sarah@example.com",
      role: "Member",
      type: "member",
    },

    {
      id: "3",
      name: "Guest User",
      email: "guest@example.com",
      role: "Guest",
      type: "guest",
    },
  ];



  const filteredPeople =
    people.filter((person) => {

      if(activeTab === "members")
        return person.type === "member";


      if(activeTab === "guests")
        return person.type === "guest";


      return true;

    });



  const generateInvite = () => {
    setInviteLink(
      "https://workspace.app/invite/abc123"
    );
  };



  return (

    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          People
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage workspace members, guests, and roles.
        </p>
      </div>
      <InvitePeopleCard
        inviteLink={inviteLink}
        onGenerate={generateInvite}
      />
      <PeopleTabs
        value={activeTab}
        onChange={setActiveTab}
      />
      <PeopleTable
        people={filteredPeople}
      />
    </div>

  );
};


export default PeoplePage;