import { Router } from "express";
import { login, logout } from "../controllers/auth";
import { guest, auth, catchAsync } from "../middleware";

const router: Router = Router();

router.post("/api/login", guest, catchAsync(login));
router.post("/api/logout", auth, catchAsync(logout));

export default router;
