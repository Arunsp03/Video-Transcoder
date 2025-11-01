import chokidar from "chokidar";
import { startFFMPEGContainer } from "./shell";
import { Video } from "./video";
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
      const video:Video=new Video(path,".avi","1280:720")
      video.startEncoding();
    
    });
    
  } catch (err) {
    console.error(err);
  }
};
