import mongoose, { Schema, Document } from "mongoose";

export interface ITopSearch extends Document {
  searchQuery: mongoose.Types.ObjectId;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopSearchSchema: Schema = new Schema(
  {
    searchQuery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SearchQuery",
      required: true,
      unique: true,
    },
    percentage: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITopSearch>("TopSearch", TopSearchSchema);
