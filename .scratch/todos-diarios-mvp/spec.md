Status: ready-for-agent

# To-dos Diarios — Spec del MVP

## Enunciado del problema

Las personas que llevan un registro diario de tareas necesitan una forma sencilla de ver qué planearon para cada día, sin que las tareas se muevan entre fechas. Quieren revisar días pasados (solo lectura, excepto marcar hechos), gestionar la lista de hoy con libertad, y saber que sus datos son privados en su cuenta. Sin un modelo de día fijo, las apps de to-dos mezclan «lo que iba a hacer hoy» con «lo que iba a hacer el martes pasado», y la revisión diaria deja de ser fiable.

## Solución

Una web de una sola página en español donde cada to-do pertenece permanentemente al día calendario en que se creó. El usuario inicia sesión con GitHub, llega a la vista de hoy, y solo puede crear, editar y eliminar to-dos en el día actual. Puede navegar a cualquier día pasado (o hoy) para ver la lista de ese día; en días pasados el texto es solo lectura pero los checkboxes siguen funcionando. No se puede acceder a días futuros. La interfaz es mínima: un día a la vez, orden de creación preservado, los hechos tachados pero sin reordenarse.

## Historias de usuario

1. Como usuario, quiero iniciar sesión con mi cuenta de GitHub, para que mis to-dos sean privados y estén vinculados a mí.
2. Como usuario, quiero ser redirigido al login cuando no estoy autenticado, para que nadie acceda a mis listas sin iniciar sesión.
3. Como usuario, quiero ser redirigido fuera de la página de login cuando ya tengo sesión, para no ver el login innecesariamente.
4. Como usuario, quiero ver los to-dos de hoy al abrir la app, para empezar a trabajar de inmediato.
5. Como usuario, quiero que cada to-do permanezca en el día en que lo creé, para que mi historial diario sea fiel.
6. Como usuario, quiero crear un to-do solo en la fecha de hoy, para no poder antedatar ni postdatar tareas.
7. Como usuario, quiero añadir un to-do con una sola línea de texto y pulsar Enter, para capturarlo rápido.
8. Como usuario, quiero que el texto vacío o solo espacios se ignore, para no crear entradas en blanco.
9. Como usuario, quiero editar el texto de un to-do en línea en hoy haciendo clic, para corregir erratas sin un formulario aparte.
10. Como usuario, quiero guardar la edición en línea con Enter o al perder el foco, para que los cambios persistan de forma natural.
11. Como usuario, quiero cancelar la edición en línea con Escape, para descartar cambios con seguridad.
12. Como usuario, quiero eliminar un to-do en hoy al instante sin confirmación, para que quitar sea sin fricción.
13. Como usuario, quiero marcar un to-do como hecho con un checkbox en cualquier día, para actualizar el estado al revisar listas pasadas.
14. Como usuario, quiero desmarcar un to-do hecho en cualquier día, para corregir errores.
15. Como usuario, quiero que los to-dos hechos aparezcan tachados, para distinguir completados de pendientes de un vistazo.
16. Como usuario, quiero que los to-dos mantengan el orden de creación aunque cambien de estado, para que la lista refleje cuándo añadí cada cosa.
17. Como usuario, quiero navegar al día anterior con un control atrás, para revisar ayer con facilidad.
18. Como usuario, quiero navegar al día siguiente con un control adelante cuando no estoy en hoy, para avanzar por el historial.
19. Como usuario, quiero que el control adelante esté deshabilitado en hoy, para no poder ir a días futuros.
20. Como usuario, quiero un botón «Hoy» que me lleve al día actual, para volver rápido al presente.
21. Como usuario, quiero que el botón «Hoy» esté deshabilitado cuando ya veo hoy, para que el control refleje mi contexto.
22. Como usuario, quiero un selector de fecha para ir a un día pasado concreto, para revisar historial arbitrario.
23. Como usuario, quiero que el selector de fecha tenga como máximo hoy, para no poder elegir una fecha futura en la UI.
24. Como usuario, quiero que una URL con un parámetro `fecha` inválido caiga en hoy, para que enlaces rotos no rompan la app.
25. Como usuario, quiero que una URL con un parámetro `fecha` futuro caiga en hoy, para bloquear días futuros también en servidor además de en la UI.
26. Como usuario, quiero ver un estado vacío cuando un día no tiene to-dos, para saber que el día está simplemente vacío y no roto.
27. Como usuario, quiero ver días pasados aunque no tengan to-dos, para confirmar que no planifiqué nada ese día.
28. Como usuario, quiero que el texto de to-dos en días pasados no sea editable, para preservar el registro histórico.
29. Como usuario, quiero que los to-dos de días pasados no tengan botón eliminar, para no borrar entradas históricas.
30. Como usuario, quiero que en días pasados no aparezca el formulario de creación, para no tentarme a añadir to-dos en el día equivocado.
31. Como usuario, quiero la etiqueta del día formateada en español (día de la semana, fecha), para leer el contexto en mi idioma.
32. Como usuario, quiero un indicador «Hoy» en la cabecera cuando veo el día actual, para saber en qué modo estoy.
33. Como usuario, quiero todo el copy de la UI en español, para que la app coincida con mi idioma.
34. Como usuario, quiero ver mi avatar o inicial en la cabecera, para saber qué cuenta está activa.
35. Como usuario, quiero un control visible de cerrar sesión, para salir en dispositivos compartidos.
36. Como usuario, quiero volver a la página de login tras cerrar sesión, para que la sesión quede claramente terminada.
37. Como usuario, quiero mis to-dos aislados de los datos de otros usuarios, para no ver ni modificar listas ajenas.
38. Como usuario, quiero que la app asuma una sola zona horaria fija en mi sesión, para que «hoy» sea inequívoco en el MVP.
39. Como usuario, quiero que la app funcione en modo oscuro si mi sistema lo prefiere, para usarla cómodamente de noche.
40. Como usuario, quiero que la app cargue rápido en una sola página sin rutas distintas por día, para que la navegación se sienta instantánea.

