import chokidar from "chokidar";
import { Video } from "./video";
import { Queue, Worker } from 'bullmq';
import fs from "fs/promises";
import { redisClient } from "./redis-client";
const videoEncodingQueue = new Queue('video-encoding-queue', {
  connection: redisClient
})



export const startFileWatcher = async() => {
  try {
    const sourceFolderPath = process.env.SOURCE_FOLDER_PATH ?? "";
    if (!sourceFolderPath || sourceFolderPath.trim().length == 0) {
      console.error("SOURCE_FOLDER_PATH environment variable not set");
      return;
    }

    const watcher = chokidar.watch(sourceFolderPath);    
    watcher.on("add", async(path: string) => {
      await videoEncodingQueue.add('transcode', {
        filePath:path
      })
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
