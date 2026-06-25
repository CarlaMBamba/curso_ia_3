import { useMemo, useState } from "react";

import { calculateIceScore } from "../utils/calculateIceScore";
import { sortTasksByPriority } from "../utils/sortTasksByPriority";

import type { Task, TaskStatus } from "../types/Task";

type TaskDraft = Omit<Task, "id" | "iceScore">;
type TaskUpdate = Partial<Omit<Task, "id">>;

const initialTasks: Task[] = [
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
    status: "pending",
    impact: 9,
    confidence: 8,
    effort: 3,
    iceScore: calculateIceScore(9, 8, 3),
    aiSummary: "",
  },
  {
    id: "sample-3",
    title: "Revisar material completado",
    description: "Comprobar que la documentacion inicial queda lista para clase.",
    status: "completed",
    impact: 6,
    confidence: 8,
    effort: 6,
    iceScore: calculateIceScore(6, 8, 6),
    aiSummary: "",
  },
];

// createTaskId genera un identificador estable para tareas creadas en memoria.
function createTaskId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}`;
}

// withCalculatedIceScore garantiza que la tarea guarda un ICE coherente con sus valores.
function withCalculatedIceScore(task: Omit<Task, "iceScore">): Task {
  return {
    ...task,
    iceScore: calculateIceScore(task.impact, task.confidence, task.effort),
  };
}

// useTasks centraliza la lista de tareas en memoria y sus acciones internas.
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const orderedTasks = useMemo(() => sortTasksByPriority(tasks), [tasks]);

  // createTask anade una nueva tarea sin mutar el array existente.
  function createTask(taskDraft: TaskDraft) {
    const newTask = withCalculatedIceScore({
      ...taskDraft,
      id: createTaskId(),
    });

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  // updateTask aplica cambios parciales y recalcula ICE de forma inmutable.
  function updateTask(taskId: string, taskUpdate: TaskUpdate) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return withCalculatedIceScore({
          ...task,
          ...taskUpdate,
        });
      }),
    );
  }

  // setTaskStatus cambia una tarea entre pendiente y completada sin ocultarla.
  function setTaskStatus(taskId: string, status: TaskStatus) {
    updateTask(taskId, { status });
  }

  // deleteTask elimina una tarea creando un nuevo array filtrado.
  function deleteTask(taskId: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return {
    createTask,
    deleteTask,
    orderedTasks,
    setTaskStatus,
    tasks,
    updateTask,
  };
}
