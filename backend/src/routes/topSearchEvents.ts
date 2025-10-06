import { Router } from "express";

import { topSearchEvents } from "@api/controllers/TopSearchEvents";

const router = Router();

router.get("/", topSearchEvents);

export default router;
