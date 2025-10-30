import Project from "../models/projectModel";
import User from "../models/userModel";

export const createProject = async(req,res)=>{
    try{
        const{name,language,code,owner}=req.body;
        const project = await Project.create({
            name,
            language,
            code,
            owner,
        });
        res.status(201).json({
            success:true,
            message:"project created successfully",
            project,
        })

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// export const getUserProjects = async(req,res)=>{
//     try{
//         const {userId}

//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// }