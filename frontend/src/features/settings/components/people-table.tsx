import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import type { Person } from "@/features/settings/type/types"


type Props = {
  people: Person[];
};


const PeopleTable = ({
  people,
}: Props) => {


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            Email
          </TableHead>
          <TableHead>
            Role
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.id}>
            <TableCell>
              {person.name}
            </TableCell>
            <TableCell>
              {person.email}
            </TableCell>
            <TableCell>
              {person.role}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default PeopleTable;