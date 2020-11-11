import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { register, login, customer, product, order } from "./routes";
import {
  REDIS_OPTIONS,
  SESSION_OPTIONS,
  API_PORT,
  MONGO_OPTIONS,
  MONGO_URI,
} from "./config";
import { internalServerError, notFoundError } from "./middleware/error-handler";

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const RedisStore = connectRedis(session);
  const client = new Redis(REDIS_OPTIONS);

  const app = express();
  app.use(session({ ...SESSION_OPTIONS, store: new RedisStore({ client }) }));
  app.use(express.json());
  app.use([register, login, customer, product, order]);
  app.use(notFoundError);
  app.use(internalServerError);

  app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`));
})();
