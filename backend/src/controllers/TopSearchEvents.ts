import { Request, Response } from "express";

import eventEmitter from "@api/utils/eventEmitter";

export function topSearchEvents(req: Request, res: Response) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const onUpdate = (updatedIds: string[]) => {
    res.write(`data: ${JSON.stringify({ updatedIds })}\n\n`);
  };

  eventEmitter.on("top-searches-updated", onUpdate);

  req.on("close", () => {
    eventEmitter.off("top-searches-updated", onUpdate);
  });
}
