# 04 — Marcar hecho en cualquier día y aislamiento entre usuarios

**Qué construir:** Cobertura verificable de las reglas transversales restantes: marcar y desmarcar done funciona en to-dos de hoy y de días pasados; un usuario no puede leer ni mutar to-dos de otro; acciones sin sesión fallan con error de autorización. Tras este ticket, las reglas R8, R13, R14 y R37 del shaping quedan protegidas y la suite de dominio del MVP está completa según la spec.

**Blocked by:** 03 — Crear, listar, editar y eliminar to-dos de hoy

**Status:** ready-for-agent

- [ ] `toggleTodo` marca y desmarca `done` en un to-do de hoy propiedad del usuario.
- [ ] `toggleTodo` marca y desmarca `done` en un to-do de un día pasado propiedad del usuario (sin guardia de día).
- [ ] `toggleTodo` lanza error si el to-do no existe o pertenece a otro usuario.
- [ ] `getTodos` de un usuario no incluye to-dos de otro usuario aunque compartan el mismo `day`.
- [ ] `updateTodo`, `deleteTodo` y `toggleTodo` lanzan «No autorizado» sin sesión autenticada.
- [ ] Todas las pruebas de este ticket pasan con `bun run test` y la suite completa permanece verde.
