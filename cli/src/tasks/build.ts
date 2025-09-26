import { execa } from "execa";

import { getPackageManager } from "../utils/package-manager";

export const buildProject = async (projectDir: string) => {
  const pkgManager = getPackageManager();

  try {
    await execa(pkgManager, ["run", "build"], { cwd: projectDir });
    return "Built project";
  } catch {
    return "Failed to build project. Please build manually";
  }
};
