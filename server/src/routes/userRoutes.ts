import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();

router.post("/", UserController.create)

router.put("/:id", UserController.update)

router.delete("/:id", UserController.delete)

router.post("/login", UserController.findByEmail)

router.get("/:id", UserController.findById)

router.get("/:id/tickets", UserController.findUserTickets)

export default router;