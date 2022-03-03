import jwt from "jsonwebtoken";
import User from "../../models/user/index.js";
import asyncHandler from "express-async-handler";

export const checkToken = asyncHandler(async (req, res, next) => {
  // Check if the token is not missing
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from the token - do not select the password field
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } else {
    res.status(401);
    throw new Error("Token is missing.");
  }
});
