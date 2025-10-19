import express from "express";

import { postSearchQuery, getSearchQuery } from "@api/controllers/SearchQuery";
import { validateSearchQuery } from "@api/validations/SearchQuery";

const router = express.Router();

router.post("/", validateSearchQuery, postSearchQuery);
router.get("/:id", getSearchQuery);

export default router;
