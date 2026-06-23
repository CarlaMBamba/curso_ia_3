# Development Guidelines

## Estructura de carpetas

| Ruta | Uso |
| --- | --- |
| `src/main.tsx` | Arranque de React. |
| `src/App.tsx` | Composicion principal. |
| `src/components/` | Componentes reutilizables. |
| `src/features/` | Funcionalidad por dominio. |
| `src/features/tasks/` | Todo lo relativo a tareas. |
| `src/features/tasks/components/` | UI especifica de tareas. |
| `src/features/tasks/hooks/` | Hooks especificos de tareas. |
| `src/features/tasks/services/` | Llamadas externas de tareas. |
| `src/features/tasks/types/` | Tipos de dominio de tareas. |
| `src/shared/` | Utilidades reutilizables. |
| `src/shared/components/` | UI comun no ligada al dominio. |
| `src/shared/hooks/` | Hooks reutilizables. |
| `src/shared/utils/` | Funciones puras. |
| `src/shared/types/` | Tipos compartidos. |
| `src/theme/` | Configuracion de Material UI. |

- [ ] Mantener la estructura plana mientras el proyecto sea pequeno.
- [ ] Crear carpetas nuevas solo si hay al menos dos archivos relacionados.
- [ ] Agrupar por feature antes que por tipo global.
- [ ] No crear capas vacias por anticipado.
- [ ] No duplicar utilidades entre `features` y `shared`.
- [ ] Mantener `App.tsx` como orquestador, no como contenedor de logica.
- [ ] Evitar imports profundos entre features.
- [ ] Usar `shared` solo para codigo realmente reutilizable.
- [ ] Mantener assets cerca de la feature si no son globales.
- [ ] No crear carpeta `pages` si la app no tiene rutas.

## Convenciones de nombres

| Elemento | Convencion | Ejemplo |
| --- | --- | --- |
| Componentes | PascalCase | `TaskForm.tsx` |
| Hooks | camelCase con `use` | `useTasks.ts` |
| Servicios | camelCase + `Service` | `aiService.ts` |
| Tipos | PascalCase | `Task` |
| Props | Nombre del componente + `Props` | `TaskItemProps` |
| Constantes | camelCase o UPPER_CASE | `defaultTask` |
| Utilidades | camelCase | `calculateIceScore` |
| Tests | mismo nombre + `.test` | `ice.test.ts` |
| Carpetas feature | kebab-case o plural simple | `tasks` |
| Variables booleanas | prefijo semantico | `isLoading` |

- [ ] Usar nombres de dominio, no nombres genericos.
- [ ] Evitar abreviaturas salvo que sean del dominio.
- [ ] Nombrar eventos desde la intencion: `onTaskSave`.
- [ ] Nombrar handlers internos con `handle`: `handleSubmit`.
- [ ] Evitar archivos `index.ts` si reducen claridad.
- [ ] Mantener un componente principal por archivo.
- [ ] Nombrar estados de error como `error`, no `message`.
- [ ] Nombrar listas en plural: `tasks`.
- [ ] Nombrar elementos individuales en singular: `task`.
- [ ] Mantener nombres en ingles para codigo.

## Organizacion de componentes con sus responsabilidades

| Tipo | Responsabilidad |
| --- | --- |
| `App` | Componer layout y feature principal. |
| Feature container | Estado y acciones de la feature. |
| Form component | Captura y validacion basica de datos. |
| List component | Renderizar colecciones ordenadas. |
| Item component | Mostrar una entidad y sus acciones. |
| Display component | Presentacion sin estado de negocio. |
| Shared component | UI reutilizable y sin dominio fuerte. |
| MUI component | Base visual preferida. |
| Utility component | Solo si evita duplicacion real. |
| Modal/Dialog | Solo para flujos que lo necesiten. |

- [ ] Preferir componentes pequenos y legibles.
- [ ] Separar logica de dominio de la UI si crece.
- [ ] Pasar props explicitas, no objetos gigantes sin necesidad.
- [ ] Evitar componentes con mas de una responsabilidad principal.
- [ ] No crear componentes reutilizables prematuramente.
- [ ] Usar Material UI como base visual por defecto.
- [ ] Personalizar MUI con `sx` para ajustes locales simples.
- [ ] Mover estilos repetidos al tema o a componentes compartidos.
- [ ] Evitar props booleanas multiples que creen muchas variantes.
- [ ] Mantener accesibles botones, campos y mensajes.

## Uso de hooks

| Hook | Uso aprobado |
| --- | --- |
| `useState` | Estado local simple. |
| `useMemo` | Calculos derivados costosos o ordenaciones. |
| `useCallback` | Solo si evita renders o dependencias inestables. |
| `useEffect` | Efectos externos, no calculos derivados simples. |
| Custom hook | Reutilizar logica de estado o efectos. |

