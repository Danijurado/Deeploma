import * as mongoose from 'mongoose';
import { Role } from '~user/domain';

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    email: String,
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
    },
    instructorId: String,
  },
  { _id: false, timestamps: true },
);
