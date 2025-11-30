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
const bullmq_1 = require("bullmq");
const redis_client_1 = require("./redis-client");
const video_1 = require("./video");
const node_readline_1 = __importDefault(require("node:readline"));
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const worker = new bullmq_1.Worker('video-encoding-queue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    let destinationFileType = "";
    let destinationFileResolution = "";
    const filePath = job.data.filePath;
    rl.question(`What is the destination file type?`, (fileType) => __awaiter(void 0, void 0, void 0, function* () {
        rl.question(`What is the destination file resolution?`, (resolution) => __awaiter(void 0, void 0, void 0, function* () {
            destinationFileType = `.${fileType}`;
            destinationFileResolution = resolution;
            const video = new video_1.Video(filePath, destinationFileType, destinationFileResolution);
            yield video.startEncoding();
            console.log("JOB :", job.data);
        }));
    }));
}), { connection: redis_client_1.redisClient });
worker.run();
