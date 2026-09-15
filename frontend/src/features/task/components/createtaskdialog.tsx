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
import { useWorkSpace } from "@/context/workspace/workspaceContext";
export default function CreateTaskDialog({
  onCreateTask,
  trigger,
}: CreateTaskDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const{ open, handleOpenCreateTask } = useWorkSpace()

  async function handleSubmit(data: CreateTaskInput) {
    setIsSubmitting(true);
    try {
      // await onCreateTask(data);
      handleOpenCreateTask();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenCreateTask}>
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
          onCancel={() => handleOpenCreateTask()}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}