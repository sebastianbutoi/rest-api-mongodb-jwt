import asyncHandler from "express-async-handler";
import Note from "../../models/note/index.js";
import User from "../../models/user/index.js";

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    payload: notes,
  });
});

// @desc    Set note
// @route   POST /api/notes
// @access  Private
export const setNote = asyncHandler(async (req, res) => {
  // Check if the text field is missing
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  // Create a new note
  const newNote = await Note.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    payload: newNote,
  });
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // Search the note
  const note = await Note.findById(id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found.");
  }

  // Check the user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches the note user
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

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Search the note
  const note = await Note.findById(id);
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }
  const user = await User.findById(req.user.id);

  // Check the user
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  const deletedNote = await note.remove();
  res.status(200).json({
    status: "success",
    payload: deletedNote,
  });
});
