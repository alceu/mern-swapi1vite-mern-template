import SearchQuery from "../models/SearchQuery";
import TopSearch, { ITopSearch } from "../models/TopSearch";

/**
 * Calculates the top search queries from the SearchQuery model.
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @returns An array of objects, each containing a query and its percentage.
 */
async function _calculateTopQueries(
  limit: number = 5
): Promise<{ query: string; percentage: number }[]> {
  const topQueriesWithPercentage = await SearchQuery.aggregate([
    {
      $group: {
        _id: null,
        totalCount: { $sum: "$count" },
        queries: { $push: { query: "$query", count: "$count" } },
      },
    },
    { $unwind: "$queries" },
    {
      $project: {
        _id: 0,
        query: "$queries.query",
        count: "$queries.count",
        totalCount: "$totalCount",
        percentage: {
          $multiply: [{ $divide: ["$queries.count", "$totalCount"] }, 100],
        },
      },
    },
    { $sort: { percentage: -1 } },
    { $limit: limit },
  ]);

  return topQueriesWithPercentage.map((item) => ({
    query: item.query,
    percentage: item.percentage,
  }));
}

/**
 * Calculates the top search queries and persists them into the TopSearch model.
 */
export async function calculateAndPersistTopQueries(): Promise<void> {
  console.log("Calculating and persisting top queries...");
  const topQueries = await _calculateTopQueries();

  // Clear existing top queries and insert new ones
  await TopSearch.deleteMany({});
  await TopSearch.insertMany(
    topQueries.map((q) => ({ query: q.query, percentage: q.percentage }))
  );
  console.log("Top queries calculated and persisted successfully.");
}

/**
 * Gets the pre-calculated top search queries with their percentages.
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @returns An array of objects, each containing a query and its percentage.
 */
export async function getTopQueries(
  limit: number = 5
): Promise<{ query: string; percentage: number }[]> {
  const topQueries = await TopSearch.find({})
    .sort({ percentage: -1 })
    .limit(limit);

  return topQueries.map((item: ITopSearch) => ({
    query: item.query,
    percentage: item.percentage,
  }));
}
