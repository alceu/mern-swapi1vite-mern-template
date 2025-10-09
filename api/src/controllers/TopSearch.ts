import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  getTopQueries,
  getTopSearchById,
} from "@api/services/TopSearchService";

export const getTopSearches = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, type } = req.query;
    const topSearches = await getTopQueries(
      Number(limit) || undefined,
      type as "films" | "people" | undefined
    );
    res.status(200).json(topSearches);
  }
);

export const getTopSearch = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Top search ID is required" });
      return;
    }
    const topSearch = await getTopSearchById(id);
    if (topSearch) {
      res.status(200).json(topSearch);
    } else {
      res.sendStatus(404);
    }
  }
);
