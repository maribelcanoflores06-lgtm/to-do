import { Suspense } from "react";

import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-full flex-1 items-center justify-center px-5 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,#D6C9FF_0%,transparent_100%)] opacity-70"
      />
      <div className="relative z-10 w-full max-w-md">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
