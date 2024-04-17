import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    subtitle: String,
    description: String,
    instructorId: String,
    resource: String,
    resourceThumbnail: String,
    url: String,
  },
  { _id: false, timestamps: true },
);
