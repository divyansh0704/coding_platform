import express from "express"
import { createProject,deleteProject,addCollaborator,updateProject,getUserProjects } from "../controllers/projectController.js"

const router = express.Router();

router.post("/create",createProject);
router.delete("/:projectId",deleteProject);
router.post("/:projectId/add-collaborator",addCollaborator);
router.put("/:projectId",updateProject);
router.get("/user/:userId",getUserProjects);

export default router;