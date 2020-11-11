import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import { BadRequest } from "../errors";

const getOrders = async (req: Request, res: Response): Promise<void> => {
  const orders: IOrder[] = await Order.find({});
  if (!orders.length) {
    throw new BadRequest("Could not fetch orders");
  }
  res.status(200).json(orders);
};

const getSingleOrder = async (req: Request, res: Response): Promise<void> => {
  const order: IOrder | null = await Order.findById(req.params.id);

  res.status(200).json(order);
};

const addOrder = async (req: Request, res: Response): Promise<void> => {
  const { userId, productIds, fee, subtotal, total } = req.body;

  if (!userId || !productIds.length) {
    throw new BadRequest("User ID and product IDs are required");
  }

  const order = await Order.create({
    userId,
    productIds,
    fee,
    subtotal,
    total,
  });

  if (!order) {
    throw new BadRequest("Could not add product");
  }

  res.status(201).json({
    message: "Product added",
  });
};

export { getOrders, getSingleOrder, addOrder };
