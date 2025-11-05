import express from "express"
import protect from "../middleware/authMiddleware.js";
import { createProject,deleteProject,addCollaborator,updateProject,getUserProjects,createFile,updateFile,deleteFile,setCurrentFile,getProjectById } from "../controllers/projectController.js"

const router = express.Router();

router.post("/create",protect,createProject);
router.delete("/:projectId",protect,deleteProject);
router.post("/:projectId/add-collaborator",protect,addCollaborator);
router.put("/:projectId",protect,updateProject);
router.get("/user/:userId",protect,getUserProjects);

router.post("/:projectId/files", protect, createFile);
router.put("/:projectId/files/:fileId", protect, updateFile);
router.delete("/:projectId/files/:fileId", protect, deleteFile);
router.put("/:projectId/current-file", protect, setCurrentFile);
router.get("/:projectId", protect, getProjectById);

export default router;