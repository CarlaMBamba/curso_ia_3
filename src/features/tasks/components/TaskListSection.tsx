import { Stack, Typography } from "@mui/material";

import { EmptyTaskState } from "./EmptyTaskState";
import { TaskCard } from "./TaskCard";

import type { Task } from "../types/Task";

type TaskListSectionProps = {
  tasks: Task[];
};

// TaskListSection renderiza la coleccion ordenada o un estado vacio simple.
export function TaskListSection({ tasks }: TaskListSectionProps) {
  if (tasks.length === 0) {
    return <EmptyTaskState />;
  }

  return (
    <Stack component="section" spacing={2}>
      <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
        Tareas priorizadas
      </Typography>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Stack>
  );
}
