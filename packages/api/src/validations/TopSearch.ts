import { query } from "express-validator";

export const validateTopSearch = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("index")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Index must be a non-negative integer"),
  query("type")
    .optional()
    .isIn(["films", "people"])
    .withMessage("Type must be either 'films' or 'people'"),
];
