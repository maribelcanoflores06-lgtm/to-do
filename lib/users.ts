import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalized))
    .limit(1);

  return user;
}

export async function createUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);

  const [user] = await db
    .insert(users)
    .values({
      email: normalized,
      passwordHash,
      name: normalized.split("@")[0] ?? "Usuario",
    })
    .returning();

  return user;
}

export async function verifyUserPassword(
  email: string,
  password: string,
): Promise<{ id: string; email: string; name: string | null } | null> {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return null;
  }

  return {
    id: String(user.id),
    email: user.email,
    name: user.name,
  };
}
