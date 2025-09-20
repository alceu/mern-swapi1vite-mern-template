import SearchQuery from "../models/SearchQuery";

/**
 * Registers a search query by directly updating the database.
 * @param query The search query to register.
 */
export async function registerSearchQuery(query: string): Promise<void> {
  await SearchQuery.findOneAndUpdate(
    { query },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
}
