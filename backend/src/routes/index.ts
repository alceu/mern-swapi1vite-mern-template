import express from "express";

import searchesRouter from "./searches";

const router = express.Router();

router.use("/searches", searchesRouter);

export default router;
