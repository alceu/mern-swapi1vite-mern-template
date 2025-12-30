/**
 * Custom error classes for API error handling
 */

export class BadRequestError extends Error {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    Error.captureStackTrace(this, this.constructor);
  }
}
