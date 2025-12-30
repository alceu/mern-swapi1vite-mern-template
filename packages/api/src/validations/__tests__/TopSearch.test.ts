import { describe, expect, it } from "@jest/globals";

import { validateTopSearch } from "@api/validations/TopSearch";

describe("validateTopSearch", () => {
  it("exposes the expected validation chain", () => {
    expect(validateTopSearch).toHaveLength(3);
    validateTopSearch.forEach((validator) => {
      expect(typeof validator).toBe("function");
    });
  });
});
