import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Details from "./Details";

vi.mock("@pwa/api/swapi", () => ({
  useGetPersonByIdQuery: vi.fn(),
}));

vi.mock("./MovieLink", () => ({
  default: ({ filmId, onMovieClick }: any) => (
    <button onClick={() => onMovieClick(filmId)}>Movie {filmId}</button>
  ),
}));

import { useGetPersonByIdQuery } from "@pwa/api/swapi";

describe("Person Details", () => {
  it("renders loading state", () => {
    vi.mocked(useGetPersonByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    } as any);

    render(
      <Details id="1" onBackToSearch={vi.fn()} onMovieClick={vi.fn()} />
    );

    expect(
      screen.getByText("Loading person details...")
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useGetPersonByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    } as any);

    render(
      <Details id="1" onBackToSearch={vi.fn()} onMovieClick={vi.fn()} />
    );

    expect(screen.getByText("Error loading details.")).toBeInTheDocument();
  });

  it("renders person details and handles callbacks", () => {
    const onBackToSearch = vi.fn();
    const onMovieClick = vi.fn();

    vi.mocked(useGetPersonByIdQuery).mockReturnValue({
      data: {
        properties: {
          name: "Luke Skywalker",
          birth_year: "19BBY",
          gender: "male",
          eye_color: "blue",
          hair_color: "blond",
          height: "172",
          mass: "77",
          films: ["https://swapi.dev/api/films/1/"],
        },
      },
      isLoading: false,
      error: undefined,
    } as any);

    render(
      <Details
        id="1"
        onBackToSearch={onBackToSearch}
        onMovieClick={onMovieClick}
      />
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Birth Year:")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Movie 1"));
    expect(onMovieClick).toHaveBeenCalledWith("1");

    fireEvent.click(screen.getByRole("button", { name: "Back to search" }));
    expect(onBackToSearch).toHaveBeenCalled();
  });
});

