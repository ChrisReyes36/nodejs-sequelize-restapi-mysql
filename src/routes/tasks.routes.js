import { Router } from "express";

import ctrlTasks from "../controllers/taks.controller.js";

const router = Router();

router.get("/", ctrlTasks.getTasks);
router.post("/", ctrlTasks.createTask);
router.get("/:id", ctrlTasks.getTask);
router.put("/:id", ctrlTasks.updateTask);
router.delete("/:id", ctrlTasks.deleteTask);

export default router;
