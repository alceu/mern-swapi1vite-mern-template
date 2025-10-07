import mongoose, { AnyBulkWriteOperation } from "mongoose";

import eventEmitter from "@api/utils/eventEmitter";
import SearchQuery, { ISearchQuery } from "@api/models/SearchQuery";
import TopSearch, { ITopSearch } from "@api/models/TopSearch";

/**
 * Calculates the top search queries from the SearchQuery model for a given type.
 * @param type The type of search (films or people).
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @returns An array of objects, each containing the SearchQuery _id and its percentage.
 */
async function _calculateTopQueries(
  type: "films" | "people",
  limit: number = 5
): Promise<{ searchQuery: mongoose.Types.ObjectId; percentage: number }[]> {
  const topQueriesWithPercentage = await SearchQuery.aggregate([
    { $match: { type } },
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
        percentage: {
          $divide: ["$queries.count", "$totalCount"],
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

  const topFilmQueries = await _calculateTopQueries("films");
  const topPeopleQueries = await _calculateTopQueries("people");

  const newTopQueries = [...topFilmQueries, ...topPeopleQueries];
  console.log("newTopQueries:", newTopQueries);
  const newTopQueryIds = newTopQueries.map((q) => q.searchQuery);

  // Fetch existing top searches to compare with new ones
  const existingTopSearches = await TopSearch.find().populate<{
    searchQuery: ISearchQuery;
  }>("searchQuery");
  const existingTopSearchesMap = new Map<
    string,
    ITopSearch & { searchQuery: ISearchQuery }
  >();
  existingTopSearches.forEach((ts) => {
    existingTopSearchesMap.set(ts.searchQuery._id.toString(), ts);
  });
  console.log("existingTopSearchesMap:", existingTopSearchesMap);

  const bulkOperations: AnyBulkWriteOperation<ITopSearch>[] = newTopQueries.map(
    (q) => ({
      updateOne: {
        filter: { searchQuery: q.searchQuery },
        update: { $set: { percentage: q.percentage } },
        upsert: true,
      },
    })
  );

  // Add operation to remove old top queries that are no longer in the new list
  bulkOperations.push({
    deleteMany: {
      filter: { searchQuery: { $nin: newTopQueryIds } },
    },
  });

  // Execute bulk write operations
  await TopSearch.bulkWrite(bulkOperations);

  console.log("Top queries calculated and persisted successfully.");

  // Fetch the updated state of top searches after bulk write
  const updatedTopSearches = await TopSearch.find().populate<{
    searchQuery: ISearchQuery;
  }>("searchQuery");
  const updatedTopSearchesMap = new Map<
    string,
    ITopSearch & { searchQuery: ISearchQuery }
  >();
  updatedTopSearches.forEach((ts) => {
    updatedTopSearchesMap.set(ts.searchQuery._id.toString(), ts);
  });
  console.log("updatedTopSearchesMap:", updatedTopSearchesMap);

  const changedSearchQueryIds = new Set<string>();

  // Identify inserted and updated documents
  newTopQueries.forEach((newQuery) => {
    const newQueryId = newQuery.searchQuery._id.toString(); // Use newQuery.searchQuery._id
    const existingQuery = existingTopSearchesMap.get(newQueryId);

    if (!existingQuery) {
      // Inserted
      changedSearchQueryIds.add(newQueryId);
    } else if (existingQuery.percentage !== newQuery.percentage) {
      // Updated percentage
      changedSearchQueryIds.add(newQueryId);
    }
  });

  // Identify deleted documents
  existingTopSearches.forEach((existingQuery) => {
    const existingQueryId = existingQuery.searchQuery._id.toString();
    if (!updatedTopSearchesMap.has(existingQueryId)) {
      // Deleted
      changedSearchQueryIds.add(existingQueryId);
    }
  });
  console.log("changedSearchQueryIds:", changedSearchQueryIds);

  eventEmitter.emit("top-searches-updated", Array.from(changedSearchQueryIds));
}
/**
 * Gets the pre-calculated top search queries with their percentages, optionally filtered by type.
 * @param limit The maximum number of top queries to return. Defaults to 5.
 * @param type Optional: The type of search to filter by (films or people).
 * @returns An array of objects, each containing a query, its type, and its percentage.
 */
export async function getTopQueries(
  limit: number = 5,
  type?: "films" | "people"
): Promise<mongoose.Types.ObjectId[]> {
  const matchStage: any = {};
  if (type) {
    matchStage["searchQuery.type"] = type;
  }

  const topQueries = await TopSearch.aggregate([
    {
      $lookup: {
        from: "searchqueries",
        localField: "searchQuery",
        foreignField: "_id",
        as: "searchQuery",
      },
    },
    { $unwind: "$searchQuery" },
    { $match: matchStage },
    { $sort: { percentage: -1 } },
    { $limit: limit },
    {
      $project: {
        _id: "$searchQuery._id",
      },
    },
  ]);

  return topQueries.map((q) => q._id);
}

export async function getTopSearchById(
  searchQueryId: string
): Promise<(ITopSearch & { searchQuery: ISearchQuery }) | null> {
  if (!mongoose.Types.ObjectId.isValid(searchQueryId)) {
    return null;
  }

  const topSearch = await TopSearch.findOne({
    searchQuery: new mongoose.Types.ObjectId(searchQueryId),
  }).populate<{ searchQuery: ISearchQuery }>("searchQuery");

  return topSearch;
}
