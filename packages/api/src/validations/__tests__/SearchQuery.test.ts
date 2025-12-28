import { describe, expect, it, jest } from "@jest/globals";
import type { NextFunction, Request, Response } from "express";

import { validateSearchQuery } from "@api/validations/SearchQuery";

describe("validateSearchQuery", () => {
  it("rejects when query is missing", () => {
    const req = { body: { type: "people" } };
    const json = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ json }) };
    const next = jest.fn();

    validateSearchQuery(
      req as Request,
      res as unknown as Response,
      next as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ error: "Query is required" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects when type is invalid", () => {
    const req = { body: { query: "luke", type: "aliens" } };
    const json = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ json }) };
    const next = jest.fn();

    validateSearchQuery(
      req as Request,
      res as unknown as Response,
      next as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ error: "Invalid type parameter." });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when input is valid", () => {
    const req = { body: { query: "leia", type: "people" } };
    const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();

    validateSearchQuery(
      req as Request,
      res as unknown as Response,
      next as NextFunction
    );

    expect(next).toHaveBeenCalled();
  });
});
