import { Router } from "express";
import { register } from "../controllers/auth";
import { guest, catchAsync } from "../middleware";

const router: Router = Router();

router.post("/api/register", guest, catchAsync(register));

export default router;
