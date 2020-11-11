import { Router } from "express";
import { getCustomers, getSingleCustomer } from "../controllers/customer";
import { catchAsync } from "../middleware";

const router: Router = Router();

router.get("/api/customers", catchAsync(getCustomers));

router.get("/api/customers/:id", catchAsync(getSingleCustomer));

export default router;
