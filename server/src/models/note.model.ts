import mongoose, { Schema, Document, Model } from 'mongoose';

interface INote extends Document {
  title: string;
  user: mongoose.Schema.Types.ObjectId;
}

const NoteSchema: Schema<INote> = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Note: Model<INote> = mongoose.model<INote>('Note', NoteSchema);