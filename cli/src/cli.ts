import * as p from "@clack/prompts";
import { cancel } from "@clack/prompts";
import { Command } from "commander";

import { APP_NAME, DEFAULT_APP_NAME } from "./constants";
import {
  getPackageManager,
  isPackageManager,
  PACKAGE_MANAGERS,
  type PackageManager,
} from "./utils/package-manager";
import { validateAppName } from "./utils/validate";
import { getVersion } from "./utils/version";

export interface Results {
  appName: string;
  useTurborepo: boolean;
  install: boolean;
  git: boolean;
  build: boolean;
  overwrite: boolean;
  packageManager: PackageManager;
  nonInteractive: boolean;
}

export const runCli = async (): Promise<Results> => {
  const program = new Command()
    .name(APP_NAME)
    .description("A CLI for creating Next.js and Turborepo web applications")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .option(
      "--turborepo",
      "Scaffold a Turborepo monorepo instead of a single Next.js app",
    )
    .option("--no-install", "Skip installing dependencies")
    .option("--no-git", "Skip initializing a git repository")
    .option("--no-build", "Skip building the project")
    .option(
      "--overwrite",
      "Overwrite the target directory if it exists and is not empty",
    )
    .option(
      "--pm <manager>",
      `Package manager to use (${PACKAGE_MANAGERS.join(", ")})`,
    )
    .option(
      "-y, --yes",
      "Skip all prompts and use defaults / provided flags (non-interactive)",
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .parse(process.argv);

  const opts = program.opts();
  const cliProvidedName = program.args[0];

  // run without prompts when explicitly requested (`--yes`) or when there is no
  // interactive terminal attached (e.g. an agent or ci is driving the cli)
  const nonInteractive: boolean = opts.yes === true || !process.stdout.isTTY;

  const wasProvided = (flag: string) =>
    program.getOptionValueSource(flag) === "cli";

  if (opts.pm !== undefined && !isPackageManager(opts.pm)) {
    cancel(
      `Invalid package manager \`${opts.pm}\`. Use one of: ${PACKAGE_MANAGERS.join(", ")}`,
    );
    process.exit(1);
  }
  const packageManager = getPackageManager(opts.pm);

  // app name: use the positional arg, otherwise prompt when interactive
  let appName = cliProvidedName ?? DEFAULT_APP_NAME;
  if (!cliProvidedName && !nonInteractive) {
    const name = await p.text({
      message: "What will your project be called?",
      defaultValue: DEFAULT_APP_NAME,
      validate: validateAppName,
    });

    if (p.isCancel(name)) {
      cancel("Aborting installation...");
      process.exit(1);
    }

    appName = name || DEFAULT_APP_NAME;
  }

  // turborepo: use the flag if provided, otherwise prompt when interactive
  let useTurborepo: boolean = opts.turborepo === true;
  if (!wasProvided("turborepo") && !nonInteractive) {
    const turborepo = await p.select({
      message: "Would you like to use Turborepo?",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
      initialValue: false,
    });

    if (p.isCancel(turborepo)) {
      cancel("Aborting installation...");
      process.exit(1);
    }

    useTurborepo = turborepo;
  }

  if (useTurborepo && packageManager !== "pnpm") {
    cancel(
      `You are using \`${packageManager}\`, you must use \`pnpm\` to use Turborepo`,
    );
    process.exit(1);
  }

  return {
    appName,
    useTurborepo,
    // commander sets these to `true` by default and `false` when `--no-*` is passed
    install: opts.install !== false,
    git: opts.git !== false,
    build: opts.build !== false,
    overwrite: opts.overwrite === true,
    packageManager,
    nonInteractive,
  };
};
