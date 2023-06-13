const { Router } = require("express");
const controllers = require("../controllers/posts"); 
const postsRouter= Router(); 

postsRouter.post("/", controllers.createPost); 
module.exports = postsRouter; 