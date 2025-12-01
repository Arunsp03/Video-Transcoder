import { spawn } from "child_process";
import { startFileWatcher } from "./fileservice";
import { configDotenv } from "dotenv";
configDotenv();
const startServer = async () => {
  try {
    await startFileWatcher();
  } catch (err) {
    console.error(err);
  }
};
startServer();
