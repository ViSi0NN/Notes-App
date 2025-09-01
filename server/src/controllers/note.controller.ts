import { Response } from 'express';
import { Note } from '../models/note.model';
import { AuthRequest } from '../middleware/auth.middleware';
import dotenv from "dotenv";
dotenv.config();

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes.' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Note title is required.' });
  }

  try {
    const newNote = new Note({
      title,
      user: req.userId,
    });
    await newNote.save();
    res.status(201).json(newNote ,);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note.' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found or user not authorized.' });
    }
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note.' });
  }
};