import mongoose, { Schema, Document } from "mongoose";

import { ISearchQuery } from "./SearchQuery";
export interface ITopSearch extends Document {
  searchQuery: mongoose.Schema.Types.ObjectId | ISearchQuery;
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
