export type Theme = "light" | "dark" | "system";
export type AccentColor = "purple" | "blue" | "teal" | "green" | "coral" | "pink";

export type WorkspaceSettings = {
  name: string;
  domain: string;
  description: string;
};

export type PersonRole =
  | "Admin"
  | "Member"
  | "Guest";


export type Person = {
  id: string;
  name: string;
  email: string;
  role: PersonRole;
  type: "member" | "guest" | "contact";
};


export type PeopleTab =
  | "guests"
  | "members"
  | "groups"
  | "contacts";