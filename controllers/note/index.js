import asyncHandler from "express-async-handler";
import Note from "../../models/note";

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    payload: notes,
  });
});

export const setNote = asyncHandler(async (req, res) => {
  //
});

export const updateNote = asyncHandler(async (req, res) => {
  //
});

export const deleteNote = asyncHandler(async (req, res) => {
  //
});
