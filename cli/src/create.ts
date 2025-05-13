import path from "node:path";
import * as p from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";

import { PKG_ROOT } from "./constants";

export interface CreateProjectOptions {
  projectName: string;
  useTurborepo: boolean;
}

export const createProject = async ({
  projectName,
  useTurborepo,
}: CreateProjectOptions) => {
  const projectDir = path.resolve(process.cwd(), projectName);

  const s = p.spinner();

  s.start(`Scaffolding ${projectDir}...\n`);

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      if (projectName !== ".")
        s.message(
          `${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`,
        );
    } else {
      s.stop(
        `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(projectName)} already exists and isn't empty.`,
      );
      const overwriteDir = await p.select({
        message: "How would you like to proceed?",
        options: [
          {
            label: "Abort",
            hint: "recommended",
            value: "abort",
          },
          {
            label: "Clear the directory and continue",
            value: "clear",
          },
          {
            label: "Continue and overwrite files",
            value: "overwrite",
          },
        ],
        initialValue: "abort",
      });

      if (p.isCancel(overwriteDir) || overwriteDir === "abort") {
        s.stop("Aborting installation...");
        process.exit(1);
      }

      const confirmOverwriteDir = await p.confirm({
        message: `Are you sure you want to ${
          overwriteDir === "clear"
            ? "clear the directory"
            : "overwrite conflicting files"
        }?`,
        initialValue: false,
      });

      if (p.isCancel(confirmOverwriteDir) || !confirmOverwriteDir) {
        s.stop("Aborting installation...");
        process.exit(1);
      }

      if (overwriteDir === "clear") {
        s.message(
          `Emptying ${chalk.cyan.bold(projectName)} and creating ws app...\n`,
        );
        fs.emptyDirSync(projectDir);
      }
    }
  }

  s.start(`Copying files to ${chalk.cyan.bold(projectName)} ...\n`);

  if (useTurborepo) {
    // full turborepo starter
    const srcDir = path.join(PKG_ROOT, "templates/turborepo");
    fs.copySync(srcDir, projectDir);
  } else {
    // just the nextjs starter
    const srcDir = path.join(PKG_ROOT, "templates/nextjs");
    fs.copySync(srcDir, projectDir);
  }

  // to avoid conflicts with `/templates/.gitignore`
  fs.renameSync(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore"),
  );

  const scaffoldedName =
    projectName === "." ? "App" : chalk.cyan.bold(projectName);

  s.stop(`${scaffoldedName} ${chalk.green("Created successfully!")}`);

  return projectDir;
};
