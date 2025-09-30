import express from "express";

import { getTopSearches, postSearchQuery } from "@api/controllers/searchesController";
import { validateSearchQuery, validateTopSearch } from "@api/validations/searchesValidation";

const router = express.Router();

router.post("/", validateSearchQuery, postSearchQuery);

router.get("/top", validateTopSearch, getTopSearches);

export default router;
