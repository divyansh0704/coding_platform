import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // language: {
    //   type: String,
    //   default: "javascript",
    // },
    // code: {
    //   type: String,
    //   default: "// Start coding here...",
    // },
    currentFile: {
      type: String,
      default: 'index.js',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    files: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['file', 'folder'],
          default: 'file',
        },
        content: {
          type: String,
          default: "",
        },
        parent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'File',
          default: null,
        },
      },
    ],
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
