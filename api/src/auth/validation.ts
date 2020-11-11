import Joi, { ObjectSchema } from "@hapi/joi";
import { BadRequest } from "../errors";

const name = Joi.string().min(2).max(254).lowercase().trim().required();
const password = Joi.string()
  .min(8)
  .max(72, "utf8")
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    "{#label} must contain at least one uppercase letter, one lowercase letter, one digit.",
  )
  .required();

export const registerSchema = Joi.object({
  name,
  password,
  passwordConfirmation: Joi.valid(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object({
  name,
  password,
});

export const validate = async (
  schema: ObjectSchema,
  payload: unknown,
): Promise<void> => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (e) {
    throw new BadRequest(e);
  }
};
