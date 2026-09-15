"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTaskForm from "./createtaskform";
import type { CreateTaskDialogProps, CreateTaskInput } from "@/features/task/types/types";
import { useWorkSpaceStore } from "@/features/workspace/store/useWorkSpaceStore";


export default function CreateTaskDialog({
  onCreateTask,
  trigger,
}: CreateTaskDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openCreateTaskDialog = useWorkSpaceStore( state => state.openCreateTaskDialog)
  const open_createdialog = useWorkSpaceStore( state => state.open_createdialog)

  async function handleSubmit(data: CreateTaskInput) {
    setIsSubmitting(true);
    try {
      // await onCreateTask(data);
      openCreateTaskDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open_createdialog} onOpenChange={openCreateTaskDialog}>
      <DialogTrigger>
        {trigger ?? (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>
        <CreateTaskForm
          onSubmit={handleSubmit}
          onCancel={() => openCreateTaskDialog(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}