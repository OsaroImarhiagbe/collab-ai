import { useState } from "react";

import WorkspaceInfoCard from "@/features/settings/components/workspace-info"
import WorkspaceDomainCard from "@/features/settings/components/workspace-domain"

import type { WorkspaceSettings } from "@/features/settings/type/types";


const WorkspaceSettingsPage = () => {

  const [settings, setSettings] =
    useState<WorkspaceSettings>({
      name: "Acme Workspace",
      domain: "acme.com",
      description: "Team workspace",
    });


  const updateSetting = (
    field: string,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          General
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your workspace details and configuration.
        </p>
      </div>
      <WorkspaceInfoCard
        name={settings.name}
        description={settings.description}
        onChange={updateSetting}
      />
      <WorkspaceDomainCard
        domain={settings.domain}
        onChange={(value) =>
          updateSetting("domain", value)
        }
      />
    </div>
  );
};


export default WorkspaceSettingsPage;