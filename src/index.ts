import { startFileWatcher } from "./fileservice";
import { configDotenv } from "dotenv";
configDotenv();
const startServer = () => {
  try {
    startFileWatcher();
  } catch (err) {
    console.error(err);
  }
};
startServer();
