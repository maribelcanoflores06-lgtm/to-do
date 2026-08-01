import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight">To-dos diarios</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Inicia sesión con GitHub para ver y gestionar tus to-dos.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Continuar con GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
