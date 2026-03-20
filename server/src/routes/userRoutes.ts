// src/routes/userRoutes.ts
import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();

// Create a new User
router.post("/", UserController.create)

// Update an User
router.put("/:id", UserController.update)

// Delete an User
router.delete("/:id", UserController.delete)

// Find a User by his email
router.post("/login", UserController.findByEmail)

// Find a specific User
router.get("/:id", UserController.findById)

// Find a specific User tickets
router.get("/:id/tickets", UserController.findUserTickets)

export default router;