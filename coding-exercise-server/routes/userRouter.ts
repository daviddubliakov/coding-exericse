import { Router } from "express";

import userController from "../controllers/user";
import { registerValidationAndLoginValidation } from "../helpers/validators";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/registration",
  registerValidationAndLoginValidation,
  userController.registration
);
router.post(
  "/login",
  registerValidationAndLoginValidation,
  userController.login
);
router.get("/check", authMiddleware, userController.check);

export default router;
