const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { createToken } = require("../configuration/createToken");

//Register
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

//Login
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: await createToken(user._id),
    });
    console.log(createToken("Token is : ", user._id));
  } else {
    res.status(401);
    throw new Error("Invalid email or password !");
  }
});

//Get all users other than currently logged in user
const getUser = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authUser, getUser };
