import { describe, expect, it } from "vitest";

import { routes } from "./index";

describe("routes config", () => {
  it("defines root routes and children", () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe("/");

    const children = routes[0].children || [];
    const childPaths = children.map((child) => child.path);

    expect(childPaths).toEqual(
      expect.arrayContaining(["people", "films", undefined])
    );
  });
});
