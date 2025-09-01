import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  dateOfBirth?: Date;
  googleId?: string;
  otp?: string;
  otpExpires?: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  dateOfBirth: {
    type: Date
  },
  googleId: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
}, { timestamps: true });

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);