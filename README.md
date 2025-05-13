# create-ws-app

This CLI tool allows for fast creation of either a Next.js application or a Turborepo which will contain the basic
scaffolding setup with batteries included `tailwind`, `shadcn/ui`, `biome`, and `vitest`.

## Getting Started

To start using, you can use the following commands:

```zsh
pnpm install

pnpm dev

pnpm build

pnpm test
```

This project also has some configured some tools like:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Vitest](https://vitest.dev/) for unit testing
- [Biome](https://biomejs.dev/) for code linting & formatting

## Applications

Located under `/apps`, you will find an application.

- `www`: the website built using [Next.js](https://nextjs.org/)

## Packages

In this example, there is a shared package called `ui` which is basic [`shadcn/ui`](https://ui.shadcn.com/) package.

## Shared Configuration

Located under `/packages/config` is all the shared configuration which the Turborepo uses. This is a great space to put
handy developer tools and code cleanliness configuration.

- `@ws/vitest-config`: `vitest` configurations for `base` and `ui` configurations
- `@ws/typescript-config`: `tsconfig.json`s used throughout the monorepo

## Useful Turborepo Links

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
