import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import { BadRequest } from "../errors";

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products: IProduct[] = await Product.find({});
  if (!products.length) {
    throw new BadRequest("Could not fetch products");
  }
  res.status(200).json(products);
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  const product: IProduct | null = await Product.findById(req.params.id);

  res.status(200).json(product);
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, image, price } = req.body;

  const product = await Product.create({ name, description, image, price });

  if (!product) {
    throw new BadRequest("Could not add product");
  }

  res.status(201).json({
    message: "Product added",
  });
};

export { getProducts, getSingleProduct, addProduct };
