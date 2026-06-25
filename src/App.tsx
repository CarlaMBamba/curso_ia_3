import { AppBar, Box, Chip, Container, Paper, Stack, Toolbar, Typography } from "@mui/material";

import { calculateIceScore } from "./features/tasks/utils/calculateIceScore";

import type { Task } from "./features/tasks/types/Task";

const sampleTasks: Task[] = [
  {
    id: "sample-1",
    title: "Definir las tareas del sprint",
    description: "Revisar el alcance y elegir el siguiente bloque de trabajo.",
    status: "pending",
    impact: 8,
    confidence: 7,
    effort: 4,
    iceScore: calculateIceScore(8, 7, 4),
    aiSummary: "",
  },
  {
    id: "sample-2",
    title: "Preparar demo del modelo ICE",
    description: "Crear un ejemplo sencillo para explicar la priorizacion.",
    status: "completed",
    impact: 6,
    confidence: 8,
    effort: 6,
    iceScore: calculateIceScore(6, 8, 6),
    aiSummary: "",
  },
];

// App compone la pantalla principal del MVP y deja preparada la base visual.
function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 700 }}>
            Gestor de tareas ICE
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography component="h2" variant="h4" sx={{ fontWeight: 700 }}>
              Prioriza con claridad
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Base inicial de la aplicacion con React, TypeScript y Material UI.
            </Typography>
          </Box>

          <Stack spacing={2}>
            {sampleTasks.map((task) => (
              <Paper key={task.id} elevation={0} sx={{ p: 2, border: 1, borderColor: "divider" }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {task.title}
                    </Typography>
                    <Typography color="text.secondary">{task.description}</Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={task.status === "pending" ? "Pendiente" : "Completada"}
                      size="small"
                    />
                    <Chip color="primary" label={`ICE ${task.iceScore.toFixed(1)}`} size="small" />
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
