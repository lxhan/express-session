import { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../auth";
import { BadRequest, Unauthorized, AlreadyAuthorized } from "../errors";

export const guest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isLoggedIn(req)) {
    res.status(200).send({ isLoggedIn: true });
    // return next();
    // return next(new AlreadyAuthorized());
  } else {
    next();
  }
};

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized("Must be logged in"));
  }
  next();
};
