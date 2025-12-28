import { EventEmitter } from "node:events";
import { describe, expect, it, jest } from "@jest/globals";
import type { NextFunction, Request, Response } from "express";

import {
  getEvents,
  getTopSearch,
  getTopSearches,
} from "@api/controllers/TopSearch";
import { getTopQueries, getTopSearchById } from "@api/services/TopSearch";
import eventEmitter from "@api/utils/EventEmitter";
import type { ITopSearchDto } from "@swapi-mern/domain";

jest.mock("@api/services/TopSearch", () => ({
  getTopQueries: jest.fn(),
  getTopSearchById: jest.fn(),
}));

const buildResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
    setHeader: jest.fn(),
    flushHeaders: jest.fn(),
    write: jest.fn(),
  };

  return res;
};

describe("TopSearch controller", () => {
  it("returns top search ids", async () => {
    const req = { query: { limit: "2", index: "1", type: "films" } };
    const res = buildResponse();

    jest.mocked(getTopQueries).mockResolvedValue(["a", "b"]);

    await getTopSearches(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(getTopQueries).toHaveBeenCalledWith(2, 1, "films");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(["a", "b"]);
  });

  it("returns 400 when id is missing", async () => {
    const req = { params: {} };
    const res = buildResponse();

    await getTopSearch(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Top search ID is required",
    });
    expect(getTopSearchById).not.toHaveBeenCalled();
  });

  it("returns 200 when a top search is found", async () => {
    const payload = {
      _id: "1",
      searchQuery: "2",
      percentage: 0.5,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };
    const req = { params: { id: "1" } };
    const res = buildResponse();

    jest.mocked(getTopSearchById).mockResolvedValue(payload);

    await getTopSearch(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(payload);
  });

  it("returns 404 when a top search is not found", async () => {
    const req = { params: { id: "missing" } };
    const res = buildResponse();

    jest
      .mocked(getTopSearchById)
      .mockResolvedValue(null as unknown as ITopSearchDto);

    await getTopSearch(
      req as unknown as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("streams updates and cleans up listeners", () => {
    const req = new EventEmitter();
    const res = buildResponse();
    const initialListeners =
      eventEmitter.listenerCount("top-searches-updated");

    getEvents(req as unknown as Request, res as unknown as Response);

    expect(eventEmitter.listenerCount("top-searches-updated")).toBe(
      initialListeners + 1
    );

    eventEmitter.emit("top-searches-updated", ["id-1"]);

    expect(res.write).toHaveBeenCalledWith(
      `data: ${JSON.stringify({ updated: ["id-1"] })}\n\n`
    );

    req.emit("close");

    expect(eventEmitter.listenerCount("top-searches-updated")).toBe(
      initialListeners
    );
  });
});
