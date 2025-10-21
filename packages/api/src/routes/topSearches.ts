import express from "express";

import {
  getTopSearches,
  getTopSearch,
  getEvents,
} from "@api/controllers/TopSearch";
import { validateTopSearch } from "@api/validations/TopSearch";

const router = express.Router();

router.get("/", validateTopSearch, getTopSearches);
router.get("/events", getEvents);
router.get("/:id", getTopSearch);

export default router;
