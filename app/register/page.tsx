"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/app/components/ui/Button";
import { Text } from "@/app/components/ui/Text";
import { registerAction } from "@/lib/actions/auth";

const inputClass =
  "w-full rounded-[14px] bg-[#E5E5E5] px-4 py-3 text-base text-black outline-none transition placeholder:text-[#B0B0B0] focus:ring-2 focus:ring-black/15";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await registerAction(formData)) ?? null;
    },
    null,
  );

  return (
    <div className="relative flex min-h-full flex-1 items-center justify-center px-5 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,#D6C9FF_0%,transparent_100%)] opacity-70"
      />
      <div className="relative z-10 w-full max-w-md rounded-[20px] bg-white p-8">
        <Text variant="display" className="text-center">
          Crear cuenta
        </Text>
        <Text variant="body-muted" className="mt-2 text-center">
          Regístrate con correo y contraseña.
        </Text>

        {state?.error ? (
          <p className="mt-4 rounded-[14px] bg-[#F2F2F2] px-3 py-2 text-sm font-medium text-[#E11D48]">
            {state.error}
          </p>
        ) : null}

        <form action={formAction} className="mt-6 space-y-3">
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Correo electrónico"
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Contraseña (mín. 8 caracteres)"
            className={inputClass}
          />
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Confirmar contraseña"
            className={inputClass}
          />
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Creando…" : "Crear cuenta"}
          </Button>
        </form>

        <Text variant="body-muted" className="mt-6 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-black underline-offset-2 hover:underline"
          >
            Inicia sesión
          </Link>
        </Text>
      </div>
    </div>
  );
}
