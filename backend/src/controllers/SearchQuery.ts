import { Request, Response } from "express";

import { registerSearchQuery } from "@api/services/SearchQueryService";

export async function postSearchQuery(req: Request, res: Response) {
  try {
    const { query, type } = req.body;

    await registerSearchQuery(query, type);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error registering search query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
