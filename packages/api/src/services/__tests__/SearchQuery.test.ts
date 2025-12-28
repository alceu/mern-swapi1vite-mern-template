import mongoose from "mongoose";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import SearchQuery from "@api/models/SearchQuery";
import {
  getSearchQueryById,
  registerSearchQuery,
} from "@api/services/SearchQuery";
import { BadRequestError, NotFoundError } from "@api/utils/errors";

describe("getSearchQueryById", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("throws BadRequestError for an invalid id", async () => {
    await expect(getSearchQueryById("invalid-id")).rejects.toThrow(
      BadRequestError
    );
  });

  it("throws NotFoundError when the query is missing", async () => {
    jest
      .spyOn(SearchQuery, "findById")
      .mockReturnValue(
        Promise.resolve(null) as ReturnType<typeof SearchQuery.findById>
      );

    const id = new mongoose.Types.ObjectId().toString();

    await expect(getSearchQueryById(id)).rejects.toThrow(NotFoundError);
  });

  it("returns a search query dto when found", async () => {
    const id = new mongoose.Types.ObjectId().toString();
    const createdAt = new Date("2024-01-01T00:00:00Z");
    const updatedAt = new Date("2024-01-02T00:00:00Z");

    jest
      .spyOn(SearchQuery, "findById")
      .mockReturnValue(
        Promise.resolve({
          id,
          query: "luke",
          type: "people",
          count: 2,
          createdAt,
          updatedAt,
        }) as ReturnType<typeof SearchQuery.findById>
      );

    await expect(getSearchQueryById(id)).resolves.toEqual({
      _id: id,
      query: "luke",
      type: "people",
      count: 2,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  });
});

describe("registerSearchQuery", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("upserts the search query count", async () => {
    const findOneAndUpdate = jest
      .spyOn(SearchQuery, "findOneAndUpdate")
      .mockResolvedValue(
        {} as Awaited<ReturnType<typeof SearchQuery.findOneAndUpdate>>
      );

    await registerSearchQuery("leia", "people");

    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { query: "leia", type: "people" },
      { $inc: { count: 1 } },
      { upsert: true, new: true, runValidators: true }
    );
  });
});
