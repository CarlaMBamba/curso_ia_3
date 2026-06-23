# Alcance funcional del MVP: Gestor de Tareas Inteligente con modelo ICE

## 1. Objetivo del MVP

Construir una aplicacion web sencilla que permita crear, visualizar, editar y priorizar tareas usando el modelo ICE. La aplicacion estara pensada para un curso de React, por lo que debe priorizar claridad, simplicidad y una integracion basica con una API de IA gratuita.

El valor principal del MVP es que el usuario pueda escribir una descripcion de una tarea y obtener una estimacion automatica de su puntuacion ICE para ayudarle a decidir que tareas abordar primero.

## 2. Condiciones de la IA gratuita

El MVP debe poder calcular el ICE a partir de una descripcion usando una API de IA gratuita. La opcion sugerida es Gemini API de Google AI Studio.

Google documenta un plan gratuito para desarrolladores y proyectos pequenos, con tokens de entrada y salida gratuitos bajo limites de uso. Tambien indica que, en el plan gratuito, el contenido puede usarse para mejorar sus productos, por lo que no se deben enviar datos sensibles.

Referencias:

- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/rate-limits

## 3. Definicion del modelo ICE

Para este MVP se usara una version sencilla del modelo ICE adaptada a gestion de tareas:

- Impacto: valor esperado o beneficio de completar la tarea.
- Confianza: nivel de seguridad sobre la estimacion del impacto.
- Esfuerzo: dificultad o coste aproximado de realizar la tarea.

Escala recomendada:

- Impacto: 1 a 10.
- Confianza: 1 a 10.
- Esfuerzo: 1 a 10.

Formula:

```text
ICE = (Impacto * Confianza) / Esfuerzo
```

Cuanto mayor sea la puntuacion ICE, mayor prioridad tendra la tarea.

## 4. Funcionalidades incluidas

### 4.1 Gestion basica de tareas

El usuario podra:

- Crear una tarea con titulo obligatorio.
- Anadir una descripcion opcional.
- Editar titulo y descripcion.
- Marcar una tarea como pendiente o completada.
- Eliminar una tarea.
- Ver un listado de tareas en pantalla.

Campos minimos de una tarea:

```js
{
  id: string,
  title: string,
  description: string,
  status: "pending" | "completed",
  impact: number,
  confidence: number,
  effort: number,
  iceScore: number,
  aiSummary: string
}
```

### 4.2 Calculo manual del ICE

El usuario podra introducir o ajustar manualmente:

- Impacto.
- Confianza.
- Esfuerzo.

La aplicacion recalculara automaticamente el ICE cuando cambie cualquiera de esos valores.

### 4.3 Calculo inteligente del ICE con IA

El usuario podra pulsar un boton del tipo "Calcular ICE con IA" a partir de la descripcion de la tarea.

La aplicacion enviara a la API de IA:

- Titulo de la tarea.
- Descripcion de la tarea.
- Instrucciones para devolver impacto, confianza, esfuerzo y una breve justificacion.

La IA debera devolver una respuesta estructurada, idealmente en JSON:

```json
{
  "impact": 8,
  "confidence": 7,
  "effort": 4,
  "reason": "La tarea parece aportar valor alto, la descripcion es clara y el esfuerzo estimado es moderado."
}
```

La aplicacion usara esos valores para:

- Rellenar impacto, confianza y esfuerzo.
- Calcular el ICE.
- Mostrar una breve explicacion generada por IA.

### 4.4 Ordenacion por prioridad

El listado mostrara las tareas ordenadas por puntuacion ICE de mayor a menor.

Como comportamiento simple:

- Las tareas pendientes apareceran primero.
- Dentro de las pendientes, se ordenaran por ICE descendente.
- Las tareas completadas apareceran despues.

### 4.5 Estados de carga y error

La aplicacion debera mostrar estados basicos:

- Cargando mientras se espera la respuesta de la IA.
- Error si la API falla.
- Mensaje si la descripcion es demasiado corta para estimar bien el ICE.

Ejemplos de errores manejados:

- Falta la API key.
- La API devuelve una respuesta no valida.
- Se supera el limite gratuito de uso.
- No hay conexion.

## 5. Funcionalidades excluidas

Este MVP no incluye:

- Backend.
- Autenticacion.
- Persistencia real en base de datos.
- Paginacion.
- Multiusuario.
- Tags o etiquetas.
- Roles o permisos.
- Adjuntos.
- Comentarios.
- Fechas limite avanzadas.
- Notificaciones.
- Historial de cambios.
- Sincronizacion entre dispositivos.
- Analiticas.

