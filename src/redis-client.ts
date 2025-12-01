import {Redis} from "ioredis"
const redisClientPort=process.env.REDIS_CLIENT_PORT?Number(process.env.REDIS_CLIENT_PORT):6379
const redisClientURL=process.env.REDIS_CLIENT_URL?process.env.REDIS_CLIENT_URL:"127.0.0.1"
const redisConfig = {
  port:redisClientPort,
  host: redisClientURL,
  maxRetriesPerRequest: null,
};

export const redisClient = new Redis(redisConfig);
