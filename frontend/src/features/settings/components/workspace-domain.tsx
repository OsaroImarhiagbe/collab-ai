import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


type WorkspaceDomainCardProps = {
  domain: string;
  onChange: (value: string) => void;
};


const WorkspaceDomainCard = ({
  domain,
  onChange,
}: WorkspaceDomainCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace domain</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="space-y-2">
          <Label>Domain</Label>

          <Input
            value={domain}
            onChange={(e) =>
              onChange(e.target.value)
            }
            placeholder="company.com"
          />

          <p className="text-sm text-muted-foreground">
            Used for workspace URLs and organization access.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};


export default WorkspaceDomainCard;