import { execa } from "execa";
import fs from "fs-extra";

export async function cloneRepository(repoUrl: string, destination: string) {
  try {
    // clone only 1 commit of history
    await execa("git", [
      "clone",
      "--depth",
      "1",
      "--single-branch",
      repoUrl,
      destination,
    ]);

    // remove .git/github directory
    await fs.remove(`${destination}/.git`);
    await fs.remove(`${destination}/.github/dependabot.yml`);

    return "Cloned repository successfully";
  } catch (error) {
    throw new Error(
      `Failed to clone repository: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function initializeGit(projectDir: string) {
  try {
    await execa("git", ["init"], { cwd: projectDir });
    return "Initialized Git";
  } catch {
    return "Failed to initialize Git. Please initialize manually";
  }
}
