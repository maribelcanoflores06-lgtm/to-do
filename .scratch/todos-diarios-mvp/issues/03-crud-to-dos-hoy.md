# 03 — Crear, listar, editar y eliminar to-dos de hoy

**Qué construir:** Cobertura verificable del ciclo de vida de to-dos en el día actual: creación con día fijado a hoy, listado filtrado por usuario y día, edición y eliminación permitidas solo en hoy, rechazo en días pasados, ignorar texto vacío, y orden estable por creación. Tras este ticket, las reglas R2, R7 y R9 del shaping quedan protegidas contra regresiones en la capa de persistencia.

**Blocked by:** 02 — Reglas de fecha y resolución de día

**Status:** ready-for-agent

- [ ] `createTodo` con sesión autenticada persiste un to-do con `day` igual al `today()` mockeado y `done = false`.
- [ ] `createTodo` con texto vacío o solo espacios no inserta fila alguna.
- [ ] `getTodos(day)` devuelve solo to-dos del usuario autenticado y del día solicitado, ordenados por `createdAt` ascendente.
- [ ] `getTodos` sin sesión devuelve lista vacía.
- [ ] `updateTodo` modifica el texto de un to-do de hoy propiedad del usuario.
- [ ] `updateTodo` lanza error al intentar editar un to-do cuyo `day` no es hoy.
- [ ] `deleteTodo` elimina un to-do de hoy propiedad del usuario.
- [ ] `deleteTodo` lanza error al intentar eliminar un to-do cuyo `day` no es hoy.
- [ ] Tras crear varios to-dos, el orden de `getTodos` refleja orden de creación aunque algunos estén hechos.
- [ ] Todas las pruebas de este ticket pasan con `bun run test`.
