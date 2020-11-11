import { Request, Response } from "express";
import Customer from "../models/customer";
import { loginSchema, registerSchema, validate } from "../auth/validation";
import { logIn, isLoggedIn, logOut } from "../auth";
import { BadRequest, Unauthorized } from "../errors";

const register = async (req: Request, res: Response): Promise<void> => {
  await validate(registerSchema, req.body);

  const { name, password } = req.body;
  const duplicate = await Customer.exists({ name });

  if (duplicate) {
    res.status(409).json({
      message: "Name already exists",
    });
    throw new BadRequest("Name already exists");
  }

  const customer = await Customer.create({ name, password });

  if (customer) {
    logIn(req, customer.id);
  }

  res.status(201).json({
    message: "Registered",
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  await validate(loginSchema, req.body);

  const { name, password } = req.body;
  const customer = await Customer.findOne({ name });

  if (!customer || !(await customer.matchesPassword(password))) {
    throw new Unauthorized("Incorrect name or password");
  }

  logIn(req, customer.id);
  res.status(200).json({ isLoggedIn: true });
};

const logout = async (req: Request, res: Response): Promise<void> => {
  await logOut(req, res);
  res.status(200).json({ isLoggedIn: false });
};

export { register, login, logout };
