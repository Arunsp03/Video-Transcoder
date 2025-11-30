"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
const redisConfig = {
    port: 6379,
    host: '127.0.0.1',
    maxRetriesPerRequest: null,
};
exports.redisClient = new ioredis_1.Redis(redisConfig);
