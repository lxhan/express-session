import { Request, Response } from "express";
import Customer, { ICustomer } from "../models/customer";
import { BadRequest } from "../errors";

const getCustomers = async (req: Request, res: Response): Promise<void> => {
  const customers: ICustomer[] = await Customer.find({});
  if (!customers.length) {
    throw new BadRequest("Could not fetch customers");
  }
  res.status(200).json(customers);
};

const getSingleCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const customer: ICustomer | null = await Customer.findById(req.params.id);

  res.status(200).json(customer);
};

export { getCustomers, getSingleCustomer };
