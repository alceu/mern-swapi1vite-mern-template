import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { getTopQueries, getTopSearchById } from "@api/services/TopSearch";

import eventEmitter from "@api/utils/EventEmitter";

export const getTopSearches = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, type, index } = req.query;
    const topSearches = await getTopQueries(
      Number(limit) || undefined,
      Number(index) || undefined,
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

export function getEvents(req: Request, res: Response) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const onUpdate = (updatedIds: string[]) => {
    res.write(`data: ${JSON.stringify({ updated: updatedIds })}\n\n`);
  };

  eventEmitter.on("top-searches-updated", onUpdate);

  req.on("close", () => {
    eventEmitter.off("top-searches-updated", onUpdate);
  });
}