## Decisiones de implementación

### Arquitectura

- Vista de un día en Next.js App Router, con parámetro opcional `?fecha=YYYY-MM-DD` para elegir el día.
- NextAuth v5 con proveedor GitHub OAuth; sesión JWT; `session.user.id` rellenado desde `token.sub`.
- Middleware en rutas: usuarios no autenticados van a `/login`; autenticados en `/login` van a `/`.
- Server actions para todas las mutaciones de to-dos; el server component de la página carga los to-dos del día resuelto.

### Persistencia

- Base SQLite en disco; Drizzle ORM.
- Forma de la tabla `todos`:

```ts
{
  id: number;          // clave primaria autoincremental
  userId: string;      // id de usuario GitHub desde la sesión
  text: string;        // texto de una línea, recortado al escribir
  done: boolean;       // por defecto false
  day: string;         // YYYY-MM-DD, fijado en creación con today() local
  createdAt: Date;     // orden estable por fecha de creación
}
```

- Las consultas siempre filtran por `userId` + `day`; la lista ordena ascendente por `createdAt`.
- Antes de mutar, comprobar propiedad: el to-do debe pertenecer al usuario autenticado.

### Modelo de día

- `day` es una cadena calendario local `YYYY-MM-DD`; sin conversión de zona horaria más allá de la fecha local del runtime.
- `today()` devuelve la fecha local actual como `YYYY-MM-DD`.
- `parseDayParam` valida formato y corrección calendario; devuelve null si es inválido.
- `isFutureDay` compara cadenas de día lexicográficamente con `today()` (válido porque las fechas ISO ordenan cronológicamente).
- La página resuelve el día: `fecha` parseada si es válida y no futura; si no, `today()`.
- La bandera `editable` es true solo cuando el día resuelto coincide con `today()`.

### Reglas de mutación de to-dos

| Operación      | Hoy      | Día pasado | Notas                                      |
| -------------- | -------- | ---------- | ------------------------------------------ |
| crear          | permitido | bloqueado  | `day` siempre `today()` al insertar        |
| editar texto   | permitido | bloqueado  | error si todo.day !== today()              |
| eliminar       | permitido | bloqueado  | error si todo.day !== today()              |
| marcar hecho   | permitido | permitido  | sin guardia por día                        |

- Texto vacío o solo espacios en crear: no-op; en actualizar: no-op o rechazo según guardias.
- Tras mutaciones, revalidar la ruta principal para refrescar la lista.

### Composición de la UI

