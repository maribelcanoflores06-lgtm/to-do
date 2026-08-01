import { beforeEach, describe, expect, it } from "vitest";

import {
  addDays,
  formatDay,
  formatDayLabel,
  isFutureDay,
  isToday,
  parseDayParam,
} from "@/lib/dates";

import { DEFAULT_TODAY } from "./helpers/fixtures";
import { resetMocks, setToday } from "./helpers/mocks";

describe("reglas de fecha", () => {
  beforeEach(() => {
    resetMocks();
    setToday(DEFAULT_TODAY);
  });

  describe("parseDayParam", () => {
    it("acepta YYYY-MM-DD válido", () => {
      expect(parseDayParam("2026-08-01")).toBe("2026-08-01");
    });

    it("rechaza valores vacíos o undefined", () => {
      expect(parseDayParam(undefined)).toBeNull();
      expect(parseDayParam("")).toBeNull();
    });

    it("rechaza formatos inválidos", () => {
      expect(parseDayParam("08-01-2026")).toBeNull();
      expect(parseDayParam("2026-8-1")).toBeNull();
      expect(parseDayParam("not-a-date")).toBeNull();
    });

    it("rechaza fechas imposibles", () => {
      expect(parseDayParam("2026-02-30")).toBeNull();
      expect(parseDayParam("2026-13-01")).toBeNull();
    });
  });

  describe("isFutureDay", () => {
    it("distingue futuro, hoy y pasado respecto a today() mockeado", () => {
      setToday("2026-08-01");

      expect(isFutureDay("2026-08-02")).toBe(true);
      expect(isFutureDay("2026-08-01")).toBe(false);
      expect(isFutureDay("2026-07-31")).toBe(false);
    });
  });

  describe("isToday", () => {
    it("identifica el día actual cuando today() está mockeado", () => {
      setToday("2026-08-01");

      expect(isToday("2026-08-01")).toBe(true);
      expect(isToday("2026-07-31")).toBe(false);
    });
  });

  describe("addDays", () => {
    it("retrocede y avanza días", () => {
      expect(addDays("2026-08-01", -1)).toBe("2026-07-31");
      expect(addDays("2026-08-01", 1)).toBe("2026-08-02");
    });

    it("cruza cambio de mes", () => {
      expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
      expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    });
  });

  describe("formatDay", () => {
    it("produce YYYY-MM-DD coherente con la fecha local", () => {
      expect(formatDay(new Date(2026, 7, 1))).toBe("2026-08-01");
      expect(formatDay(new Date(2026, 0, 5))).toBe("2026-01-05");
    });
  });

  describe("formatDayLabel", () => {
    it("produce etiqueta en español con día de la semana capitalizado", () => {
      const label = formatDayLabel("2026-08-01");

      expect(label.charAt(0)).toBe(label.charAt(0).toUpperCase());
      expect(label).toMatch(/sábado/i);
      expect(label).toMatch(/agosto/i);
      expect(label).toMatch(/2026/);
    });
  });
});
