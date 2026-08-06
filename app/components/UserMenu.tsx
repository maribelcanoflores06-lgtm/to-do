"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { signOutAction } from "@/lib/actions/auth";

import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

type UserMenuProps = {
  name?: string | null;
  image?: string | null;
};

export function UserMenu({ name, image }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const label = name ?? "Usuario";

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#F0F0F0] text-sm font-semibold text-black outline-none transition hover:bg-[#E5E5E5] focus-visible:ring-2 focus-visible:ring-black/20"
      >
        {image ? (
          <Image
            src={image}
            alt={label}
            width={40}
            height={40}
            className="h-10 w-10 object-cover"
          />
        ) : (
          <span aria-hidden>{label.charAt(0).toUpperCase()}</span>
        )}
        <span className="sr-only">Menú de usuario</span>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-20 mt-2 w-56 rounded-[20px] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
        >
          <Text variant="body" className="truncate px-1">
            {label}
          </Text>
          <form action={signOutAction} className="mt-3" role="none">
            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Cerrar sesión
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
