import { NextFunction, RequestHandler, Request, Response } from "express";

export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
): void => handler(...args).catch(args[2]);

export const internalServerError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!err.status) {
    console.error(err);
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};

export const notFoundError = (
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(404).json({ message: "Not Found" });
};
