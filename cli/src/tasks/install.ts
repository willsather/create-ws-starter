import { execa } from "execa";

import type { PackageManager } from "../utils/package-manager";

export const installDependencies = async (
  projectDir: string,
  pkgManager: PackageManager,
) => {
  try {
    await execa(pkgManager, ["install"], { cwd: projectDir });
    return "Installed dependencies";
  } catch {
    return "Failed to install dependencies. Please install them manually";
  }
};
