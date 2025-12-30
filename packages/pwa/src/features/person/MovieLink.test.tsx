import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MovieLink from "./MovieLink";

vi.mock("@pwa/api/swapi", () => ({
  useGetFilmByIdQuery: vi.fn(),
}));

import { useGetFilmByIdQuery } from "@pwa/api/swapi";

describe("MovieLink", () => {
  it("renders loading state", () => {
    vi.mocked(useGetFilmByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    } as any);

    render(<MovieLink filmId="1" onMovieClick={vi.fn()} />);

    expect(screen.getByText("Loading movie...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useGetFilmByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    } as any);

    render(<MovieLink filmId="1" onMovieClick={vi.fn()} />);

    expect(screen.getByText("Error loading movie.")).toBeInTheDocument();
  });

  it("renders the movie title and handles click", () => {
    const onMovieClick = vi.fn();
    vi.mocked(useGetFilmByIdQuery).mockReturnValue({
      data: { properties: { title: "A New Hope" } },
      isLoading: false,
      error: undefined,
    } as any);

    render(<MovieLink filmId="1" onMovieClick={onMovieClick} />);

    fireEvent.click(screen.getByText("A New Hope"));
    expect(onMovieClick).toHaveBeenCalledWith("1");
  });
});

