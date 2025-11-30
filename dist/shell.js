"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFFMPEGContainer = void 0;
const node_child_process_1 = require("node:child_process");
const fileservice_1 = require("./fileservice");
const startFFMPEGContainer = (video) => {
    return new Promise((resolve, reject) => {
        var _a, _b;
        try {
            video.SourcePath = video.SourcePath.replace("\\", "/");
            const sourceFolder = (_a = process.env.SOURCE_FOLDER) !== null && _a !== void 0 ? _a : "";
            const destinationFolder = (_b = process.env.DESTINATION_FOLDER) !== null && _b !== void 0 ? _b : "";
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
            const destinationPathParams = video.SourcePath.replace(sourceFolder, destinationFolder).split(".");
            const destinationPath = destinationPathParams[0];
            console.log("destination extension type  : ", video.DestinationExtensionType);
            (0, node_child_process_1.exec)(`docker run --rm -v "${process.cwd()}:/data" jrottenberg/ffmpeg ` +
                `-i "/data/${video.SourcePath}" ` +
                `-vf "scale=${video.Resolution}:flags=lanczos" ` +
                `-c:v libx264 -preset medium -crf 23 ` +
                `-c:a aac ` +
                `"/data/${destinationPath}${video.DestinationExtensionType}"`, (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                    return;
                }
                //Remove the file from source directory
                yield (0, fileservice_1.deleteFile)(`./${video.SourcePath}`);
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolve();
            }));
        }
        catch (err) {
            console.error(err);
            reject(err);
        }
    });
};
exports.startFFMPEGContainer = startFFMPEGContainer;
