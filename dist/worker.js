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
const bullmq_1 = require("bullmq");
const redis_client_1 = require("./redis-client");
const video_1 = require("./video");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const worker = new bullmq_1.Worker("video-encoding-queue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = job.data.filePath;
        const video = new video_1.Video(filePath);
        yield video.startEncoding();
        console.log(`Successfully transcoded the file ${filePath}`);
        return null;
    }
    catch (err) {
        console.error(err);
    }
}), { connection: redis_client_1.redisClient });
worker.on("ready", () => {
    console.log("Worker is ready.");
});
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    yield worker.close();
    process.exit(0);
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield worker.close();
    process.exit(0);
}));
