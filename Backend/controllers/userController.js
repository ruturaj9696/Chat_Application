const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { createToken } = require("../configuration/createToken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already exists with this email !");
  }

  //create-mongo method to create the user in the db
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: createToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user !");
  }
});

// const authUser = expressAsyncHandler(async () => {});

module.exports = { registerUser };
