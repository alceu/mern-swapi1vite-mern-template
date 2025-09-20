import mongoose, { Schema, Document } from "mongoose";

export interface ITopSearch extends Document {
  query: string;
  percentage: number;
  timestamp: Date;
}

const TopSearchSchema: Schema = new Schema({
  query: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ITopSearch>("TopSearch", TopSearchSchema);
