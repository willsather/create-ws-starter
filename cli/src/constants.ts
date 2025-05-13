import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const TITLE_TEXT = `
                             _             _            
                            | |           | |           
__      _____   ______   ___| |_ __ _ _ __| |_ ___ _ __ 
\\ \\ /\\ / / __| |______| / __| __/ _\` | '__| __/ _ \\ '__|
 \\ V  V /\\__ \\          \\__ \\ || (_| | |  | ||  __/ |   
  \\_/\\_/ |___/          |___/\\__\\__,_|_|   \\__\\___|_|   
`;
export const DEFAULT_APP_NAME = "my-ws-app";
export const APP_NAME = "create-ws-starter";
