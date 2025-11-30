import { exec } from "node:child_process";
import { Video } from "./video";
import { deleteFile } from "./fileservice";

export const startFFMPEGContainer = (video: Video): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      video.SourcePath = video.SourcePath.replace("\\", "/");
      const sourceFolder = process.env.SOURCE_FOLDER ?? "";
      const destinationFolder = process.env.DESTINATION_FOLDER ?? "";
      if (!sourceFolder || sourceFolder.trim().length == 0) {
        console.error("SOURCE_FOLDER environment variable not set");
        reject(new Error("SOURCE_FOLDER environment variable not set."));
        return;
      }
      if (!destinationFolder || destinationFolder.trim().length == 0) {
        console.error("DESTINATION_FOLDER environment variable not set");
        reject(new Error("DESTINATION_FOLDER environment variable not set"));
        return;
      }

      const destinationPathParams: string[] = video.SourcePath.replace(
        sourceFolder,
        destinationFolder
      ).split(".");
      const destinationPath: string = destinationPathParams[0];
      console.log(
        "destination extension type  : ",
        video.DestinationExtensionType
      );

      exec(
        `docker run --rm -v "${process.cwd()}:/data" jrottenberg/ffmpeg ` +
          `-i "/data/${video.SourcePath}" ` +
          `-vf "scale=${video.Resolution}:flags=lanczos" ` +
          `-c:v libx264 -preset medium -crf 23 ` +
          `-c:a aac ` +
          `"/data/${destinationPath}${video.DestinationExtensionType}"`,
        async (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
            return;
          }
          //Remove the file from source directory
          await deleteFile(`./${video.SourcePath}`);

          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          resolve();
        }
      );
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
