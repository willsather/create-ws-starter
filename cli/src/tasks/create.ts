import path from "node:path";
import * as p from "@clack/prompts";
import { cancel } from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";

import { GITHUB_REPOS } from "../constants";
import { cloneRepository } from "./git";

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

  s.start("Downloading template from GitHub...");

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
        cancel("Aborting installation...");
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
        cancel("Aborting installation...");
        process.exit(1);
      }

      s.start("Continuing ...");

      if (overwriteDir === "clear") {
        fs.emptyDirSync(projectDir);
      }
    }
  }

  const repoName = useTurborepo ? GITHUB_REPOS.turborepo : GITHUB_REPOS.nextjs;
  const repoUrl = `https://github.com/${repoName}.git`;

  try {
    await cloneRepository(repoUrl, projectDir);
  } catch (error) {
    s.stop(chalk.redBright.bold("Failed to download template"));
    cancel(
      `Failed to clone template from GitHub: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exit(1);
  }

  s.stop("Template downloaded successfully");

  return projectDir;
};
