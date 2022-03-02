import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import asyncHandler from "express-async-handler";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the fields are not empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // If the user doesn't exists, create a new one
  // Generate a salt (random string) and hash the plain text password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Error: can't create user.");
  }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the fields are missing
  if (!email || !password) {
    res.status(400);
    throw new Error("Please insert all the fields.");
  }

  // Find the user
  const user = await User.findOne({ email });
  // Check if the user exists and his credentials
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found or invalid credentials.");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findOne(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
