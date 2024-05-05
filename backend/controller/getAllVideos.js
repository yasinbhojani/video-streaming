import fs, { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAllVideos = async (req, res, next) => {
  let folders = getFolders(path.join(__dirname, "../uploads/courses"));
  res.send({ folders: folders });
};

const getFolders = (folderPath) => {
  const files = readdirSync(folderPath, { withFileTypes: true });
  const folders = files
    .filter((file) => file.isDirectory())
    .map((dir) => dir.name);
  return folders;
};
