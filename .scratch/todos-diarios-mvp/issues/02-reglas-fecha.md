# 02 — Reglas de fecha y resolución de día

**Qué construir:** Cobertura verificable de las reglas de calendario del MVP: qué cuenta como «hoy», qué fechas son futuras, cómo se valida el parámetro `fecha`, y cómo se calculan días adyacentes. Tras este ticket, un cambio que rompa la navegación por días o el bloqueo de futuros fallará en CI local con `bun run test`.

**Blocked by:** 01 — Harness de pruebas de dominio

**Status:** ready-for-agent

- [ ] `parseDayParam` acepta `YYYY-MM-DD` válido y rechaza formatos inválidos, fechas imposibles (p. ej. 2026-02-30) y valores vacíos.
- [ ] `isFutureDay` distingue correctamente día futuro, hoy y día pasado respecto a `today()` mockeado.
- [ ] `isToday` identifica el día actual cuando `today()` está mockeado.
- [ ] `addDays` avanza y retrocede días correctamente, incluyendo cambio de mes.
- [ ] `formatDay` produce cadena `YYYY-MM-DD` coherente con la fecha local de entrada.
- [ ] `formatDayLabel` produce etiqueta en español con día de la semana capitalizado.
- [ ] Todas las pruebas de este ticket pasan con `bun run test`.
