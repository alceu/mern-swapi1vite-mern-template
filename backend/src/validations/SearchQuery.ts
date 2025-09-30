import { Request, Response, NextFunction } from "express";

export const validateSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query, type } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  if (!type || (type !== "films" && type !== "people")) {
    return res.status(400).json({ error: "Invalid type parameter." });
  }
  next();
};
