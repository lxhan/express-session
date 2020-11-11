export const { NODE_ENV = "dev", API_PORT = 5000 } = process.env;

export const PROD = NODE_ENV === "prod";