- Cabecera: título «Mis to-dos», etiqueta del día formateada, sufijo opcional «· Hoy», menú de usuario con avatar y «Cerrar sesión».
- DateNav: día anterior, día siguiente (deshabilitado en hoy), «Hoy» (deshabilitado en hoy), input de fecha con `max=today()`.
- TodoApp: formulario de creación condicional (solo hoy), lista o vacío «No hay to-dos este día».
- TodoItem: checkbox siempre activo; texto clicable para editar solo en hoy; botón eliminar solo en hoy; hechos con tachado.
- Layout con `lang="es"`.
- Estilo: paleta zinc de Tailwind; modo oscuro vía `prefers-color-scheme`. El rediseño Soft Clarity está documentado aparte y no forma parte de esta spec.

### Configuración de auth

- Variables de entorno: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`.
- Callback OAuth GitHub: `/api/auth/callback/github`.
- Página de login en `/login` con server action «Continuar con GitHub».

### Errores de autorización

- Acceso no autenticado a acciones de to-dos: «No autorizado».
- Editar/eliminar to-dos que no son de hoy: «No se puede editar/eliminar este to-do».
- Toggle en to-do inexistente o ajeno: «To-do no encontrado».

## Decisiones de pruebas

### Qué hace una buena prueba

- Probar comportamiento observable desde fuera: dado un usuario, un día y to-dos existentes, la operación tiene éxito o falla con el resultado persistido correcto.
- No probar detalles de implementación (formas concretas de consultas Drizzle, estado de componentes React, llamadas a revalidación de Next.js).
- No probar el flujo OAuth de NextAuth ni redirecciones del middleware en la suite inicial — son integración con mucho setup; priorizar reglas de dominio.

### Seam propuesto (único)

**Capa de reglas de dominio** — una suite que cubra:

1. **Utilidades de fecha** (funciones puras): `parseDayParam`, `isFutureDay`, `isToday`, `addDays`, `formatDay` — fechas inválidas, bloqueo de futuro, detección de hoy, aritmética de días.
2. **Server actions de to-dos** (SQLite de prueba aislado, sesión mock y reloj `today()` mock): crear asigna el día de hoy; crear/editar/eliminar rechazados en to-dos de días pasados; toggle en pasado y hoy; aislamiento por usuario; texto vacío; orden por `createdAt`; filtro por día.

Es el seam práctico más alto: cubre R2, R5, R6, R7, R8 y R9 sin automatización de navegador. Auth y middleware pueden añadirse después como E2E si hace falta.

### Módulos a probar

- Módulo de utilidades de fecha (unitarias puras).
- Módulo de server actions de to-dos (integración con BD de prueba + sesión mock + reloj mock para `today()`).

### Prior art

- No hay pruebas en el repositorio. Hay que introducir runner y harness (p. ej. Vitest con SQLite en memoria o archivo temporal).

### Nota sobre inyección de reloj

- `today()` se llama directamente dentro de las server actions. Las pruebas necesitarán mock del módulo de fechas o refactor para inyectar reloj — preferir mock en tests para no tocar código de producción salvo que el mock sea frágil.

## Fuera de alcance

- Compartir to-dos con otros usuarios
- Recordatorios y notificaciones
- Múltiples listas o proyectos
- Internacionalización más allá del español
- Mover to-dos entre días
- Rediseño visual (Soft Clarity UI — ver `visual-reference.md`)
- Viajes de zona horaria o configuración por usuario
- Despliegue y migración a BD de producción (Turso, Neon, etc.)
- Commit git, pull request o CI
- Soporte offline o apps nativas móviles
- Prioridad, etiquetas, horas límite o adjuntos en to-dos
- Deshacer eliminación
- Diálogos de confirmación al eliminar
- Operaciones en lote

## Notas adicionales

- El MVP ya está implementado y pasa `bun run build`. Esta spec documenta el comportamiento acordado en shaping (R0–R11, fit check 12/12) para regresión y trabajo futuro de agentes.
- Artefactos relacionados: `shaping.md` (requisitos + forma CURRENT), `breadboarding.md` (places, affordances, workflow).
- Los places del breadboard mapean a prioridades de prueba: las reglas de P3 backend las cubre el seam propuesto; P1/P2 auth y navegación UI son candidatos manuales/E2E en una spec posterior.
- Al implementar tests, sembrar la BD de prueba por caso; no compartir estado mutable entre tests.