- [ ] Empezar con hooks nativos de React.
- [ ] Crear custom hooks solo cuando reduzcan complejidad.
- [ ] No usar `useEffect` para sincronizar estados derivados evitables.
- [ ] Mantener dependencias completas en `useEffect`.
- [ ] Evitar efectos con demasiadas responsabilidades.
- [ ] Cancelar o ignorar respuestas asincronas obsoletas.
- [ ] Devolver datos, estado de carga, error y acciones desde hooks de feature.
- [ ] No ocultar reglas de negocio importantes en hooks genericos.
- [ ] Mantener hooks libres de detalles visuales de MUI.
- [ ] Testear funciones puras antes que hooks complejos.

## Gestion del estado

| Necesidad | Decision |
| --- | --- |
| Estado de formulario | Local en el formulario. |
| Lista de tareas | Estado en el contenedor de feature. |
| Filtros simples | Estado local. |
| ICE calculado | Valor derivado, no duplicado si es posible. |
| Loading de API | Estado junto a la accion asincrona. |
| Error de API | Estado junto a la accion asincrona. |
| Datos persistentes | Fuera de alcance. |
| Estado global | Evitar por defecto. |
| Context | Solo para tema o estado transversal real. |
| Libreria externa | No usar para este MVP. |

- [ ] Mantener el estado en el nivel mas bajo posible.
- [ ] Subir estado solo cuando varios componentes lo necesiten.
- [ ] Evitar duplicar estado derivado.
- [ ] Usar tipos explicitos para entidades del dominio.
- [ ] Usar ids estables para listas.
- [ ] Actualizar arrays de forma inmutable.
- [ ] Evitar reducers si `useState` es suficiente.
- [ ] Usar `useReducer` solo si hay muchas transiciones relacionadas.
- [ ] No introducir Redux, Zustand o similares en este MVP.
- [ ] Mantener datos de ejemplo separados de la logica.

## Gestion de llamadas API

| Regla | Decision |
| --- | --- |
| Cliente HTTP | `fetch`. |
| Ubicacion | `services/`. |
| API key | Variable de entorno de Vite. |
| Backend | No existe. |
| Seguridad | Solo uso didactico/local. |
| Respuesta IA | JSON validado. |
| Fallback | Mock permitido para clase. |
| Datos sensibles | No enviar. |
| Reintentos | No implementar inicialmente. |
| Cache | No implementar inicialmente. |

- [ ] Encapsular cada llamada en una funcion de servicio.
- [ ] No llamar APIs directamente desde componentes de presentacion.
- [ ] Validar rangos y campos obligatorios de la respuesta.
- [ ] Convertir errores tecnicos en mensajes de UI simples.
- [ ] Mantener prompts en el servicio o en constantes cercanas.
- [ ] No mezclar parsing de API con renderizado.
- [ ] Usar mocks cuando no haya clave o cuota disponible.
- [ ] Evitar dependencias HTTP externas.
- [ ] Documentar la variable de entorno necesaria.
- [ ] No commitear claves reales.

## Manejo de errores y cargas

| Estado | UI esperada |
| --- | --- |
| `idle` | Accion disponible. |
| `loading` | Boton deshabilitado y feedback visible. |
| `success` | Datos actualizados. |
| `error` | Mensaje recuperable. |
| Sin API key | Aviso didactico. |
| Sin descripcion | Validacion local. |
| Respuesta invalida | Error controlado. |
| Sin conexion | Error generico claro. |
| Tarea vacia | Mensaje de validacion. |
| Lista vacia | Estado vacio simple. |

- [ ] Mostrar cargas solo donde ocurre la accion.
- [ ] No bloquear toda la app por una llamada de IA.
- [ ] Deshabilitar acciones duplicadas durante `loading`.
- [ ] Mantener mensajes cortos y accionables.
- [ ] No mostrar errores tecnicos crudos al usuario.
- [ ] Registrar detalles tecnicos solo en desarrollo.
- [ ] Permitir reintentar el calculo con IA.
- [ ] Limpiar errores al repetir la accion.
- [ ] Mantener validaciones locales antes de llamar a la API.
- [ ] Usar componentes MUI para feedback visual.

## Librerias aprobadas

| Libreria | Uso | Estado |
| --- | --- | --- |
| `react` | UI principal. | Aprobada |
| `react-dom` | Renderizado DOM. | Aprobada |
| `typescript` | Tipado estatico. | Aprobada |
| `vite` | Build y dev server. | Aprobada |
| `@mui/material` | Componentes Material Design. | Aprobada |
| `@mui/icons-material` | Iconos Material. | Aprobada |
| `@emotion/react` | Requisito de MUI. | Aprobada |
| `@emotion/styled` | Requisito de MUI. | Aprobada |

- [ ] No anadir librerias sin una necesidad clara.
- [ ] Preferir APIs nativas del navegador.
- [ ] Preferir utilidades propias pequenas antes que paquetes externos.
- [ ] No usar librerias de estado global en el MVP.
- [ ] No usar librerias de formularios inicialmente.
- [ ] No usar librerias de routing si hay una sola vista.
- [ ] No usar librerias de fechas si no hay fechas complejas.
- [ ] No usar librerias CSS adicionales junto a MUI.
- [ ] Revisar impacto antes de instalar cualquier dependencia.
- [ ] Eliminar dependencias no usadas.
