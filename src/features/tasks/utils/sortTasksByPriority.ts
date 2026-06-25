import type { Task } from "../types/Task";

// sortTasksByPriority coloca pendientes primero por ICE descendente y completadas despues.
export function sortTasksByPriority(tasks: Task[]): Task[] {
  const pendingTasks = [...tasks.filter((task) => task.status === "pending")].sort(
    (firstTask, secondTask) => secondTask.iceScore - firstTask.iceScore,
  );
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return [...pendingTasks, ...completedTasks];
}
