# AGENTS.md

## Rol de este archivo

- Este archivo es la guia permanente de Codex para este repositorio.
- No sustituye la documentacion funcional ni tecnica existente.
- No repite reglas ya definidas en el `AGENTS.md` global del usuario.
- No repite el alcance ni las guidelines documentadas en `docs/`.
- Su funcion es indicar que fuentes consultar, en que orden y como resolver dudas.
- Si una instruccion ya esta en el AGENTS global, aplicar la global sin duplicarla aqui.
- Si una instruccion ya esta en `docs/alcance-mvp-todo-inteligente-ice.md`, referenciar ese documento.
- Si una instruccion ya esta en `docs/development-guidelines.md`, referenciar ese documento.
- Mantener este archivo estable: no anadir tareas concretas, hitos temporales ni planes de iteracion.

## Orden de autoridad

- Primero aplicar las instrucciones del sistema y del entorno de Codex.
- Despues aplicar el `AGENTS.md` global del usuario.
- Despues aplicar este `AGENTS.md` del repositorio.
- Despues aplicar la documentacion estable de `docs/`.
- Despues aplicar la peticion concreta del usuario.
- Si hay conflicto entre este archivo y la documentacion del repo, avisar antes de implementar.
- Si hay conflicto entre documentos de `docs/`, no inventar una regla: describir la inconsistencia.
- Si una peticion pide saltarse el alcance del MVP, pedir confirmacion antes de cambiar arquitectura.

## Documentos de referencia

- Para alcance funcional, consultar `docs/alcance-mvp-todo-inteligente-ice.md`.
- Para estructura de carpetas, consultar `docs/development-guidelines.md`.
- Para convenciones de nombres, consultar `docs/development-guidelines.md`.
- Para responsabilidades de componentes, consultar `docs/development-guidelines.md`.
- Para uso de hooks, consultar `docs/development-guidelines.md`.
- Para gestion de estado, consultar `docs/development-guidelines.md`.
- Para llamadas API, consultar `docs/development-guidelines.md`.
- Para errores, cargas y feedback de UI, consultar `docs/development-guidelines.md`.
- Para librerias aprobadas, consultar `docs/development-guidelines.md`.
- Para flujos de navegacion y creacion de tareas, consultar los `.mmd` de `docs/`.
- Para composicion visual esperada, consultar `docs/app-screens.svg`.
- Para una secuencia sugerida de implementacion, consultar `docs/tareas-implementacion-react.md`.

## Uso de la documentacion

- Antes de implementar una funcionalidad, identificar que documento la define.
- No copiar reglas de `docs/` dentro de codigo, comentarios o nuevos documentos.
- No convertir criterios de aceptacion en arquitectura permanente.
- No convertir tareas sugeridas en requisitos obligatorios si el usuario no las pide.
- Usar `docs/tareas-implementacion-react.md` como orientacion de orden, no como fuente de reglas estables.
- Usar los diagramas Mermaid como referencia de flujo, no como lista cerrada de nombres obligatorios.
- Usar el SVG como referencia de layout y componentes visuales, no como especificacion pixel-perfect.
- Si falta una decision en `docs/`, elegir la opcion mas simple compatible con el MVP.
- Si una decision afecta a varias capas, proponer plan breve y esperar confirmacion.
- Si el cambio es pequeno y esta cubierto por `docs/`, implementarlo directamente.

## Alcance del repo

- Este repositorio documenta y/o implementa el MVP descrito en `docs/alcance-mvp-todo-inteligente-ice.md`.
- No ampliar el producto fuera de ese MVP sin confirmacion explicita.
- No introducir backend, autenticacion, base de datos o rutas adicionales salvo peticion explicita.
- No anadir persistencia real salvo que el usuario cambie el alcance.
- No anadir dependencias fuera de las aprobadas en `docs/development-guidelines.md` sin confirmacion.
- Mantener cualquier nueva decision arquitectonica trazable a `docs/` o a una peticion del usuario.
- Si se crea nueva documentacion, enlazar la fuente original en vez de duplicar contenido.
- Si se modifica documentacion existente, preservar la distincion entre alcance estable y tareas.

## Trabajo con codigo

- Antes de modificar codigo, revisar el area afectada y el documento de `docs/` correspondiente.
- Mantener los cambios alineados con la estructura definida en `docs/development-guidelines.md`.
- Mantener las reglas funcionales alineadas con `docs/alcance-mvp-todo-inteligente-ice.md`.
- No mover archivos para "ordenar" si la tarea no lo requiere.
- No crear carpetas, capas o abstracciones que no esten justificadas por el cambio.
- Si aparece una estructura existente que contradice `docs/`, avisar y trabajar con el estado real.
- Si no existe aun codigo fuente, no asumir que la estructura ya esta creada.
- Si se crea codigo nuevo, seguir las guidelines del repo y las reglas globales de comentarios.
- Si se crea una API o servicio, revisar primero la seccion de llamadas API de las guidelines.
- Si se toca UI, revisar primero los flujos y el wireframe en `docs/`.

## Trabajo con IA

- Para cualquier integracion de IA, usar como fuente el alcance funcional y las guidelines.
- Tratar Gemini como opcion sugerida por la documentacion, no como proveedor obligatorio si el usuario decide otro.
- No enviar datos sensibles a servicios de IA.
- No guardar claves reales en el repositorio.
- Si se documenta una variable de entorno, hacerlo en `.env.example`.
- Mantener la IA como ayuda revisable por el usuario, no como decision automatica irreversible.

## Validacion

- Verificar cambios contra el documento fuente que los justifica.
- Priorizar pruebas o comprobaciones sobre utilidades puras cuando existan.
- Si no hay proyecto ejecutable todavia, validar con lectura estatica y explicar esa limitacion.
- Si hay scripts disponibles, usar los scripts existentes antes de crear nuevos.
- No instalar herramientas nuevas solo para validar un cambio pequeno.
- Al finalizar, mencionar que documentos se usaron como referencia.

## Mantenimiento de este AGENTS.md

- Mantener este archivo breve y accionable.
- No copiar tablas ni listas completas desde `docs/`.
- No copiar reglas del AGENTS global.
- No incluir instrucciones temporales de implementacion.
- No incluir criterios de aceptacion de una iteracion concreta.
- No incluir prompts completos si ya estan en `docs/`.
- Anadir solo reglas que ayuden a Codex a operar dentro del repo.
- Cuando una regla pueda vivir mejor en `docs/`, moverla o referenciarla.
- Cuando una regla sea general de trabajo, dejarla en el AGENTS global.
- Revisar este archivo si cambia la arquitectura documentada del proyecto.

## Observaciones de documentacion

- `docs/development-guidelines.md` no lista `src/features/tasks/utils/`, pero `docs/tareas-implementacion-react.md` sugiere utilidades ahi; si se usa, limitarlo a utilidades puras del dominio de tareas.
- La documentacion permite formulario en dialogo o panel; ambas opciones son validas si mantienen el contexto del dashboard.
- La API de Gemini aparece como opcion sugerida para IA gratuita, no como obligacion arquitectonica.
