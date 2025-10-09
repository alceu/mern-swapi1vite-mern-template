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
