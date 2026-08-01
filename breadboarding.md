---
shaping: true
---

# To-dos Diarios — Breadboard

Mapeo del sistema **CURRENT** implementado. Basado en `shaping.md`.

**Workflow principal:** Usuario no autenticado → login GitHub → ve to-dos del día → navega a día pasado → marca done → vuelve a hoy → crea/edita/elimina to-do.

---

## Places

| # | Place | Description |
|---|-------|-------------|
| **P1** | Login Page | Entrada sin sesión; botón OAuth GitHub |
| **P2** | Day View | Una página, un día: navegación, lista, CRUD (solo hoy), toggle done |
| **P3** | Backend | Server actions, SQLite, NextAuth handlers, middleware |

---

## UI Affordances

| # | Place | Component | Affordance | Control | Wires Out | Returns To |
|---|-------|-----------|------------|---------|-----------|------------|
| **U1** | P1 | login/page | "Continuar con GitHub" button | click | → N1 | — |
| **U2** | P1 | login/page | title + description copy | render | — | — |
| **U3** | P2 | page | "Mis to-dos" heading | render | — | — |
| **U4** | P2 | page | day label (`formatDayLabel`) | render | — | — |
| **U5** | P2 | UserMenu | avatar / initial | render | — | — |
| **U6** | P2 | UserMenu | "Cerrar sesión" button | click | → N2 | — |
| **U7** | P2 | DateNav | ← día anterior | click | → N10 | — |
| **U8** | P2 | DateNav | → día siguiente (disabled en hoy) | click | → N10 | — |
| **U9** | P2 | DateNav | "Hoy" button | click | → N10 | — |
| **U10** | P2 | DateNav | `<input type="date">` selector | change | → N10 | — |
| **U11** | P2 | TodoApp | "Añadir to-do…" input | submit | → N14 | — |
| **U12** | P2 | TodoApp | "No hay to-dos este día" empty state | render | — | — |
| **U13** | P2 | TodoItem | todo row | render | — | — |
| **U14** | P2 | TodoItem | done checkbox | change | → N18 | — |
| **U15** | P2 | TodoItem | todo text button | click | → N15 | — |
| **U16** | P2 | TodoItem | inline edit input | blur / Enter | → N16 | — |
| **U17** | P2 | TodoItem | 🗑 delete button | click | → N17 | — |
| **U18** | P2 | TodoItem | struck-through text (done) | render | — | — |

**Condicionales en P2 (mismo Place, estado local):**

| Condición | Affordances visibles |
|-----------|---------------------|
| `editable === true` (hoy) | U11, U15 (edit), U16 (editing), U17 |
| `editable === false` (pasado) | U14 solo; sin U11, U15 edit, U17 |
| `todos.length === 0` | U12 |
| `todo.done === true` | U18 |

---

## Code Affordances

