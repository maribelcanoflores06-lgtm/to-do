# 02 — Reglas de fecha y resolución de día

**Qué construir:** Cobertura verificable de las reglas de calendario del MVP: qué cuenta como «hoy», qué fechas son futuras, cómo se valida el parámetro `fecha`, y cómo se calculan días adyacentes. Tras este ticket, un cambio que rompa la navegación por días o el bloqueo de futuros fallará en CI local con `bun run test`.

**Blocked by:** 01 — Harness de pruebas de dominio

**Status:** resolved

- [x] `parseDayParam` acepta `YYYY-MM-DD` válido y rechaza formatos inválidos, fechas imposibles (p. ej. 2026-02-30) y valores vacíos.
- [x] `isFutureDay` distingue correctamente día futuro, hoy y día pasado respecto a `today()` mockeado.
- [x] `isToday` identifica el día actual cuando `today()` está mockeado.
- [x] `addDays` avanza y retrocede días correctamente, incluyendo cambio de mes.
- [x] `formatDay` produce cadena `YYYY-MM-DD` coherente con la fecha local de entrada.
- [x] `formatDayLabel` produce etiqueta en español con día de la semana capitalizado.
- [x] Todas las pruebas de este ticket pasan con `bun run test`.

## Answer

Cobertura en `tests/dates.test.ts` — 10 tests.
