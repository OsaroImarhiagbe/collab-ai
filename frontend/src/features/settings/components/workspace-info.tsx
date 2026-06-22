import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WorkspaceInfoCardProps = {
  name: string;
  description: string;
  onChange: (field: string, value: string) => void;
};

const WorkspaceInfoCard = ({
  name,
  description,
  onChange,
}: WorkspaceInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="space-y-2">
          <Label>Workspace name</Label>
          <Input
            value={name}
            onChange={(e) =>
              onChange("name", e.target.value)
            }
            placeholder="My workspace"
          />
        </div>


        <div className="space-y-2">
          <Label>Description</Label>

          <Input
            value={description}
            onChange={(e) =>
              onChange("description", e.target.value)
            }
            placeholder="Workspace description"
          />
        </div>

      </CardContent>
    </Card>
  );
};

export default WorkspaceInfoCard;