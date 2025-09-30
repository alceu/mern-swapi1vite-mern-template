import { Request, Response } from "express";

import { registerSearchQuery } from "@api/services/SearchQueryService";
import { getTopQueries } from "@api/services/TopSearchService";

export async function postSearchQuery(req: Request, res: Response) {
  try {
    const { query, type } = req.body;

    await registerSearchQuery(query, type);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error registering search query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTopSearches(req: Request, res: Response) {
  try {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const type = req.query.type as "films" | "people" | undefined;

    const topQueries = await getTopQueries(limit, type);

    res.status(200).json(topQueries);
  } catch (error) {
    console.error("Error fetching top queries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
