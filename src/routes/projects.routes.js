import { Router } from "express";

import ctrlProjects from "../controllers/projects.controller.js";

const router = Router();

router.get("/", ctrlProjects.getProjects);
router.post("/", ctrlProjects.createProject);
router.get("/:id", ctrlProjects.getProject);
router.get("/:id/tasks", ctrlProjects.getProjectTasks);
router.put("/:id", ctrlProjects.updateProject);
router.delete("/:id", ctrlProjects.deleteProject);

export default router;
