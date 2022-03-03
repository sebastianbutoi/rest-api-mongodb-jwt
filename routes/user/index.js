import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../../controllers/user/index.js";
import { checkToken } from "../../middleware/auth/index.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", checkToken, getUser);

export default router;
