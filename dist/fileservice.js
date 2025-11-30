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
const bullmq_1 = require("bullmq");
const promises_1 = __importDefault(require("fs/promises"));
const redis_client_1 = require("./redis-client");
const videoEncodingQueue = new bullmq_1.Queue('video-encoding-queue', {
    connection: redis_client_1.redisClient
});
const startFileWatcher = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const sourceFolderPath = (_a = process.env.SOURCE_FOLDER_PATH) !== null && _a !== void 0 ? _a : "";
        if (!sourceFolderPath || sourceFolderPath.trim().length == 0) {
            console.error("SOURCE_FOLDER_PATH environment variable not set");
            return;
        }
        const watcher = chokidar_1.default.watch(sourceFolderPath);
        watcher.on("add", (path) => __awaiter(void 0, void 0, void 0, function* () {
            yield videoEncodingQueue.add('transcode', {
                filePath: path
            });
        }));
    }
    catch (err) {
        console.error(err);
    }
});
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
