import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


import type { PeopleTab } from "@/features/settings/type/types";


type Props = {
  value: PeopleTab;
  onChange: (value: PeopleTab) => void;
};


const PeopleTabs = ({
  value,
  onChange,
}: Props) => {

  return (
    <Tabs
      value={value}
      onValueChange={(v) =>
        onChange(v as PeopleTab)
      }
    >
      <TabsList>
        <TabsTrigger value="guests">
          Guests
        </TabsTrigger>
        <TabsTrigger value="members">
          Members
        </TabsTrigger>
        <TabsTrigger value="groups">
          Groups
        </TabsTrigger>
        <TabsTrigger value="contacts">
          Contacts
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};


export default PeopleTabs;