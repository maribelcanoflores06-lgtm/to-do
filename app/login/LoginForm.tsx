"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

import { Button } from "@/app/components/ui/Button";
import { Text } from "@/app/components/ui/Text";
import { loginAction } from "@/lib/actions/auth";

const inputClass =
  "w-full rounded-[14px] bg-[#E5E5E5] px-4 py-3 text-base text-black outline-none transition placeholder:text-[#B0B0B0] focus:ring-2 focus:ring-black/15";

export function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await loginAction(formData)) ?? null;
    },
    null,
  );

  return (
    <div className="w-full max-w-md rounded-[20px] bg-white p-8">
      <Text variant="display" className="text-center">
        To-dos diarios
      </Text>
      <Text variant="body-muted" className="mt-2 text-center">
        Inicia sesión con tu correo y contraseña.
      </Text>

      {registered ? (
        <p className="mt-4 rounded-[14px] bg-[#F2F2F2] px-3 py-2 text-sm font-medium text-black">
          Cuenta creada. Ya puedes iniciar sesión.
        </p>
      ) : null}

      {state?.error ? (
        <p className="mt-4 rounded-[14px] bg-[#F2F2F2] px-3 py-2 text-sm font-medium text-[#E11D48]">
          {state.error}
        </p>
      ) : null}

      <form action={formAction} className="mt-6 space-y-3">
        <div>
          <label htmlFor="email" className="sr-only">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Correo electrónico"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Contraseña"
            className={inputClass}
          />
        </div>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Entrando…" : "Iniciar sesión"}
        </Button>
      </form>

      <Text variant="body-muted" className="mt-6 text-center">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="font-semibold text-black underline-offset-2 hover:underline"
        >
          Regístrate
        </Link>
      </Text>
    </div>
  );
}
