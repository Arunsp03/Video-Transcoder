import { exec } from "node:child_process";
export const startFFMPEGContainer = (sourcePath: string) => {
  try {
    sourcePath = sourcePath.replace("\\", "/");
    console.log("source :",process.env.SOURCE_FOLDER)
    const sourceFolder=process.env.SOURCE_FOLDER??"";
    const destinationFolder=process.env.DESTINATION_FOLDER??"";
    if(!sourceFolder ||sourceFolder.trim().length==0)
    {
      console.error("SOURCE_FOLDER environment variable not set");
      return;
    }
    if(!destinationFolder ||destinationFolder.trim().length==0)
    {
      console.error("DESTINATION_FOLDER environment variable not set");
      return;
    }

    const destinationPathParams: string[] = sourcePath
      .replace(sourceFolder,destinationFolder)
      .split(".");
    const destinationPath: string = destinationPathParams[0];
 

    exec(
      `docker run --rm -v "${process.cwd()}:/data" jrottenberg/ffmpeg  -i "/data/${sourcePath}" "/data/${destinationPath}.avi"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      }
    );
  } catch (err) {
    console.error(err);
  }
};
