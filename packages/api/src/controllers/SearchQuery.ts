import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  registerSearchQuery,
  getSearchQueryById,
} from "@api/services/SearchQuery";

export const postSearchQuery = asyncHandler(
  async (req: Request, res: Response) => {
    const { query, type } = req.body;

    await registerSearchQuery(query, type);

    res.sendStatus(204);
  }
);

export const getSearchQuery = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Search query ID is required" });
      return;
    }
    const searchQuery = await getSearchQueryById(id);
    if (searchQuery) {
      res.status(200).json(searchQuery);
    } else {
      res.sendStatus(404);
    }
  }
);
