import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "@api/utils/errors";

/**
 * Global error handling middleware
 * Handles custom errors and unexpected errors
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error:", err);

  if (err instanceof BadRequestError || err instanceof NotFoundError) {
    res.status(err.statusCode).json({
      message: err.message,
      error: err.name,
    });
    return;
  }

  // Handle unexpected errors
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}
