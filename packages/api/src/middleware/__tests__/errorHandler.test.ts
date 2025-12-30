import { describe, expect, it, jest } from "@jest/globals";
import type { NextFunction, Request, Response } from "express";

import { errorHandler } from "@api/middleware/errorHandler";
import { BadRequestError } from "@api/utils/errors";

const buildResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  return res;
};

describe("errorHandler", () => {
  it("handles known errors with their status codes", () => {
    const res = buildResponse();
    const error = new BadRequestError("Invalid request");

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    errorHandler(
      error,
      {} as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid request",
      error: "BadRequestError",
    });

    consoleSpy.mockRestore();
  });

  it("handles unexpected errors with a 500", () => {
    const res = buildResponse();
    const error = new Error("Boom");
    const originalEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = "production";

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    errorHandler(
      error,
      {} as Request,
      res as unknown as Response,
      jest.fn() as NextFunction
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
      error: undefined,
    });

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });
});
