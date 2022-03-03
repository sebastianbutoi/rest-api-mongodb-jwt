import express from "express";
import {
  deleteNote,
  getNotes,
  setNote,
  updateNote,
} from "../../controllers/note";

const router = express.Router();

router.route("/").get(getNotes).post(setNote);
router.route("/:id").put(updateNote).delete(deleteNote);

export default router;
