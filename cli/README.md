# ws-starter

This CLI tool allows for fast creation of either a Next.js application or a Turborepo which will contain the basic
scaffolding setup with batteries included `tailwind`, `shadcn/ui`, `biome`, and `vitest`.

The CLI downloads templates from GitHub repositories:
- **Next.js**: [willsather/nextjs-starter](https://github.com/willsather/nextjs-starter)
- **Turborepo**: [willsather/turborepo-starter](https://github.com/willsather/turborepo-starter)

## Getting Started

   ```shell
   pnpm create ws-starter
   ```

## Non-interactive usage

Every prompt has a corresponding flag, so the CLI can run end-to-end without any
interaction. It enters non-interactive mode automatically when there is no TTY
(agents, CI), or when you pass `-y, --yes`:

```shell
npx create-ws-starter@latest my-app --yes
```

### Options

| Flag | Description | Default |
| --- | --- | --- |
| `[dir]` | App name + directory to create (`.` = current dir, scoped names supported) | `my-ws-app` |
| `--turborepo` | Scaffold a Turborepo monorepo instead of a single Next.js app (requires pnpm) | Next.js app |
| `--pm <manager>` | Package manager: `npm`, `pnpm`, `yarn`, `bun` | invoking package manager |
| `--no-install` | Skip installing dependencies | installs |
| `--no-build` | Skip building the project | builds |
| `--no-git` | Skip initializing a git repository | inits git |
| `--overwrite` | Clear the target directory if it exists and is not empty | aborts |
| `-y, --yes` | Skip all prompts (non-interactive) | inferred when no TTY |
| `-v, --version` | Print the version | |
| `-h, --help` | Print help | |

For agents, see the [llms.txt](https://create.sather.ws/llms.txt).
