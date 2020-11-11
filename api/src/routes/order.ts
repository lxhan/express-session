import { Router } from "express";
import { getOrders, getSingleOrder, addOrder } from "../controllers/order";
import { auth, catchAsync } from "../middleware";

const router: Router = Router();

router.get("/api/orders", auth, catchAsync(getOrders));
router.get("/api/orders/:id", auth, catchAsync(getSingleOrder));
router.post("/api/orders", auth, catchAsync(addOrder));

export default router;
