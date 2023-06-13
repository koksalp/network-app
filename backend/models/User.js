const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  { 
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    username: { type: String, required: true },
    password: { type: String, required: true },
    follows: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    strictQuery: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
