import SearchQuery, { ISearchQuery } from "../models/SearchQuery";
import TopSearch, { ITopSearch } from "../models/TopSearch";

/**
 * Calculates the top search queries from the SearchQuery model for a given type.
 * @param type The type of search (films or people).
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @returns An array of objects, each containing the SearchQuery _id and its percentage.
 */
async function _calculateTopQueries(
  type: 'films' | 'people',
  limit: number = 5
): Promise<{ searchQuery: ISearchQuery['_id']; percentage: number }[]> {
  const topQueriesWithPercentage = await SearchQuery.aggregate([
    { $match: { type: type } }, // Filter by type
    {
      $group: {
        _id: null,
        totalCount: { $sum: "$count" },
        queries: { $push: { _id: "$_id", count: "$count" } },
      },
    },
    { $unwind: "$queries" },
    {
      $project: {
        _id: 0,
        searchQuery: "$queries._id",
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
    searchQuery: item.searchQuery,
    percentage: item.percentage,
  }));
}

/**
 * Calculates the top search queries for both 'films' and 'people' and persists them into the TopSearch model.
 */
export async function calculateAndPersistTopQueries(): Promise<void> {
  console.log("Calculating and persisting top queries...");

  // Calculate for films
  const topFilmQueries = await _calculateTopQueries('films');
  // Calculate for people
  const topPeopleQueries = await _calculateTopQueries('people');

  // Clear existing top queries and insert new ones
  await TopSearch.deleteMany({});
  await TopSearch.insertMany(
    [...topFilmQueries, ...topPeopleQueries].map((q) => ({
      searchQuery: q.searchQuery,
      percentage: q.percentage,
    }))
  );
  console.log("Top queries calculated and persisted successfully.");
}

/**
 * Gets the pre-calculated top search queries with their percentages, optionally filtered by type.
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @param type Optional: The type of search to filter by (films or people).
 * @returns An array of objects, each containing a query, its type, and its percentage.
 */
export async function getTopQueries(
  limit: number = 5,
  type?: 'films' | 'people'
): Promise<Array<ITopSearch & { searchQuery: ISearchQuery }>> {
  const matchStage: any = {};
  if (type) {
    matchStage['searchQuery.type'] = type; // Filter by the type in the populated SearchQuery
  }

  const topQueries = await TopSearch.aggregate([
    { $lookup: { from: 'searchqueries', localField: 'searchQuery', foreignField: '_id', as: 'searchQuery' } },
    { $unwind: '$searchQuery' },
    { $match: matchStage },
    { $sort: { percentage: -1 } },
    { $limit: limit },
    { $project: { _id: 0, searchQuery: { _id: '$searchQuery._id', query: '$searchQuery.query', type: '$searchQuery.type' }, percentage: 1, timestamp: 1 } }
  ]);

  return topQueries as Array<ITopSearch & { searchQuery: ISearchQuery }>;
}
