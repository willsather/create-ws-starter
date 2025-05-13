import { TITLE_TEXT } from "../constants";
import { getPackageManager } from "./package-manager";

export const printTitle = () => {
  // resolves behavior where the ascii is offset
  const pkgManager = getPackageManager();
  if (pkgManager === "pnpm") {
    console.log("");
  }
  console.log(TITLE_TEXT);
};
