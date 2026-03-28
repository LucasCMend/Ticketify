import { Router } from "express";
import UserController from "../controllers/userController.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", UserController.create)

router.post("/login", UserController.login)

router.post("/logout", checkAuth, UserController.logout)

router.get("/me", checkAuth, UserController.findMe)

router.put("/:id", checkAuth, UserController.update)

router.delete("/:id", checkAuth, UserController.delete)

router.get("/:id", checkAuth, UserController.findById)

router.get("/:id/tickets", checkAuth, UserController.findUserTickets)



export default router;