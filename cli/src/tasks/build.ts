import { execa } from "execa";

import type { PackageManager } from "../utils/package-manager";

export const buildProject = async (
  projectDir: string,
  pkgManager: PackageManager,
) => {
  try {
    await execa(pkgManager, ["run", "build"], { cwd: projectDir });
    return "Built project";
  } catch {
    return "Failed to build project. Please build manually";
  }
};
