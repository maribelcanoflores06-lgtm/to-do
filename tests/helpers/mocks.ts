import { vi } from "vitest";

export const mockRevalidatePath = vi.fn();

vi.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => mockRevalidatePath(...args),
}));

export const mockAuth = vi.fn<
  () => Promise<{ user: { id: string; name: string; email: string } } | null>
>();

vi.mock("@/auth", () => ({
  auth: () => mockAuth(),
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

export const mockToday = vi.fn<() => string>();

vi.mock("@/lib/dates", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/dates")>();
  return {
    ...actual,
    today: () => mockToday(),
  };
});

mockToday.mockReturnValue("2026-08-01");

export function setAuthUser(userId: string) {
  mockAuth.mockResolvedValue({
    user: { id: userId, name: "Usuario de prueba", email: "test@example.com" },
  });
}

export function clearAuth() {
  mockAuth.mockResolvedValue(null);
}

export function setToday(day: string) {
  mockToday.mockReturnValue(day);
}

export function resetMocks() {
  mockAuth.mockReset();
  mockToday.mockReset();
  mockToday.mockReturnValue("2026-08-01");
  mockRevalidatePath.mockReset();
  clearAuth();
}
