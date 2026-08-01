---
shaping: true
---

# To-dos Diarios — Shaping

## Requirements (R)


| ID      | Requirement                                                                                                                             | Status    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **R0**  | App de to-dos diarios donde cada to-do pertenece permanentemente al día en que se creó, y el usuario navega y gestiona to-dos por fecha | Core goal |
| **R1**  | Login con GitHub obligatorio; sin sesión no se accede a la app                                                                          | Must-have |
| **R2**  | Un to-do queda fijado a la fecha local de creación; no se puede crear to-dos en fechas pasadas ni futuras                               | Must-have |
| **R3**  | MVP asume una sola zona horaria fija por usuario (sin viajes ni cambios de huso)                                                        | Must-have |
| **R4**  | Una sola página que muestra un día a la vez                                                                                             | Must-have |
| **R5**  | Navegación fácil a días pasados: flechas ← →, botón "Hoy", selector de fecha; no se puede ir a días futuros                             | Must-have |
| **R6**  | Se puede navegar a cualquier día pasado, aunque no tenga to-dos (estado vacío)                                                          | Must-have |
| **R7**  | En **hoy**: crear, editar texto en línea, eliminar al instante, marcar done con checkbox                                                | Must-have |
| **R8**  | En **días pasados**: contenido solo lectura (sin crear, editar texto ni eliminar); sí se puede marcar/unmarcar done con checkbox        | Must-have |
| **R9**  | Cada to-do es una sola línea de texto, ordenada por creación; los hechos se tachan pero no se reordenan                                 | Must-have |
| **R10** | Interfaz en español                                                                                                                     | Must-have |
| **R11** | Cerrar sesión visible (p. ej. avatar + botón)                                                                                           | Must-have |




### Fuera de scope

- Compartir to-dos
- Recordatorios / notificaciones
- Múltiples listas o proyectos
- i18n / inglés
- Mover to-dos entre días
- Rediseño visual (Soft Clarity UI — ver `visual-reference.md`)

---



## CURRENT: Next.js app con auth GitHub, SQLite y vista por día

Baseline de lo implementado en el repo.


| Part         | Mechanism                                                                                                        | Flag |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ---- |
| **CURRENT1** | **Auth GitHub**                                                                                                  |      |
| CURRENT1.1   | NextAuth v5 con proveedor GitHub; JWT session con `user.id = token.sub`                                          |      |
| CURRENT1.2   | `middleware.ts` redirige rutas no autenticadas a `/login`; `/login` redirige a `/` si hay sesión                 |      |
| CURRENT1.3   | `/login` con server action `signIn("github")`; `UserMenu` con `signOutAction` → `/login`                         |      |
| **CURRENT2** | **Persistencia por usuario y día**                                                                               |      |
| CURRENT2.1   | SQLite (`data/todo.db`) + Drizzle; tabla `todos`: `userId`, `text`, `done`, `day` (YYYY-MM-DD), `createdAt`      |      |
| CURRENT2.2   | `createTodo` asigna `day = today()` en server action; rechaza edición/borrado si `todo.day !== today()`          |      |
| CURRENT2.3   | `lib/dates.ts`: `today()`, `formatDay()`, parsing local; sin lógica de cambio de huso                            |      |
| **CURRENT3** | **Vista de un día**                                                                                              |      |
| CURRENT3.1   | `app/page.tsx` lee `?fecha=YYYY-MM-DD`; invalida futuros → cae en hoy; `getTodos(day)` filtra por `userId + day` |      |
| CURRENT3.2   | `DateNav`: flechas ← →, botón "Hoy", `<input type="date" max={today()}>`; bloquea navegación a futuro            |      |
| CURRENT3.3   | Estado vacío: "No hay to-dos este día" cuando la lista está vacía                                                |      |
| **CURRENT4** | **Interacciones en hoy**                                                                                         |      |
| CURRENT4.1   | Formulario fijo "Añadir to-do…" + Enter → `createTodo` (solo si `editable === isToday(day)`)                     |      |
| CURRENT4.2   | Clic en texto → edición inline; Enter/blur guarda; Escape cancela → `updateTodo`                                 |      |
| CURRENT4.3   | Icono 🗑 → `deleteTodo` al instante, sin confirmación                                                            |      |
| CURRENT4.4   | Checkbox → `toggleTodo`; texto tachado con `line-through`, sin reordenar (`orderBy createdAt`)                   |      |
| **CURRENT5** | **Interacciones en días pasados**                                                                                |      |
| CURRENT5.1   | Sin formulario de creación; texto no editable; sin botón eliminar (`editable = false`)                           |      |
| CURRENT5.2   | Checkbox done sigue activo → `toggleTodo` sin restricción de `day`                                               |      |
| **CURRENT6** | **UI en español**                                                                                                |      |
| CURRENT6.1   | Copy en español: títulos, placeholders, estados vacíos, aria-labels, `lang="es"` en layout                       |      |
| CURRENT6.2   | Tailwind zinc palette; dark mode via `prefers-color-scheme` (no Soft Clarity UI)                                 |      |


---



## Fit Check: R × CURRENT


| Req | Requirement                                                                                                                             | Status    | CURRENT |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| R0  | App de to-dos diarios donde cada to-do pertenece permanentemente al día en que se creó, y el usuario navega y gestiona to-dos por fecha | Core goal | ✅       |
| R1  | Login con GitHub obligatorio; sin sesión no se accede a la app                                                                          | Must-have | ✅       |
| R2  | Un to-do queda fijado a la fecha local de creación; no se puede crear to-dos en fechas pasadas ni futuras                               | Must-have | ✅       |
| R3  | MVP asume una sola zona horaria fija por usuario (sin viajes ni cambios de huso)                                                        | Must-have | ✅       |
| R4  | Una sola página que muestra un día a la vez                                                                                             | Must-have | ✅       |
| R5  | Navegación fácil a días pasados: flechas ← →, botón "Hoy", selector de fecha; no se puede ir a días futuros                             | Must-have | ✅       |
| R6  | Se puede navegar a cualquier día pasado, aunque no tenga to-dos (estado vacío)                                                          | Must-have | ✅       |
| R7  | En **hoy**: crear, editar texto en línea, eliminar al instante, marcar done con checkbox                                                | Must-have | ✅       |
| R8  | En **días pasados**: contenido solo lectura (sin crear, editar texto ni eliminar); sí se puede marcar/unmarcar done con checkbox        | Must-have | ✅       |
| R9  | Cada to-do es una sola línea de texto, ordenada por creación; los hechos se tachan pero no se reordenan                                 | Must-have | ✅       |
| R10 | Interfaz en español                                                                                                                     | Must-have | ✅       |
| R11 | Cerrar sesión visible (p. ej. avatar + botón)                                                                                           | Must-have | ✅       |


**Notes:** Sin fallos. CURRENT satisface todos los requirements confirmados.

---



## Estado


| Fase       | Estado                           |
| ---------- | -------------------------------- |
| R          | ✅ Confirmado                     |
| Shape      | ✅ CURRENT (seleccionada)         |
| Fit check  | ✅ 12/12                          |
| Breadboard | ✅ Ver `breadboarding.md`         |
| Slicing    | No necesario — MVP ya construido |


