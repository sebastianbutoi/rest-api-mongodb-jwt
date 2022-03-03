import asyncHandler from "express-async-handler";
import Note from "../../models/note";
import User from "../../models/user";

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
  const id = req.params.id;
  const note = await Note.findById(id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found.");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "success",
    payload: updatedNote,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  //
});
