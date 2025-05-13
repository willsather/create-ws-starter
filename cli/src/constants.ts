import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const TITLE_TEXT = `
                     _                                                            
                    | |                                                           
  ___ _ __ ___  __ _| |_ ___   ______  __      _____   ______    __ _ _ __  _ __  
 / __| '__/ _ \\/ _\` | __/ _ \\ |______| \\ \\ /\\ / / __| |______|  / _\` | '_ \\| '_ \\ 
| (__| | |  __/ (_| | ||  __/           \\ V  V /\\__ \\          | (_| | |_) | |_) |
 \\___|_|  \\___|\\__,_|\\__\\___|            \\_/\\_/ |___/           \\__,_| .__/| .__/ 
                                                                     | |   | |    
                                                                     |_|   |_|    
`;
export const DEFAULT_APP_NAME = "my-ws-app";
export const CREATE_WS_APP = "create-ws-app";
