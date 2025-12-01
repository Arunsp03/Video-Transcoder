"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
const redisClientPort = process.env.REDIS_CLIENT_PORT ? Number(process.env.REDIS_CLIENT_PORT) : 6379;
const redisClientURL = process.env.REDIS_CLIENT_URL ? process.env.REDIS_CLIENT_URL : "127.0.0.1";
const redisConfig = {
    port: redisClientPort,
    host: redisClientURL,
    maxRetriesPerRequest: null,
};
exports.redisClient = new ioredis_1.Redis(redisConfig);
