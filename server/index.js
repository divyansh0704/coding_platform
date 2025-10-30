import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Project from "./models/projectModel.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


connectDB();

app.use("/api/users",userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Coding Collaboration Backend is Running...");
});

app.listen(PORT, () => {
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