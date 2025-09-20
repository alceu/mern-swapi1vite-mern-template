
import mongoose, { Schema, Document } from 'mongoose';

export interface ISearchQuery extends Document {
  query: string;
  count: number;
}

const SearchQuerySchema: Schema = new Schema({
  query: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 1 },
});

export default mongoose.model<ISearchQuery>('SearchQuery', SearchQuerySchema);
