import multer from "multer";
import {promises as fs} from 'fs';
import config from "./config";
import {randomUUID} from "crypto";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: async (_req, file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, {recursive: true});
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, 'images/' + randomUUID() + extension);
  }
});
export const imagesUpload = multer({storage: imageStorage});
