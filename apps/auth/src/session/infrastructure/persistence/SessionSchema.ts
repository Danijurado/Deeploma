import * as mongoose from 'mongoose';

export const SessionSchema = new mongoose.Schema(
  {
    _id: String,
    userId: String,
    linkToken: String,
  },
  { _id: false, timestamps: true },
);
