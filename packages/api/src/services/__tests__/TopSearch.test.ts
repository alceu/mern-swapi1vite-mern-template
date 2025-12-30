import mongoose from "mongoose";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import SearchQuery from "@api/models/SearchQuery";
import TopSearch, { ITopSearch } from "@api/models/TopSearch";
import {
  calculateAndPersistTopQueriesByType,
  getTopQueries,
  getTopSearchById,
} from "@api/services/TopSearch";
import { BadRequestError, NotFoundError } from "@api/utils/errors";

describe("getTopSearchById", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("throws BadRequestError for an invalid id", async () => {
    await expect(getTopSearchById("invalid-id")).rejects.toThrow(
      BadRequestError
    );
  });

  it("throws NotFoundError when the top search is missing", async () => {
    jest
      .spyOn(TopSearch, "findOne")
      .mockReturnValue(
        Promise.resolve(null) as ReturnType<typeof TopSearch.findOne>
      );

    const id = new mongoose.Types.ObjectId().toString();

    await expect(getTopSearchById(id)).rejects.toThrow(NotFoundError);
  });

  it("returns a top search dto when found", async () => {
    const id = new mongoose.Types.ObjectId().toString();
    const createdAt = new Date("2024-01-01T00:00:00Z");
    const updatedAt = new Date("2024-01-02T00:00:00Z");

    jest
      .spyOn(TopSearch, "findOne")
      .mockReturnValue(
        Promise.resolve({
          id,
          searchQuery: new mongoose.Types.ObjectId(id),
          percentage: 0.4,
          createdAt,
          updatedAt,
        }) as ReturnType<typeof TopSearch.findOne>
      );

    await expect(getTopSearchById(id)).resolves.toEqual({
      _id: id,
      searchQuery: id,
      percentage: 0.4,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  });
});

describe("getTopQueries", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns stringified ids from the aggregation", async () => {
    const firstId = new mongoose.Types.ObjectId();
    const secondId = new mongoose.Types.ObjectId();

    jest
      .spyOn(TopSearch, "aggregate")
      .mockResolvedValue([{ _id: firstId }, { _id: secondId }]);

    await expect(getTopQueries(2, 0, "films")).resolves.toEqual([
      firstId.toString(),
      secondId.toString(),
    ]);
  });
});

describe("calculateAndPersistTopQueriesByType", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const buildTopSearchDoc = (
    searchQuery: mongoose.Types.ObjectId,
    percentage: number
  ): ITopSearch =>
    ({
      searchQuery,
      percentage,
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: () => ({
        searchQuery,
        percentage,
      }),
    }) as unknown as ITopSearch;

  it("returns changed ids after bulk updates", async () => {
    const firstId = new mongoose.Types.ObjectId();
    const secondId = new mongoose.Types.ObjectId();
    const removedId = new mongoose.Types.ObjectId();

    jest.spyOn(SearchQuery, "aggregate").mockResolvedValue([
      { searchQuery: firstId, percentage: 0.6 },
      { searchQuery: secondId, percentage: 0.4 },
    ]);

    jest
      .spyOn(TopSearch, "find")
      .mockResolvedValueOnce([
        buildTopSearchDoc(firstId, 0.5),
        buildTopSearchDoc(removedId, 0.2),
      ])
      .mockResolvedValueOnce([
        buildTopSearchDoc(firstId, 0.6),
        buildTopSearchDoc(secondId, 0.4),
      ]);

    type BulkWriteResult = Awaited<ReturnType<typeof TopSearch.bulkWrite>>;
    const bulkWriteResult = {} as unknown as BulkWriteResult;
    const bulkWrite = jest
      .spyOn(TopSearch, "bulkWrite")
      .mockResolvedValue(bulkWriteResult);

    const changedIds = await calculateAndPersistTopQueriesByType("films", 2);

    expect(bulkWrite).toHaveBeenCalled();
    expect(changedIds).toEqual(
      expect.arrayContaining([
        firstId.toString(),
        secondId.toString(),
        removedId.toString(),
      ])
    );
  });
});
