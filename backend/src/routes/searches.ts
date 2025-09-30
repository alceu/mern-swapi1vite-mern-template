import express from "express";

import {
  postSearchQuery,
  getTopSearches,
} from "@api/controllers/searchesController";

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    const { query, type } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    if (!type || (type !== "films" && type !== "people")) {
      return res.status(400).json({ error: "Invalid type parameter." });
    }
    next();
  },
  postSearchQuery
);

router.get(
  "/top",
  (req, res, next) => {
    const type = req.query.type as "films" | "people";
    if (type !== "films" && type !== "people") {
      return res.status(400).json({
        error: "Invalid type parameter.",
      });
    }
    next();
  },
  getTopSearches
);

export default router;
