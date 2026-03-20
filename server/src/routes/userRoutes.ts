// src/routes/userRoutes.ts
import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

// Create a new User
router.post("/", userController.create)

// Update an User
router.put("/:id", userController.update)

// Find a User by his email
router.post("/login", userController.findByEmail)

// Find a specific User
router.get("/:id", userController.findById)

// Find a specific User tickets
router.get("/:id/tickets", userController.findUserTickets)

export default router;