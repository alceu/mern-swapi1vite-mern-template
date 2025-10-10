import { Request, Response, NextFunction } from "express";

export const validateTopSearch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const type = req.query.type as "films" | "people";
  if (type !== "films" && type !== "people") {
    return res.status(400).json({
      error: "Invalid type parameter.",
    });
  }
  next();
};
