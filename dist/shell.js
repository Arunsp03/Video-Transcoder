"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFFMPEGContainer = void 0;
const node_child_process_1 = require("node:child_process");
const startFFMPEGContainer = (sourcePath) => {
    var _a, _b;
    try {
        sourcePath = sourcePath.replace("\\", "/");
        console.log("source :", process.env.SOURCE_FOLDER);
        const sourceFolder = (_a = process.env.SOURCE_FOLDER) !== null && _a !== void 0 ? _a : "";
        const destinationFolder = (_b = process.env.DESTINATION_FOLDER) !== null && _b !== void 0 ? _b : "";
        if (!sourceFolder || sourceFolder.trim().length == 0) {
            console.error("SOURCE_FOLDER environment variable not set");
            return;
        }
        if (!destinationFolder || destinationFolder.trim().length == 0) {
            console.error("DESTINATION_FOLDER environment variable not set");
            return;
        }
        const destinationPathParams = sourcePath
            .replace(sourceFolder, destinationFolder)
            .split(".");
        const destinationPath = destinationPathParams[0];
        (0, node_child_process_1.exec)(`docker run --rm -v "${process.cwd()}:/data" jrottenberg/ffmpeg  -i "/data/${sourcePath}" "/data/${destinationPath}.avi"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
    catch (err) {
        console.error(err);
    }
};
exports.startFFMPEGContainer = startFFMPEGContainer;
