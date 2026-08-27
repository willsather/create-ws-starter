import Link from "next/link";

import { CopyActions } from "@/app/copy";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-6 py-20 text-neutral-100">
      <Link
        href="https://create.sather.ws"
        className="absolute top-6 left-6 font-mono text-neutral-500 text-xs transition-colors hover:text-white"
      >
        create.sather.ws
      </Link>

      <div className="w-full max-w-2xl text-center">
        <h1 className="font-bold text-4xl text-white tracking-tight sm:text-5xl">
          ws-starter
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-neutral-400 leading-relaxed">
          A small, opinionated starting point for building web apps without
          spending the first hour wiring up the same tools again.
        </p>

        <div className="mt-10">
          <CopyActions />
        </div>

        <footer className="mt-8 font-mono text-neutral-600 text-xs">
          <Link
            href="https://github.com/willsather/create-ws-starter"
            className="transition-colors hover:text-white"
          >
            github →
          </Link>
        </footer>
      </div>
    </main>
  );
}
