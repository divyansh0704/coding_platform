import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

export const createProject = async (req, res) => {
    try {
        const { name, language, code, owner } = req.body;
        const project = await Project.create({
            name,
            language,
            code,
            owner,
        });
        res.status(201).json({
            success: true,
            message: "project created successfully",
            project,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await Project.find({
            $or: [{ owner: userId }, { collaborators: userId }],
        }).populate("owner collaborators", "username email");

        res.status(200).json({ success: true, projects })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addCollaborator = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { collaboratorId } = req.body;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "project not found" })
        }

        if (project.collaborators.includes(collaboratorId)) {
            return res.status(400).json({ message: "User already a collaborator" });
        }

        project.collaborators.push(collaboratorId);
        await project.save();
        res.status(200).json({ success: true, message: "Collaborator added", project });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, language, code } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(projectId, { name, code, language }, { new: true });
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject,
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProject = async(req,res)=>{
    try{
        const {projectId} = req.params
        const deleted = await Project.findByIdAndDelete(projectId);
        if(!deleted){
            return res.status(404).json({success:false,message:"project not found"})
        }

        res.status(200).json({
            success:true,
            message:"project deleted successfully"
        })

    }catch(error){
        res.status(500).json({message:error.message})
    }
}