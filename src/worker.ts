import { Worker } from "bullmq";
import { redisClient } from "./redis-client";
import { Video } from "./video";
import { configDotenv } from "dotenv";
configDotenv();
const worker = new Worker(
  "video-encoding-queue",
  async (job) => {
    try {
      const filePath: string = job.data.filePath;
      const video: Video = new Video(filePath);
      await video.startEncoding();
      console.log(`Successfully transcoded the file ${filePath}`);
      return null;
    } catch (err) {
      console.error(err);
    }
  },
  { connection: redisClient }
);

worker.on("ready",()=>{
  console.log("Worker is ready.");
  
})
process.on("SIGTERM", async () => {
 
  await worker.close();
  process.exit(0);
});
process.on("SIGINT", async () => {

  await worker.close();
  process.exit(0);
});
