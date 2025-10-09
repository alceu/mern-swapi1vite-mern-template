import express from "express";

import { postSearchQuery } from "@api/controllers/SearchQuery";
import { validateSearchQuery } from "@api/validations/SearchQuery";

const router = express.Router();

router.post("/", validateSearchQuery, postSearchQuery);

export default router;
