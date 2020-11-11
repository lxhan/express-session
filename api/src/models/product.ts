import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
}

const Product: Schema = new Schema(
  {
    name: String,
    description: String,
    image: String,
    price: Number,
  },
  {
    timestamps: true,
  },
);

Product.set("toJSON", {
  transform: (doc, { __v, ...rest }, options) => rest,
});

export default model<IProduct>("Product", Product);
