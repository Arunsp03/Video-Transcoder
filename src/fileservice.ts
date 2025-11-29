import chokidar from "chokidar";
import { Video } from "./video";
import fs from "fs/promises";

import readline from "node:readline";
let fileList: string[] = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const processNextFile = () => {
  try {
    if (fileList.length == 0) {
      console.log("File list is empty .");
      return;
    }
    let destinationFileType: string = "";
    let destinationFileResolution: string = "";
    const filePath: string = fileList.shift() ?? "";

    rl.question(`What is the destination file type?`, (fileType) => {
      rl.question(`What is the destination file resolution?`, (resolution) => {
        destinationFileType = `.${fileType}`;
        destinationFileResolution = resolution;

        const video: Video = new Video(
          filePath,
          destinationFileType,
          destinationFileResolution
        );
        video.startEncoding();
        processNextFile();
     
      });
    });
  } catch (err) {
    console.error(err);
  }
};
export const startFileWatcher = () => {
  try {
    const sourceFolderPath = process.env.SOURCE_FOLDER_PATH ?? "";
    if (!sourceFolderPath || sourceFolderPath.trim().length == 0) {
      console.error("SOURCE_FOLDER_PATH environment variable not set");
      return;
    }
    const watcher = chokidar.watch(sourceFolderPath);
    watcher.on("add", (path: string) => {
      fileList.push(path);
      if(fileList.length==1){
      processNextFile();
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteFile = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
};
