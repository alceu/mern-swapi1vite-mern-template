import mongoose from "mongoose";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import SearchQuery from "@api/models/SearchQuery";
import { getSearchQueryById } from "@api/services/SearchQuery";
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
});
