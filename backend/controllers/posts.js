const mongoose = require("mongoose");

const Post = require("../models/Post");

async function createPost(req, res) {
  const { content, sharedById } = req.body;
  const ObjectId = mongoose.Types.ObjectId;

  if (
    content === undefined ||
    !ObjectId.isValid(sharedById) 
  ) {
    return res.status(400).json({
      message: "Invalid parameters ", 
    });
  }
  let newPost;
  try {
    newPost = await Post.create({
      content: content,
      sharedBy: new ObjectId(sharedById),
      likedBy: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  } 

  res.status(201).json({ 
    post: newPost, 
    result: true 
  }); 
}

exports.createPost = createPost;
