import jwt from "jsonwebtoken";
import User from "../../models/user";
import asyncHandler from "express-async-handler";

export const checkToken = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
