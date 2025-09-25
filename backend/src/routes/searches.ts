import express, { Request, Response } from "express";
import { registerSearchQuery } from "@services/SearchQueryService";
import { getTopQueries } from "@services/TopSearchService";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { query, type } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  if (!type || (type !== 'films' && type !== 'people')) {
    return res.status(400).json({ error: "Valid type (films or people) is required" });
  }

  try {
    await registerSearchQuery(query, type);
    res.status(200).json({ message: "Query registered successfully" });
  } catch (error) {
    console.error("Error registering search query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/top", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const type = req.query.type as 'films' | 'people' | undefined;

    if (type && type !== 'films' && type !== 'people') {
      return res.status(400).json({ error: "Invalid type parameter. Must be 'films' or 'people'." });
    }

    const topQueries = await getTopQueries(limit, type);
    res.status(200).json(topQueries);
  } catch (error) {
    console.error("Error fetching top queries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