La informacion vivira solo en memoria durante la sesion de uso. Si se recarga la pagina, las tareas pueden perderse. Esto es intencional para mantener el proyecto enfocado en React.

## 6. Pantallas o vistas del MVP

### 6.1 Vista principal

La pantalla principal incluira:

- Formulario para crear o editar una tarea.
- Lista de tareas ordenadas por prioridad.
- Indicador visual de puntuacion ICE.
- Acciones por tarea: editar, completar/reactivar y eliminar.

### 6.2 Formulario de tarea

Campos:

- Titulo.
- Descripcion.
- Impacto.
- Confianza.
- Esfuerzo.
- Boton para calcular ICE con IA.
- Boton para guardar.
- Boton para cancelar edicion, si aplica.

### 6.3 Tarjeta o fila de tarea

Cada tarea mostrara:

- Titulo.
- Descripcion resumida.
- Estado.
- Impacto, confianza, esfuerzo e ICE.
- Justificacion breve de IA, si existe.
- Acciones disponibles.

## 7. Prompt base sugerido

```text
Actua como un asistente de priorizacion de tareas.

Evalua la siguiente tarea usando el modelo ICE:
- Impacto: valor o beneficio esperado, de 1 a 10.
- Confianza: seguridad de la estimacion, de 1 a 10.
- Esfuerzo: dificultad o coste, de 1 a 10. Un esfuerzo alto reduce la prioridad.

Devuelve solo JSON valido, sin markdown, con esta estructura:
{
  "impact": number,
  "confidence": number,
  "effort": number,
  "reason": string
}

Titulo: {{title}}
Descripcion: {{description}}
```

## 8. Reglas funcionales

- No se puede crear una tarea sin titulo.
- Si no hay descripcion, el calculo con IA debe pedir al usuario que escriba una descripcion minima.
- El ICE se recalcula siempre que cambien impacto, confianza o esfuerzo.
- El esfuerzo no puede ser 0 para evitar divisiones invalidas.
- Las puntuaciones generadas por IA deben limitarse al rango 1-10.
- La ordenacion debe actualizarse al crear, editar, completar o recalcular una tarea.
- Las tareas completadas no desaparecen del listado.

## 9. Criterios de aceptacion

El MVP se considera completo cuando:

- El usuario puede crear una tarea.
- El usuario puede editar una tarea existente.
- El usuario puede eliminar una tarea.
- El usuario puede marcar una tarea como completada.
- El usuario puede introducir impacto, confianza y esfuerzo manualmente.
- La aplicacion calcula correctamente el ICE con la formula definida.
- El usuario puede calcular impacto, confianza y esfuerzo usando IA a partir de la descripcion.
- La aplicacion muestra una justificacion breve generada por IA.
- La lista se ordena por prioridad ICE.
- La aplicacion maneja al menos un estado de carga y un estado de error.
- El proyecto funciona sin backend, sin autenticacion y sin base de datos.

## 10. Alcance recomendado para una primera iteracion

Primera version:

- Crear tareas.
- Mostrar tareas.
- Calcular ICE manualmente.
- Ordenar por ICE.

Segunda version:

- Editar, completar y eliminar tareas.
- Mejorar estilos y estados visuales.

Tercera version:

- Integrar la API de IA.
- Mostrar estado de carga, errores y justificacion.

Esta division permite que el alumnado aprenda primero estado, eventos, formularios y renderizado condicional antes de introducir llamadas asincronas a una API externa.

## 11. Riesgos y decisiones conscientes

- La API gratuita puede tener limites de uso o cambiar sus condiciones.
- La API key no queda protegida en una aplicacion sin backend.
- La IA puede devolver estimaciones subjetivas o inconsistentes.
- El resultado debe tratarse como ayuda de priorizacion, no como decision automatica definitiva.
- No se usara persistencia real para evitar complejidad fuera del objetivo del curso.

## 12. Resultado esperado

El resultado sera una aplicacion pequena, comprensible y demostrable en clase, centrada en:

- Formularios.
- Renderizado condicional.
- Listas.
- Ordenacion.
- Calculo derivado.
- Peticiones asincronas.
- Integracion sencilla con IA.

El MVP debe sentirse como una herramienta util, pero mantenerse lo bastante acotado para que pueda desarrollarse y explicarse dentro de un curso introductorio o intermedio de React.
