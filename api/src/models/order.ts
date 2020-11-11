import { model, Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  productIds: string[];
  fee: number;
  subtotal: number;
  total: number;
}

const Order: Schema = new Schema(
  {
    userId: String,
    productIds: [String],
    fee: Number,
    subtotal: Number,
    total: Number,
  },
  {
    timestamps: true,
  },
);

Order.set("toJSON", {
  transform: (doc, { __v, ...rest }, options) => rest,
});

export default model<IOrder>("Order", Order);
