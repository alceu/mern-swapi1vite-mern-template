import express from "express";

import { postSearchQuery } from "@api/controllers/SearchQuery";
import { getTopSearches } from "@api/controllers/TopSearch";
import { validateSearchQuery } from "@api/validations/SearchQuery";
import { validateTopSearch } from "@api/validations/TopSearch";

const router = express.Router();

router.post("/", validateSearchQuery, postSearchQuery);

router.get("/top", validateTopSearch, getTopSearches);

export default router;
