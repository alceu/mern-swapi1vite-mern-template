
import SearchQuery, { ISearchQuery } from '../models/SearchQuery';

/**
 * Registers a search query.
 * @param query The search query to register.
 */
export async function registerSearchQuery(query: string): Promise<void> {
  await SearchQuery.findOneAndUpdate(
    { query },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
}

/**
 * Gets the top search queries with their percentages.
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @returns An array of objects, each containing a query and its percentage.
 */
export async function getTopQueries(limit: number = 5): Promise<{ query: string; percentage: number }[]> {
  const totalQueries = await SearchQuery.aggregate([
    { $group: { _id: null, total: { $sum: '$count' } } },
  ]);

  if (totalQueries.length === 0 || totalQueries[0].total === 0) {
    return [];
  }

  const topQueries = await SearchQuery.find({})
    .sort({ count: -1 })
    .limit(limit);

  const total = totalQueries[0].total;

  return topQueries.map((item: ISearchQuery) => ({
    query: item.query,
    percentage: (item.count / total) * 100,
  }));
}
