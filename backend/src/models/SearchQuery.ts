import mongoose, { Schema, Document } from "mongoose";

export interface ISearchQuery extends Document {
  query: string;
  type: "films" | "people";
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

const SearchQuerySchema: Schema = new Schema(
  {
    query: { type: String, required: true },
    type: { type: String, required: true, enum: ["films", "people"] },
    count: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

SearchQuerySchema.index({ query: 1, type: 1 }, { unique: true });

export default mongoose.model<ISearchQuery>("SearchQuery", SearchQuerySchema);
