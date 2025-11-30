import { Worker } from "bullmq";
import { redisClient } from "./redis-client";
import { Video } from "./video";
import readline from "node:readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser=():Promise<{ fileType: string; resolution: string }>=>{
  return new Promise((resolve,reject)=>{
    try{
      rl.question(`What is the destination file type?`, async (fileType) => {
        rl.question(`What is the destination file resolution?`, async (resolution)=>{
         
          return resolve({fileType:`.${fileType}`,resolution:resolution})
        });
      })
    }
    catch(err)
    {
      
      console.error(err);
      reject(err);
    }
  })

}

const worker = new Worker(
  "video-encoding-queue",
  async (job) => {
    try{
    const filePath: string = job.data.filePath;
    let {fileType,resolution}=await promptUser();
    const video: Video = new Video(filePath, fileType, resolution);
    await video.startEncoding();
    return null;
    }
    catch(err)
    {
      console.error(err);
    }

  },
  { connection: redisClient }
);
process.on('SIGTERM', async () => {
  rl.close(); 
  await worker.close();
  process.exit(0);
});