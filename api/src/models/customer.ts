import { model, Schema, Document } from "mongoose";
import { compare, hash } from "bcrypt";

export interface ICustomer extends Document {
  name: string;
  password: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

const Customer: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Customer.pre<ICustomer>("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 12);
  }
});

Customer.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
};

Customer.set("toJSON", {
  transform: (doc, { password, __v, ...rest }, options) => rest,
});

export default model<ICustomer>("Customer", Customer);
