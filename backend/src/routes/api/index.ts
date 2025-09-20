import express from "express";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

export default apiRouter;
