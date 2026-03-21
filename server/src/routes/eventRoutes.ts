import { Router } from "express";
import EventController from "../controllers/eventController.js";

const router = Router();

router.post("/", EventController.create)

router.put("/:id", EventController.update)

router.delete("/:id", EventController.delete)

router.get("/:id", EventController.findById)

router.get("/", EventController.findMany)

export default router;