import { ConnectionOptions } from "mongoose";

const {
  DB_USER = "docker",
  DB_PASS = "docker",
  DB_HOST = "localhost",
  DB_PORT = 27017,
  DB_NAME = "docker",
} = process.env;

export const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const MONGO_OPTIONS: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
