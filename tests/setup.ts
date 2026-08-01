import { vi } from "vitest";

vi.mock("@/lib/db/schema", async () => {
  return await import("@/lib/db/schema.sqlite");
});

import "./helpers/mocks";
import "./helpers/bind-db";
