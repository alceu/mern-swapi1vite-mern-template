import mongoose from "mongoose";
import { ISearchQueryDto } from "@swapi-mern/domain";
import SearchQuery from "@api/models/SearchQuery";

/**
 * Registers a search query by directly updating the database.
 * @param query The search query to register.
 * @param type The type of search (films or people).
 */
export async function registerSearchQuery(
  query: string,
  type: "films" | "people"
): Promise<void> {
  await SearchQuery.findOneAndUpdate(
    { query, type },
    { $inc: { count: 1 } },
    { upsert: true, new: true, runValidators: true }
  );
}

export async function getSearchQueryById(
  id: string
): Promise<ISearchQueryDto | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const searchQuery = await SearchQuery.findById(id);

  if (!searchQuery) {
    return null;
  }

  return {
    _id: searchQuery.id,
    query: searchQuery.query,
    type: searchQuery.type,
    count: searchQuery.count,
    createdAt: new Date(searchQuery.createdAt).toISOString(),
    updatedAt: new Date(searchQuery.updatedAt).toISOString(),
  };
}
