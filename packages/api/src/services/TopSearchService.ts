import mongoose, { AnyBulkWriteOperation } from "mongoose";

import eventEmitter from "@api/utils/eventEmitter";
import SearchQuery, { ISearchQuery } from "@api/models/SearchQuery";
import TopSearch, { ITopSearch } from "@api/models/TopSearch";
import type { TopSearchItem } from "@domain";

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
 * Calculates and persists top queries for a given type, returning changed TopSearch document IDs.
 */
export async function calculateAndPersistTopQueriesByType(
  type: "films" | "people",
  limit: number = 5
): Promise<string[]> {
  const topQueries = await _calculateTopQueries(type, limit);
  const newTopQueryIds = topQueries.map((q) => q.searchQuery);

  // Fetch existing top searches for this type
  const existingTopSearches = await TopSearch.find().populate<{
    searchQuery: ISearchQuery;
  }>("searchQuery");
  const filteredExisting = existingTopSearches.filter(
    (ts) => ts.searchQuery.type === type
  );
  const existingTopSearchesMap = new Map<
    string,
    ITopSearch & { searchQuery: ISearchQuery }
  >();
  filteredExisting.forEach((ts) => {
    existingTopSearchesMap.set(ts.searchQuery._id.toString(), ts);
  });

  const bulkOperations: AnyBulkWriteOperation<ITopSearch>[] = topQueries.map(
    (q) => ({
      updateOne: {
        filter: { searchQuery: q.searchQuery },
        update: { $set: { percentage: q.percentage } },
        upsert: true,
      },
    })
  );
  bulkOperations.push({
    deleteMany: {
      filter: { searchQuery: { $nin: newTopQueryIds }, type },
    },
  });

  await TopSearch.bulkWrite(bulkOperations);

  // Fetch updated top searches for this type
  const updatedTopSearches = await TopSearch.find().populate<{
    searchQuery: ISearchQuery;
  }>("searchQuery");
  const filteredUpdated = updatedTopSearches.filter(
    (ts) => ts.searchQuery.type === type
  );
  const updatedTopSearchesMap = new Map<
    string,
    ITopSearch & { searchQuery: ISearchQuery }
  >();
  filteredUpdated.forEach((ts) => {
    updatedTopSearchesMap.set(ts.searchQuery._id.toString(), ts);
  });

  const changedSearchQueryIds = new Set<string>();
  // Inserted/updated
  topQueries.forEach((newQuery) => {
    const newQueryId =
      newQuery.searchQuery._id?.toString?.() || newQuery.searchQuery.toString();
    const existingQuery = existingTopSearchesMap.get(newQueryId);
    if (!existingQuery) {
      changedSearchQueryIds.add(newQueryId);
    } else if (existingQuery.percentage !== newQuery.percentage) {
      changedSearchQueryIds.add(newQueryId);
    }
  });
  // Deleted
  filteredExisting.forEach((existingQuery) => {
    const existingQueryId = existingQuery.searchQuery._id.toString();
    if (!updatedTopSearchesMap.has(existingQueryId)) {
      changedSearchQueryIds.add(existingQueryId);
    }
  });
  return Array.from(changedSearchQueryIds);
}

/**
 * Calculates and persists top queries for both types, emits a single event with all changed TopSearch document IDs.
 */
export async function calculateAndPersistAllTopQueries(): Promise<void> {
  console.debug("Calculating and persisting top queries for all types...");
  const changedIds = new Set<string>();
  const filmsChanged = await calculateAndPersistTopQueriesByType("films");
  const peopleChanged = await calculateAndPersistTopQueriesByType("people");
  filmsChanged.forEach((id) => changedIds.add(id));
  peopleChanged.forEach((id) => changedIds.add(id));
  if (changedIds.size > 0) {
    eventEmitter.emit("top-searches-updated", Array.from(changedIds));
    console.debug(
      "Top queries for all types calculated, persisted, and event emitted."
    );
  } else {
    console.debug(
      "Top queries for all types calculated, persisted, no changes detected."
    );
  }
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
): Promise<string[]> {
  const matchStage: Record<string, unknown> = {};
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

  return topQueries.map((q) => q._id.toString());
}

export async function getTopSearchById(
  searchQueryId: string
): Promise<TopSearchItem | null> {
  if (!mongoose.Types.ObjectId.isValid(searchQueryId)) {
    return null;
  }

  const topSearch = await TopSearch.findOne({
    searchQuery: new mongoose.Types.ObjectId(searchQueryId),
  }).populate<{ searchQuery: ISearchQuery }>("searchQuery");

  if (!topSearch) return null;

  const sq = topSearch.searchQuery as ISearchQuery;
  const dto: TopSearchItem = {
    searchQuery: {
      _id: sq._id.toString(),
      query: sq.query,
      type: sq.type,
    },
    percentage: topSearch.percentage,
    timestamp: (topSearch.updatedAt || topSearch.createdAt).toISOString(),
  };

  return dto;
}
