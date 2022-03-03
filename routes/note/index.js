import express from "express";
import {
  deleteNote,
  getNotes,
  setNote,
  updateNote,
} from "../../controllers/note";
import { checkToken } from "../../middleware/auth";

const router = express.Router();

router.route("/").get(checkToken, getNotes).post(checkToken, setNote);
router.route("/:id").put(checkToken, updateNote).delete(checkToken, deleteNote);

export default router;
