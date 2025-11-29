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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.startFileWatcher = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const video_1 = require("./video");
const promises_1 = __importDefault(require("fs/promises"));
const node_readline_1 = __importDefault(require("node:readline"));
let fileList = [];
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const processNextFile = () => {
    var _a;
    try {
        if (fileList.length == 0) {
            console.log("File list is empty .");
            return;
        }
        let destinationFileType = "";
        let destinationFileResolution = "";
        const filePath = (_a = fileList.shift()) !== null && _a !== void 0 ? _a : "";
        rl.question(`What is the destination file type?`, (fileType) => {
            rl.question(`What is the destination file resolution?`, (resolution) => {
                destinationFileType = `.${fileType}`;
                destinationFileResolution = resolution;
                const video = new video_1.Video(filePath, destinationFileType, destinationFileResolution);
                video.startEncoding();
                processNextFile();
            });
        });
    }
    catch (err) {
        console.error(err);
    }
};
const startFileWatcher = () => {
    var _a;
    try {
        const sourceFolderPath = (_a = process.env.SOURCE_FOLDER_PATH) !== null && _a !== void 0 ? _a : "";
        if (!sourceFolderPath || sourceFolderPath.trim().length == 0) {
            console.error("SOURCE_FOLDER_PATH environment variable not set");
            return;
        }
        const watcher = chokidar_1.default.watch(sourceFolderPath);
        watcher.on("add", (path) => {
            fileList.push(path);
            if (fileList.length == 1) {
                processNextFile();
            }
        });
    }
    catch (err) {
        console.error(err);
    }
};
exports.startFileWatcher = startFileWatcher;
const deleteFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default.unlink(filePath);
    }
    catch (err) {
        console.error(err);
    }
});
exports.deleteFile = deleteFile;
