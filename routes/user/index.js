import express from "express";
import { getUser, loginUser, registerUser } from "../../controllers/user";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getUser);

export default router;
