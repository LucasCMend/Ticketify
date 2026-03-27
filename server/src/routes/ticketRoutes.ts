import { Router } from "express";
import ticketController from "../controllers/ticketController.js";

const router = Router();

router.post("/", ticketController.create);

router.get("/:id", ticketController.findById);

export default router;
