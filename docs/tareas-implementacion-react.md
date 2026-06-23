# Tareas de implementacion React para el MVP

Este documento divide el MVP del Gestor de Tareas Inteligente con modelo ICE en 5 tareas de implementacion ordenadas. La secuencia esta pensada para construir primero la base de React y el dominio de tareas, despues la experiencia de usuario, y finalmente la integracion asincrona con IA.

## 1. Preparar la base de la aplicacion y el dominio de tareas

### Objetivo

Crear la estructura minima de la aplicacion React con TypeScript, Material UI y el modelo de datos de tareas.

### Alcance

- Configurar `App.tsx` como orquestador principal.
- Crear la estructura inicial bajo `src/features/tasks/`.
- Definir el tipo `Task` con los campos del MVP.
- Crear utilidades puras para calcular ICE y normalizar valores.
- Preparar datos de ejemplo opcionales para validar la interfaz durante el desarrollo.

### Archivos sugeridos

- `src/App.tsx`
- `src/features/tasks/types/Task.ts`
- `src/features/tasks/utils/calculateIceScore.ts`
- `src/features/tasks/utils/normalizeIceValue.ts`
- `src/theme/`

### Criterios de aceptacion

- Existe un tipo `Task` con `id`, `title`, `description`, `status`, `impact`, `confidence`, `effort`, `iceScore` y `aiSummary`.
- La formula `ICE = (impact * confidence) / effort` esta implementada en una funcion pura.
- El esfuerzo nunca puede provocar division por cero.
- La aplicacion arranca con una pantalla principal basica.
- Material UI queda disponible como base visual del proyecto.

## 2. Construir el estado principal y el listado priorizado de tareas

### Objetivo

Implementar la gestion en memoria de la lista de tareas y mostrarla ordenada segun las reglas del MVP.

### Alcance

- Crear un contenedor de feature para centralizar el estado de tareas.
- Mostrar estado vacio cuando no existan tareas.
- Renderizar tareas pendientes y completadas.
- Ordenar primero las pendientes por ICE descendente.
- Mantener las completadas visibles despues de las pendientes.
- Preparar acciones internas para crear, actualizar, completar/reactivar y eliminar tareas.

### Archivos sugeridos

- `src/features/tasks/components/TaskDashboardScreen.tsx`
- `src/features/tasks/components/TaskListSection.tsx`
- `src/features/tasks/components/TaskCard.tsx`
- `src/features/tasks/components/EmptyTaskState.tsx`
- `src/features/tasks/hooks/useTasks.ts`
- `src/features/tasks/utils/sortTasksByPriority.ts`

### Criterios de aceptacion

- La pantalla principal muestra un listado de tareas.
- Si no hay tareas, se muestra un estado vacio simple.
- Las tareas pendientes aparecen antes que las completadas.
- Las tareas pendientes se ordenan de mayor a menor ICE.
- Las tareas completadas no desaparecen del listado.
- Las actualizaciones del array de tareas se hacen de forma inmutable.

## 3. Implementar el formulario de creacion y edicion con calculo ICE manual

### Objetivo

Permitir al usuario crear y editar tareas introduciendo titulo, descripcion e indicadores ICE manuales.

### Alcance

- Crear un formulario reutilizable para alta y edicion.
- Validar que el titulo sea obligatorio.
- Permitir editar descripcion, impacto, confianza y esfuerzo.
- Limitar impacto, confianza y esfuerzo al rango 1-10.
- Recalcular el ICE automaticamente al cambiar cualquier valor.
- Mostrar una vista previa clara de la puntuacion ICE antes de guardar.
- Permitir cancelar la edicion sin modificar la tarea original.

### Archivos sugeridos

- `src/features/tasks/components/TaskForm.tsx`
- `src/features/tasks/components/IceManualFields.tsx`
- `src/features/tasks/components/TaskFormActions.tsx`
- `src/features/tasks/components/TaskCreateDialog.tsx`
- `src/features/tasks/components/TaskEditDialog.tsx`

### Criterios de aceptacion