| # | Place | Component | Affordance | Control | Wires Out | Returns To |
|---|-------|-----------|------------|---------|-----------|------------|
| **N1** | P1 | login/page | `signIn("github", { redirectTo: "/" })` | call | → N25 | → P2 |
| **N2** | P2 | lib/actions/auth | `signOutAction()` | call | → N3 | — |
| **N3** | P3 | auth | `signOut({ redirectTo: "/login" })` | call | → P1 | — |
| **N4** | P3 | middleware | `auth()` route guard | observe | → P1 | — |
| **N5** | P2 | app/page | `auth()` + redirect if no session | call | → P1 | — |
| **N6** | P2 | app/page | `parseDayParam()` + `isFutureDay()` | call | — | → N7 |
| **N7** | P2 | app/page | resolved `day` value | write | — | → U4, → N8, → N12 |
| **N8** | P3 | lib/actions/todos | `getTodos(day)` | call | → N9 | → U13 |
| **N9** | P3 | lib/db | SQLite SELECT `userId + day` ORDER BY `createdAt` | query | — | → N8 |
| **N10** | P2 | DateNav | `router.push("/" \| "/?fecha=")` | call | → S1 | — |
| **N11** | P2 | app/page | `searchParams.fecha` read | read | — | → N6 |
| **N12** | P2 | TodoApp | `isToday(day)` → `editable` | call | — | → U11, U15, U17 |
| **N13** | P3 | lib/actions/todos | `createTodo(text)` | call | → N19, → N24, → N20 | — |
| **N14** | P2 | TodoApp | `handleCreate()` | call | → N13 | — |
| **N15** | P2 | TodoItem | `setIsEditing(true)` | call | → U16 | — |
| **N16** | P3 | lib/actions/todos | `updateTodo(id, text)` | call | → N21, → N20 | — |
| **N17** | P3 | lib/actions/todos | `deleteTodo(id)` | call | → N22, → N20 | — |
| **N18** | P3 | lib/actions/todos | `toggleTodo(id, done)` | call | → N23, → N20 | — |
| **N19** | P3 | lib/dates | `today()` | call | — | → N13, → N12 |
| **N20** | P3 | next/cache | `revalidatePath("/")` | call | → N8 | — |
| **N21** | P3 | lib/db | SQLite UPDATE text (guard `day === today()`) | write | → S2 | — |
| **N22** | P3 | lib/db | SQLite DELETE (guard `day === today()`) | write | → S2 | — |
| **N23** | P3 | lib/db | SQLite UPDATE `done` | write | → S2 | — |
| **N24** | P3 | lib/db | SQLite INSERT todo | write | → S2 | — |
| **N25** | P3 | auth + api/auth | NextAuth GitHub OAuth handlers | call | — | → S3 |
| **N26** | P2 | TodoApp | `router.refresh()` | call | → N5, → N8 | — |

---

## Data Stores

| # | Place | Store | Description |
|---|-------|-------|-------------|
| **S1** | P2 | Browser URL (`?fecha=YYYY-MM-DD`) | Día seleccionado; `max=today` en picker; futuros bloqueados en `DateNav` y `page.tsx` |
| **S2** | P3 | SQLite `todos` table | `id`, `userId`, `text`, `done`, `day`, `createdAt` en `data/todo.db` |
| **S3** | P3 | NextAuth JWT session | `session.user.id = token.sub`; scope por usuario en queries |

---

## Workflow Guide

| Step | Action | Where to look |
|------|--------|---------------|
| **1** | Usuario sin sesión llega a `/` | N4 → P1 |
| **2** | Click "Continuar con GitHub" | U1 → N1 → N25 → S3 → P2 |
| **3** | Página carga to-dos de hoy | N11 → N6 → N7 → N8 → N9 → U13 |
| **4** | Crear to-do (hoy) | U11 → N14 → N13 → N19, N24 → S2 → N20 → N8 |
| **5** | Editar texto (hoy) | U15 → U16 → N16 → N21 → S2 → N20 |
| **6** | Eliminar (hoy) | U17 → N17 → N22 → S2 → N20 |
| **7** | Marcar done (cualquier día) | U14 → N18 → N23 → S2 → N20 |
| **8** | Navegar a día pasado | U7/U10 → N10 → S1 → N11 → N6 → N8 |
| **9** | Cerrar sesión | U6 → N2 → N3 → P1 |

---

## Mermaid Diagram

