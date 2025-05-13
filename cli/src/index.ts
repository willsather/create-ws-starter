import path from "node:path";
import { intro, outro } from "@clack/prompts";
import * as p from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import type { PackageJson } from "type-fest";

import { runCli } from "./cli";
import { createProject } from "./create";
import { installDependencies } from "./utils/install";
import { logger } from "./utils/logger";
import { parseNameAndPath } from "./utils/name-path";

const main = async () => {
  console.log(); // blank line

  intro(
    `${chalk.hex("#bbf7d0").underline("create-ws-starter")} is built by ${chalk.hex("#bbf7d0").underline("https://sather.ws")}`,
  );

  const { appName, useTurborepo } = await runCli();

  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    useTurborepo,
  });

  await p.tasks([
    {
      title: "Configuring...",
      task: async () => {
        const pkgJsonPath = path.join(projectDir, "package.json");
        const pkgJson = fs.readJSONSync(pkgJsonPath) as PackageJson;
        pkgJson.name = scopedAppName;

        fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
          spaces: 2,
        });

        return "Configured successfully";
      },
    },
    {
      title: "Installing dependencies",
      task: async () => {
        return await installDependencies(projectDir);
      },
    },
  ]);

  outro(`${chalk.hex("#bbf7d0")("now go and ship")}`);

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
