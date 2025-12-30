import { configureStore } from "@reduxjs/toolkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { swapi } from "./swapi";

const buildStore = () =>
  configureStore({
    reducer: {
      [swapi.reducerPath]: swapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swapi.middleware),
  });

describe("swapi api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exposes the expected endpoints", () => {
    expect(swapi.reducerPath).toBe("swapiApi");
    expect(swapi.endpoints.getPeople).toBeDefined();
    expect(swapi.endpoints.getPersonById).toBeDefined();
    expect(swapi.endpoints.getFilms).toBeDefined();
    expect(swapi.endpoints.getFilmById).toBeDefined();
  });

  const buildResponse = (payload: unknown) =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  it("runs the people query", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(buildResponse({ result: [] }));

    const store = buildStore();
    const result = await store.dispatch(
      swapi.endpoints.getPeople.initiate("luke")
    );

    expect(fetchSpy).toHaveBeenCalled();
    expect(result.data).toEqual([]);
  });

  it("runs the person by id query", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      buildResponse({
        result: {
          uid: "1",
          properties: {
            name: "Luke Skywalker",
            birth_year: "19BBY",
            eye_color: "blue",
            gender: "male",
            hair_color: "blond",
            height: "172",
            mass: "77",
            skin_color: "fair",
            homeworld: "Tatooine",
            films: [],
            species: [],
            starships: [],
            vehicles: [],
            url: "https://swapi.dev/api/people/1/",
            created: "2024-01-01",
            edited: "2024-01-02",
          },
        },
      })
    );

    const store = buildStore();
    const result = await store.dispatch(
      swapi.endpoints.getPersonById.initiate("1")
    );

    expect(result.data?.uid).toBe("1");
  });
});
