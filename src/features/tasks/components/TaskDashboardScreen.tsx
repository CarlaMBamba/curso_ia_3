import { Stack, Typography } from "@mui/material";

import { TaskListSection } from "./TaskListSection";
import { useTasks } from "../hooks/useTasks";

// TaskDashboardScreen centraliza el estado de tareas y compone la vista principal.
export function TaskDashboardScreen() {
  const { orderedTasks } = useTasks();

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography component="h2" variant="h4" sx={{ fontWeight: 700 }}>
          Prioriza con claridad
        </Typography>
        <Typography color="text.secondary">
          Gestiona tareas en memoria y revisa primero las pendientes con mayor ICE.
        </Typography>
      </Stack>

      <TaskListSection tasks={orderedTasks} />
    </Stack>
  );
}
