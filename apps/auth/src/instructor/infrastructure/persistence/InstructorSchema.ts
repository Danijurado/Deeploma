import * as mongoose from 'mongoose';

export const InstructorSchema = new mongoose.Schema(
  {
    _id: String,
    userId: String,
    name: String,
    profession: String,
    photo: String,
    description: String,
  },
  { _id: false, timestamps: true },
);
