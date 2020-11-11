import { Router } from "express";
import {
  getProducts,
  getSingleProduct,
  addProduct,
} from "../controllers/product";
import { auth, catchAsync } from "../middleware";

const router: Router = Router();

router.get("/api/products", auth, catchAsync(getProducts));
router.get("/api/products/:id", auth, catchAsync(getSingleProduct));
router.post("/api/products", auth, catchAsync(addProduct));

export default router;
