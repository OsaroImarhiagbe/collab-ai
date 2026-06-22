import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";


type InvitePeopleCardProps = {
  inviteLink: string;
  onGenerate: () => void;
};


const InvitePeopleCard = ({
  inviteLink,
  onGenerate,
}: InvitePeopleCardProps) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Invite people
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Share this link with people to join your workspace.
        </p>
        <div className="flex gap-2">
          <Input
            readOnly
            value={inviteLink}
            placeholder="Generate invite link"
          />
          <Button onClick={onGenerate}>
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


export default InvitePeopleCard;