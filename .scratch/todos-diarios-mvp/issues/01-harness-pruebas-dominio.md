# 01 — Harness de pruebas de dominio

**Qué construir:** Infraestructura mínima para ejecutar pruebas de reglas de dominio del MVP. Un desarrollador (o agente) puede clonar el repo, instalar dependencias y ejecutar `bun run test` para ver una suite verde con al menos una prueba smoke, sin depender de GitHub OAuth ni de la base de datos de desarrollo.

**Blocked by:** Ninguno — puede empezar de inmediato.

**Status:** resolved

- [x] Vitest configurado con resolución de paths del proyecto (alias `@/`).
- [x] Script `test` añadido en el manifest del proyecto; `bun run test` ejecuta la suite.
- [x] Factory de base SQLite de prueba aislada (archivo temporal o en memoria) con esquema `todos` aplicado; cada caso de prueba parte de BD limpia.
- [x] Helpers reutilizables para mock de sesión autenticada (`userId`) y mock de `today()` con fecha fija.
- [x] Mock de `revalidatePath` de Next.js para que las server actions no fallen en entorno de prueba.
- [x] Al menos una prueba smoke pasa en verde demostrando que el harness funciona.

## Answer

Implementado en commit con: `vitest.config.ts`, `tests/setup.ts`, `tests/helpers/test-db.ts`, `tests/helpers/mocks.ts`, `tests/smoke.test.ts`, refactor `lib/db/create-client.ts`. `bun run test` — 2 tests verdes; `bun run build` — OK.
