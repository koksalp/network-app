const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

async function checkIfIfUserExists(username) {
  if (username === undefined) {
    throw new Error("Provide a username");
  }

  try {
    var user = await User.findOne({ username: username });
  } catch (error) {
    throw new Error(error.message);
  }

  if (user === null) {
    return false;
  }

  return true;
} 

async function checkIfEmailExists(email) { 
  if (email === undefined) { 
    throw new Error("Provide an email"); 
  }
  try {
    var user = await User.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message);
  }

  if (user === null) {
    return false;
  }

  return true;
}
async function signUp(req, res) {
  const { username, password , name, email } = req.body;

  if (username === undefined || password === undefined || name === undefined || email === undefined ) {
    return res.status(400).json({
      message: "All credentials should be provided",
      result: false,
    });
  }

  const doesUserExist = await checkIfIfUserExists(username);

  if (doesUserExist) {
    return res.status(400).json({
      message: "Username taken",
      result: false,
    });
  }

  const doesEmailExist = await checkIfEmailExists(email); 

  if (doesEmailExist) {
    return res.status(400).json({
      message: "Email taken", 
      result: false,
    });
  } 

  let salt, hashedPassword;
  try {
    salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
    return res.json(500).json({ message: error.message, result: false });
  }

  let newUser;
  try {
    newUser = await User.create({
      username: username, 
      name: name, 
      email: email, 
      password: hashedPassword,
      follows: [],
      followers: [],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, result: false });
  }
  
  res.status(201).json({
    result: true,
    userId: newUser.id, 
    username: newUser.username, 
    name: newUser.name, 
    email: newUser.email 
  });
}

async function signIn(req, res) {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return res.status(400).json({
      message: "Username and password should be provided.",
      result: false,
    });
  }

  let user;
  try {
    user = await User.findOne({ username: username });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      result: false,
    });
  }

  if (user === null) {
    return res.status(404).json({
      message: "User not found",
      result: false,
    });
  }

  const areCredentialsValid = await bcrypt.compare(password, user.password);

  if (areCredentialsValid) { 
    return res.json({
      result: true, 
      userId: user.id, 
      name: user.name, 
      email: user.email, 
      username: user.username, 
      message: "the user's credentials are valid ",
    });
  }

  res.json({
    result: false,
    message: "the user's credentials are invalid",
  });
}

async function getUserByUsername(req, res) {
  const {username } = req.params; 
  
  if (username === undefined) {
    return res.status(400).json({ message: "A username should be provided "}); 
  } 

  let user; 
  try {
    user = await User.findOne({ username: username }, { password: 0 }); 
  } catch(error) {
    return res.json(500).json({ message: error.message }); 
  } 

  if (user === null) {
    return res.status(404).json({ message: "User not found "}); 
  } 

  res.json({ result: true, user: user }); 
}
exports.signUp = signUp;
exports.signIn = signIn; 
exports.getUserByUsername = getUserByUsername; 