- No se puede guardar una tarea sin titulo.
- El usuario puede crear una tarea en estado `pending`.
- El usuario puede editar titulo y descripcion de una tarea existente.
- El usuario puede ajustar impacto, confianza y esfuerzo manualmente.
- El ICE se recalcula al modificar cualquiera de los tres valores.
- Al guardar, la lista se reordena automaticamente.
- Al cancelar, no se persisten cambios parciales.

## 4. Completar las acciones de tarea y la experiencia visual principal

### Objetivo

Cerrar el flujo funcional de gestion de tareas y dejar una interfaz clara, accesible y consistente con Material UI.

### Alcance

- Anadir acciones por tarea: editar, completar/reactivar y eliminar.
- Incorporar un resumen visual de prioridad.
- Mostrar estado, ICE y valores de impacto, confianza y esfuerzo en cada tarjeta.
- Mostrar la justificacion IA cuando exista.
- Usar componentes MUI como `AppBar`, `Paper`, `Card`, `Button`, `Chip`, `Alert`, `Dialog` y `Fab`.
- Mantener una sola ruta principal, sin login, settings ni detalle por URL.

### Archivos sugeridos

- `src/features/tasks/components/PrioritySummarySection.tsx`
- `src/features/tasks/components/CreateTaskAction.tsx`
- `src/features/tasks/components/TaskConfirmedSummary.tsx`
- `src/features/tasks/components/TaskCard.tsx`
- `src/shared/components/MainLayout.tsx`
- `src/shared/components/AppHeader.tsx`

### Criterios de aceptacion

- Cada tarea permite editar, completar/reactivar y eliminar.
- Las tareas completadas se distinguen visualmente de las pendientes.
- El usuario puede volver a activar una tarea completada.
- El listado se mantiene ordenado tras crear, editar, completar, reactivar o eliminar.
- La interfaz mantiene el contexto del dashboard al crear o editar mediante dialogo o panel.
- Los botones y mensajes son claros y accesibles.

## 5. Integrar la sugerencia ICE con IA y manejar estados asincronos

### Objetivo

Conectar el formulario con una API gratuita de IA para sugerir impacto, confianza, esfuerzo y una justificacion breve.

### Alcance

- Crear un servicio de IA encapsulado en `features/tasks/services/`.
- Usar `fetch` y una variable de entorno de Vite para la API key.
- Construir el prompt base para evaluar tareas con el modelo ICE.
- Validar que la descripcion sea suficiente antes de llamar a la API.
- Parsear y validar una respuesta JSON con `impact`, `confidence`, `effort` y `reason`.
- Aplicar los valores sugeridos al formulario cuando el usuario los acepte.
- Mostrar estados de carga, error recuperable y resultado sugerido.
- Incluir un fallback mock para clase cuando no haya API key o cuota disponible.

### Archivos sugeridos

- `src/features/tasks/services/aiService.ts`
- `src/features/tasks/components/AIRecommendationPanel.tsx`
- `src/features/tasks/components/AILoadingState.tsx`
- `src/features/tasks/components/AIErrorState.tsx`
- `src/features/tasks/components/AIRecommendationResult.tsx`
- `.env.example`

### Criterios de aceptacion

- Si no hay descripcion suficiente, se muestra validacion local y no se llama a la API.
- Durante la llamada IA, el boton queda deshabilitado y se muestra feedback visible.
- Si la API falla, aparece un error claro y recuperable.
- Si la respuesta no tiene JSON valido, se muestra un error controlado.
- Las puntuaciones de IA se limitan al rango 1-10.
- Al aceptar la sugerencia, se actualizan impacto, confianza, esfuerzo y justificacion.
- El ICE se recalcula con los valores sugeridos.
- El proyecto sigue funcionando sin backend, autenticacion ni base de datos.

## Orden recomendado de ejecucion

1. Base de aplicacion y dominio.
2. Estado principal y listado priorizado.
3. Formulario con calculo ICE manual.
4. Acciones de tarea y experiencia visual.
5. Integracion IA y estados asincronos.

Esta division permite avanzar desde conceptos esenciales de React como estado, props, listas y formularios, hasta efectos asincronos e integracion externa con IA sin aumentar la complejidad antes de tiempo.
