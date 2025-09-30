import express from "express";

import { getTopSearches } from "@api/controllers/TopSearch";
import { validateTopSearch } from "@api/validations/TopSearch";

const router = express.Router();

router.get("/", validateTopSearch, getTopSearches);

export default router;
