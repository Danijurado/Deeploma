import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema(
  {
    _id: String,
    topic: String,
    aggregateRootId: String,
    data: Object,
  },
  { _id: false, timestamps: true },
);
