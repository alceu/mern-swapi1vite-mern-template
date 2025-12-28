import { describe, expect, it } from "@jest/globals";

import router from "@api/routes/topSearches";

type RouterLayer = {
  route?: {
    path?: string;
    methods?: Record<string, boolean>;
  };
};

const getRouteDetails = () =>
  (router.stack as RouterLayer[])
    .filter((layer) => layer.route)
    .map((layer) => ({
      path: layer.route?.path,
      methods: layer.route?.methods,
    }));

describe("top searches routes", () => {
  it("defines list, events, and detail routes", () => {
    const routes = getRouteDetails();

    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "/",
          methods: expect.objectContaining({ get: true }),
        }),
        expect.objectContaining({
          path: "/events",
          methods: expect.objectContaining({ get: true }),
        }),
        expect.objectContaining({
          path: "/:id",
          methods: expect.objectContaining({ get: true }),
        }),
      ])
    );
  });
});
