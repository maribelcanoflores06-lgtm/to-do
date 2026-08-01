import Image from "next/image";

import { signOutAction } from "@/lib/actions/auth";

type UserMenuProps = {
  name?: string | null;
  image?: string | null;
};

export function UserMenu({ name, image }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3">
      {image ? (
        <Image
          src={image}
          alt={name ?? "Usuario"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {(name ?? "U").charAt(0).toUpperCase()}
        </div>
      )}
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-lg px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
