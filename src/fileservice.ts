import chokidar from "chokidar";
import { startFFMPEGContainer } from "./shell";
export const startFileWatcher = () => {
  try {
    const sourceFolderPath=process.env.SOURCE_FOLDER_PATH??""
    if(!sourceFolderPath || sourceFolderPath.trim().length==0)
    {
      console.error("SOURCE_FOLDER_PATH environment variable not set");
      return;
    }
    const watcher = chokidar.watch(sourceFolderPath);
    watcher.on("add", (path: string) => {
      console.log(`File has been added ${path}`);
      startFFMPEGContainer(path);
    });
    
  } catch (err) {
    console.error(err);
  }
};
