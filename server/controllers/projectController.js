import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

export const createProject = async (req, res) => {
    try {
        const { name, owner } = req.body;
        const project = await Project.create({
            name,

            owner,
            files: [
                {
                    name: 'index.js',
                    type: 'file',
                    content: '// Start coding here...',
                },
            ],
            currentFile: 'index.js',
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
        const { name } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(projectId, { name }, { new: true });
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject,
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const deleted = await Project.findByIdAndDelete(projectId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "project not found" })
        }

        res.status(200).json({
            success: true,
            message: "project deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createFile = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, type, content, parent } = req.body;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        project.files.push({ name, type, content, parent });
        await project.save();
        res.status(201).json({ success: true, message: 'File created', file: project.files[project.files.length - 1] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFile = async (req, res) => {
    try {
        const { projectId, fileId } = req.params;
        const { content, name } = req.body;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        const file = project.files.id(fileId);
        if (!file) return res.status(404).json({ message: 'File not found' });
        if (content !== undefined) file.content = content;
        if (name !== undefined) file.name = name;
        await project.save();
        res.status(200).json({ success: true, message: 'File updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { projectId, fileId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        project.files.pull(fileId);
        await project.save();
        res.status(200).json({ success: true, message: 'File deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setCurrentFile = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { fileName } = req.body;
        const project = await Project.findByIdAndUpdate(projectId, { currentFile: fileName }, { new: true });
        res.status(200).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const executeCode = async (req, res) => {
    const { code } = req.body;
    try {
        let output = '';
        const originalLog = console.log;
        console.log = (...args) => { output += args.join(' ') + '\n'; };
        eval(code);
        console.log = originalLog;
        res.json({ output });
    }catch(error){
        res.json({ error: error.message });
    }
}