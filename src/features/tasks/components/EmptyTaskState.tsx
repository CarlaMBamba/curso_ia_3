import { Paper, Typography } from "@mui/material";

// EmptyTaskState muestra el estado inicial cuando no hay tareas en memoria.
export function EmptyTaskState() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Todavia no hay tareas
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Crea una tarea para empezar a priorizar con el modelo ICE.
      </Typography>
    </Paper>
  );
}
