import * as p from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

import { CREATE_WS_APP, DEFAULT_APP_NAME } from "./constants";
import { validateAppName } from "./utils/validate";
import { getVersion } from "./utils/version";

interface Results {
  appName: string;
  useTurborepo: boolean;
}

const defaults = {
  appName: DEFAULT_APP_NAME,
  useTurborepo: false,
};

export const runCli = async (): Promise<Results> => {
  const program = new Command()
    .name(CREATE_WS_APP)
    .description("A CLI for creating web applications with the t3 stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .addHelpText(
      "afterAll",
      `\n this ws starter was built by ${chalk.hex("#E8DCFF").underline("https://sather.ws")} \n`,
    )
    .parse(process.argv);

  // user can specify name when running cli
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    defaults.appName = cliProvidedName;
  }

  const project = await p.group(
    {
      ...(!cliProvidedName && {
        name: () =>
          p.text({
            message: "What will your project be called?",
            defaultValue: cliProvidedName,
            validate: validateAppName,
          }),
      }),
      turborepo: () => {
        return p.confirm({
          message: "Would you like to use Turborepo?",
          initialValue: false,
        });
      },
    },
    {
      onCancel() {
        process.exit(1);
      },
    },
  );

  return {
    appName: project.name ?? defaults.appName,
    useTurborepo: project.turborepo ?? defaults.appName,
  };
};
