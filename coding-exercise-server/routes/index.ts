import { Router } from "express";

import userRouter from "./userRouter";
import busRouter from "./busRouter";

const router = Router();

router.use("/user", userRouter);
router.use("/bus", busRouter);

export default router;
