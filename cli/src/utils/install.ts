import { spinner } from "@clack/prompts";
import { execa } from "execa";

import { logger } from "./logger";
import { getPackageManager } from "./package-manager";

export const installDependencies = async (projectDir: string) => {
  const pkgManager = getPackageManager();

  const s = spinner();

  s.start("Installing dependencies...");
  try {
    await execa(pkgManager, ["install"], { cwd: projectDir });
    s.stop("Dependencies installed successfully!");
  } catch (error) {
    s.stop("Failed to install dependencies. Please install them manually.");
    logger.error("Error installing dependencies:", error);
  }
};
