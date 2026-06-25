import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import { TaskDashboardScreen } from "./features/tasks/components/TaskDashboardScreen";

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
        <TaskDashboardScreen />
      </Container>
    </Box>
  );
}

export default App;
