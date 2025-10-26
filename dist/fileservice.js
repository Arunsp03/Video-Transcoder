"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFileWatcher = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const shell_1 = require("./shell");
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
            console.log(`File has been added ${path}`);
            (0, shell_1.startFFMPEGContainer)(path);
        });
    }
    catch (err) {
        console.error(err);
    }
};
exports.startFileWatcher = startFileWatcher;
