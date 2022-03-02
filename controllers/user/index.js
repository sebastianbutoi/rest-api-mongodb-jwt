import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";

export const registerUser = async (req, res) => {
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
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
