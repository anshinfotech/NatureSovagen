const User = require('../models/user.model')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });

const cookieOptions = {
  httpOnly: true,
  maxAge: 5 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
};

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser._id);
  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    data: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    message: "User Successfuly created",
    success: true,
  });
});

const login = asyncHandler(async (req, res, next) => {
  console.log(req.boy)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  res.redirect('/api/dashboard')
});

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully", success:true });
};



module.exports = { signup, login,logout };
