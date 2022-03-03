import express from "express";
import { getUser, loginUser, registerUser } from "../../controllers/user";
import { checkToken } from "../../middleware/auth";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", checkToken, getUser);

export default router;
