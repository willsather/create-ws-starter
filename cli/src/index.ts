import path from "node:path";
import fs from "fs-extra";
import type { PackageJson } from "type-fest";

import { runCli } from "./cli";
import { createProject } from "./create";
import { logger } from "./utils/logger";
import { parseNameAndPath } from "./utils/name-path";
import { printTitle } from "./utils/title";
import { installDependencies } from "./utils/install";

const main = async () => {
  printTitle();

  const { appName, useTurborepo } = await runCli();

  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    useTurborepo,
  });

  // write name to package.json
  const pkgJsonPath = path.join(projectDir, "package.json");
  const pkgJson = fs.readJSONSync(pkgJsonPath) as PackageJson;
  pkgJson.name = scopedAppName;

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  // Install dependencies
  await installDependencies(projectDir);

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:",
    );
    console.log(err);
  }
  process.exit(1);
});