```mermaid
flowchart TB
    subgraph P1["P1: Login Page"]
        U1["U1: Continuar con GitHub"]
        U2["U2: title + description"]
        N1["N1: signIn(github)"]
    end

    subgraph P2["P2: Day View"]
        U3["U3: Mis to-dos heading"]
        U4["U4: day label"]
        U5["U5: avatar"]
        U6["U6: Cerrar sesión"]
        U7["U7: ← prev day"]
        U8["U8: → next day"]
        U9["U9: Hoy"]
        U10["U10: date picker"]
        U11["U11: Añadir to-do input"]
        U12["U12: empty state"]
        U13["U13: todo row"]
        U14["U14: checkbox"]
        U15["U15: text button"]
        U16["U16: inline edit"]
        U17["U17: delete"]
        U18["U18: struck-through text"]

        N2["N2: signOutAction()"]
        N6["N6: parseDayParam + isFutureDay"]
        N7["N7: resolved day"]
        N10["N10: router.push"]
        N11["N11: searchParams.fecha read"]
        N12["N12: isToday → editable"]
        N14["N14: handleCreate()"]
        N15["N15: setIsEditing(true)"]
        N26["N26: router.refresh()"]
    end

    subgraph P3["P3: Backend"]
        N3["N3: signOut()"]
        N4["N4: middleware auth()"]
        N5["N5: page auth()"]
        N8["N8: getTodos(day)"]
        N9["N9: SQLite SELECT"]
        N13["N13: createTodo()"]
        N16["N16: updateTodo()"]
        N17["N17: deleteTodo()"]
        N18["N18: toggleTodo()"]
        N19["N19: today()"]
        N20["N20: revalidatePath"]
        N21["N21: SQLite UPDATE text"]
        N22["N22: SQLite DELETE"]
        N23["N23: SQLite UPDATE done"]
        N24["N24: SQLite INSERT"]
        N25["N25: NextAuth OAuth handlers"]

        S2["S2: todos table"]
        S3["S3: JWT session"]
    end

    S1["S1: Browser URL ?fecha="]

    N4 --> P1
    N5 --> P1
    U1 --> N1
    N1 --> N25
    N25 --> S3
    N1 --> P2

    U6 --> N2
    N2 --> N3
    N3 --> P1

    S1 --> N11
    N11 --> N6
    N6 --> N7
    N7 --> U4
    N7 --> N8
    N7 --> N12

    U7 --> N10
    U8 --> N10
    U9 --> N10
    U10 --> N10
    N10 --> S1

    N8 --> N9
    N9 --> S2
    N8 -.-> U13

    N12 -.-> U11
    N12 -.-> U15
    N12 -.-> U17

    U11 --> N14
    N14 --> N13
    N13 --> N19
    N13 --> N24
    N24 --> S2
    N13 --> N20
    N20 --> N8

    U15 --> N15
    N15 --> U16
    U16 --> N16
    N16 --> N21
    N21 --> S2
    N16 --> N20

    U17 --> N17
    N17 --> N22
    N22 --> S2
    N17 --> N20

    U14 --> N18
    N18 --> N23
    N23 --> S2
    N18 --> N20
    N18 --> N26

    S3 -.-> N8
    S3 -.-> N13
    S3 -.-> N16
    S3 -.-> N17
    S3 -.-> N18

    classDef ui fill:#ffb6c1,stroke:#d87093,color:#000
    classDef nonui fill:#d3d3d3,stroke:#808080,color:#000
    classDef store fill:#e6e6fa,stroke:#9370db,color:#000

    class U1,U2,U3,U4,U5,U6,U7,U8,U9,U10,U11,U12,U13,U14,U15,U16,U17,U18 ui
    class N1,N2,N3,N4,N5,N6,N7,N8,N9,N10,N11,N12,N13,N14,N15,N16,N17,N18,N19,N20,N21,N22,N23,N24,N25,N26 nonui
    class S1,S2,S3 store
```

---

## Verification

| Check | Result |
|-------|--------|
| Every display U has data source | ✅ U13 ← N8; U4 ← N7; U12 ← empty list |
| Every N has Wires Out or Returns To | ✅ |
| Navigation wired to Places | ✅ N1→P2, N3→P1, N4→P1 |
| External state modeled as stores | ✅ S1 URL, S3 session |
| Backend as Place | ✅ P3 with S2 + resolvers |
| Matches `shaping.md` CURRENT parts | ✅ |
