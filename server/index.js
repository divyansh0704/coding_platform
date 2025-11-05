import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {Server} from "socket.io";
import {createServer} from "http";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Project from "./models/projectModel.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
});

io.on("connection",(socket)=>{
  console.log("user connected:",socket.id);

  socket.on("code-change", (data) => {
    socket.broadcast.emit("code-change", data);
  });

  socket.on("disconnect",()=>{
    console.log("User disconnected:",socket.id);
  })
})

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}));


connectDB();

app.use("/api/users",userRoutes);
app.use("/api/projects",projectRoutes)

app.get("/", (req, res) => {
  res.send("🚀 Coding Collaboration Backend is Running...");
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});







































// app.get("/test", async (req, res) => {
//   try {
//     const user = await User.create({
//       username: "divyansh",
//       email: "divyansh@example.com",
//       password: "123456",
//     });

//     const project = await Project.create({
//       name: "First Project",
//       owner: user._id,
//     });

//     user.projects.push(project._id);
//     await user.save();

//     res.json({ user, project });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });