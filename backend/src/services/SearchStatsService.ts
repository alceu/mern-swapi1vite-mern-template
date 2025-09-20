
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
 * Gets the top five search queries with their percentages.
 * @returns An array of objects, each containing a query and its percentage.
 */
export async function getTopFiveQueries(): Promise<{ query: string; percentage: number }[]> {
  const totalQueries = await SearchQuery.aggregate([
    { $group: { _id: null, total: { $sum: '$count' } } },
  ]);

  if (totalQueries.length === 0 || totalQueries[0].total === 0) {
    return [];
  }

  const topFive = await SearchQuery.find({})
    .sort({ count: -1 })
    .limit(5);

  const total = totalQueries[0].total;

  return topFive.map((item: ISearchQuery) => ({
    query: item.query,
    percentage: (item.count / total) * 100,
  }));
}
