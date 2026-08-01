# 03 — Crear, listar, editar y eliminar to-dos de hoy

**Qué construir:** Cobertura verificable del ciclo de vida de to-dos en el día actual: creación con día fijado a hoy, listado filtrado por usuario y día, edición y eliminación permitidas solo en hoy, rechazo en días pasados, ignorar texto vacío, y orden estable por creación. Tras este ticket, las reglas R2, R7 y R9 del shaping quedan protegidas contra regresiones en la capa de persistencia.

**Blocked by:** 02 — Reglas de fecha y resolución de día

**Status:** resolved

- [x] `createTodo` con sesión autenticada persiste un to-do con `day` igual al `today()` mockeado y `done = false`.
- [x] `createTodo` con texto vacío o solo espacios no inserta fila alguna.
- [x] `getTodos(day)` devuelve solo to-dos del usuario autenticado y del día solicitado, ordenados por `createdAt` ascendente.
- [x] `getTodos` sin sesión devuelve lista vacía.
- [x] `updateTodo` modifica el texto de un to-do de hoy propiedad del usuario.
- [x] `updateTodo` lanza error al intentar editar un to-do cuyo `day` no es hoy.
- [x] `deleteTodo` elimina un to-do de hoy propiedad del usuario.
- [x] `deleteTodo` lanza error al intentar eliminar un to-do cuyo `day` no es hoy.
- [x] Tras crear varios to-dos, el orden de `getTodos` refleja orden de creación aunque algunos estén hechos.
- [x] Todas las pruebas de este ticket pasan con `bun run test`.

## Answer

Cobertura en `tests/todos.test.ts` (describe «crear y listar», «editar y eliminar»). Helper `bind-db.ts` inyecta BD de prueba en `@/lib/db`.
