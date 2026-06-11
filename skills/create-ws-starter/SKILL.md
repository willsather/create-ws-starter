---
name: create-ws-starter
description: Scaffold a new Next.js app or Turborepo monorepo with the create-ws-starter CLI. Use when the user wants to bootstrap a new project with batteries-included tooling (Tailwind, shadcn/ui, Biome, Vitest). Always run it non-interactively with flags so it never blocks on a prompt.
---

# create-ws-starter

`create-ws-starter` scaffolds a Next.js app or a Turborepo monorepo preconfigured
with Tailwind CSS, shadcn/ui, Biome, and Vitest. It clones a starter template,
renames the package, installs dependencies, builds, and initializes git.

## Run it non-interactively

The CLI prompts for missing values **only** when attached to an interactive
terminal. When you run it (no TTY) it enters non-interactive mode automatically,
but **always pass `--yes` and the flags you want** so behavior is explicit and
nothing blocks:

```sh
npx create-ws-starter@latest <dir> --yes [flags]
```

Every parameter is a flag — never rely on prompts:

| Flag | Effect | Default |
| --- | --- | --- |
| `<dir>` (positional) | App name + directory to create. Lowercase, `-`/`_` only. `.` = current dir. Scoped (`@scope/app`) supported. | `my-ws-app` |
| `--turborepo` | Scaffold a Turborepo monorepo (requires pnpm) instead of a single Next.js app | Next.js app |
| `--pm <manager>` | Package manager: `npm`, `pnpm`, `yarn`, `bun` | the invoking package manager |
| `--no-install` | Skip installing dependencies | installs |
| `--no-build` | Skip the build step | builds |
| `--no-git` | Skip `git init` | inits git |
| `--overwrite` | Clear the target dir if it exists and is non-empty | aborts |
| `-y, --yes` | Skip all prompts (non-interactive) | inferred when no TTY |

## Examples

Next.js app, full setup:

```sh
npx create-ws-starter@latest my-app --yes
```

Turborepo monorepo with pnpm:

```sh
pnpm create ws-starter my-app --turborepo --yes
```

Fast scaffold without installing or building (e.g. you'll install later):

```sh
npx create-ws-starter@latest my-app --yes --no-install --no-build
```

Scaffold into a non-empty directory:

```sh
npx create-ws-starter@latest my-app --yes --overwrite
```

## Gotchas

- `--turborepo` requires pnpm. Pair it with `--pm pnpm` (or run via `pnpm create`)
  or the CLI exits with an error.
- In non-interactive mode, if the target directory is non-empty and you do **not**
  pass `--overwrite`, the CLI aborts with a non-zero exit code rather than prompting.
- The dir name must match `^(@scope/)?[a-z0-9-_~.]+$` — lowercase only.

## Reference

- llms.txt: https://create.sather.ws/llms.txt
- Repo: https://github.com/willsather/create-ws-starter
