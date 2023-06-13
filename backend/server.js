require("dotenv").config(); 
const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors"); 
const bcrypt = require("bcrypt"); 

mongoose.connect(process.env.DATABASE_URL); 

const app = express(); 

app.use(express.json()); 
app.use(cors()); 

const usersRouter= require("./routes/users"); 
app.use("/api/users", usersRouter); 

const postsRouter= require("./routes/posts"); 
app.use("/api/posts", postsRouter); 

app.listen(3000, () => console.log("started")); 
