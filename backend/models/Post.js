const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true }, 
    sharedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    likedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }], 
    createdAt: { type: Date, default: () => Date.now(), immutable: true } 
  },
  {
    strictQuery: false,
  }
);

const Post = mongoose.model("Post", postSchema); 

module.exports = Post; 