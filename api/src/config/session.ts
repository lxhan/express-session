import { SessionOptions } from "express-session";
import { PROD } from "./app";

export const {
  SESSION_SECRET = "secret",
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = 1000 * 60 * 60 * 24,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: SESSION_IDLE_TIMEOUT as number,
    secure: PROD,
    sameSite: false,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
