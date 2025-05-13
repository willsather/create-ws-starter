import { execa } from "execa";

import { getPackageManager } from "./package-manager";

export const installDependencies = async (projectDir: string) => {
  const pkgManager = getPackageManager();

  try {
    await execa(pkgManager, ["install"], { cwd: projectDir });
    return "Dependencies installed successfully";
  } catch (error) {
    return "Failed to install dependencies. Please install them manually";
  }
};
