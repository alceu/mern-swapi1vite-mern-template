import { describe, expect, it, jest } from "@jest/globals";
import type { NextFunction, Request, Response } from "express";

import { postSearchQuery, getSearchQuery } from "@api/controllers/SearchQuery";
import type { ISearchQueryDto } from "@swapi-mern/domain";
import { getSearchQueryById, registerSearchQuery } from "@api/services/SearchQuery";

jest.mock("@api/services/SearchQuery", () => ({
  registerSearchQuery: jest.fn(),
  getSearchQueryById: jest.fn(),
}));

const buildResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  };

  return res;
};

describe("SearchQuery controller", () => {
  it("registers a search query and returns 204", async () => {
    const req = {
      body: { query: "luke", type: "people" },
    };
    const res = buildResponse();

    await postSearchQuery(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(registerSearchQuery).toHaveBeenCalledWith("luke", "people");
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("returns 400 when id is missing", async () => {
    const req = { params: {} };
    const res = buildResponse();

    await getSearchQuery(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Search query ID is required",
    });
    expect(getSearchQueryById).not.toHaveBeenCalled();
  });

  it("returns 200 with the search query payload", async () => {
    const payload: ISearchQueryDto = {
      _id: "1",
      query: "luke",
      type: "people",
      count: 1,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };
    const req = { params: { id: "1" } };
    const res = buildResponse();

    jest.mocked(getSearchQueryById).mockResolvedValue(payload);

    await getSearchQuery(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(payload);
  });

  it("returns 404 when service returns no data", async () => {
    const req = { params: { id: "missing" } };
    const res = buildResponse();

    jest
      .mocked(getSearchQueryById)
      .mockResolvedValue(null as unknown as ISearchQueryDto);

    await getSearchQuery(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });
});
