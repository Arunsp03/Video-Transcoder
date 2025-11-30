import { spawn } from "child_process";
import { startFileWatcher } from "./fileservice";
import { configDotenv } from "dotenv";
configDotenv();
const startServer = async () => {
  try {
    await startFileWatcher();
      const workerProcess = spawn('node', ['./dist/worker.js'], { 
      stdio: 'inherit',
      
    });
    
    workerProcess.on('close', (code) => {
      console.log(`Worker exited with code ${code}`);
      process.exit(code);
    });
  } catch (err) {
    console.error(err);
  }
};
startServer();
