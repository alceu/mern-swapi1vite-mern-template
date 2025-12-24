import mongoose from "mongoose";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import TopSearch from "@api/models/TopSearch";
import { getTopSearchById } from "@api/services/TopSearch";
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
});
