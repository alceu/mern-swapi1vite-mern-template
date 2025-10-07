import express from "express";

import { getTopSearches, getTopSearch } from "@api/controllers/TopSearch";
import { validateTopSearch } from "@api/validations/TopSearch";

const router = express.Router();

router.get("/", validateTopSearch, getTopSearches);
router.get("/:id", getTopSearch);

export default router;
