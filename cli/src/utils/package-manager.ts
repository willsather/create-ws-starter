export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const isPackageManager = (value: string): value is PackageManager =>
  PACKAGE_MANAGERS.some((pm) => pm === value);

// resolves the package manager, preferring an explicit override (e.g. `--pm`)
// before falling back to the user agent of the process that ran the cli
export const getPackageManager = (override?: string): PackageManager => {
  if (override && isPackageManager(override)) {
    return override;
  }

  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    }

    if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    }

    if (userAgent.startsWith("bun")) {
      return "bun";
    }
    return "npm";
  }

  // assume npm
  return "npm";
};
