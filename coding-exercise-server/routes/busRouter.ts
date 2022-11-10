import { Router } from "express";

import busController from "../controllers/bus";
import authMiddleware from "../middleware/authMiddleware";

import { createBusValidation } from "../helpers/validators";

const router = Router();

router.get("/", busController.getAll);
router.get("/:id", busController.getById);
router.post("/", authMiddleware, createBusValidation, busController.create);

export default router;
