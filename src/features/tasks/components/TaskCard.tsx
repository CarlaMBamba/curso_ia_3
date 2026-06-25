import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import type { Task } from "../types/Task";

type TaskCardProps = {
  task: Task;
};

const statusLabels: Record<Task["status"], string> = {
  completed: "Completada",
  pending: "Pendiente",
};

// TaskCard presenta una tarea con su estado y puntuacion ICE calculada.
export function TaskCard({ task }: TaskCardProps) {
  const isCompleted = task.status === "completed";

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: isCompleted ? "divider" : "primary.light",
        opacity: isCompleted ? 0.78 : 1,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            <Box>
              <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                {task.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {task.description || "Sin descripcion."}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <Chip
                color={isCompleted ? "default" : "success"}
                label={statusLabels[task.status]}
                size="small"
              />
              <Chip color="primary" label={`ICE ${task.iceScore.toFixed(1)}`} size="small" />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip label={`Impacto ${task.impact}`} size="small" variant="outlined" />
            <Chip label={`Confianza ${task.confidence}`} size="small" variant="outlined" />
            <Chip label={`Esfuerzo ${task.effort}`} size="small" variant="outlined" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
