
import mongoose, { Schema, Document } from 'mongoose';

export interface ISearchQuery extends Document {
  query: string;
  type: 'films' | 'people'; // Added type field
  count: number;
}

const SearchQuerySchema: Schema = new Schema({
  query: { type: String, required: true }, // Removed unique: true
  type: { type: String, required: true, enum: ['films', 'people'] }, // Added type field
  count: { type: Number, required: true, default: 1 },
});

// Add a compound unique index
SearchQuerySchema.index({ query: 1, type: 1 }, { unique: true });

export default mongoose.model<ISearchQuery>('SearchQuery', SearchQuerySchema);
