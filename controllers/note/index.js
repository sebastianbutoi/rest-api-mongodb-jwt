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
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const newNote = await Note.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    payload: newNote,
  });
});

export const updateNote = asyncHandler(async (req, res) => {
  //
});

export const deleteNote = asyncHandler(async (req, res) => {
  //
});
