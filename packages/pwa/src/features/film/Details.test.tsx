import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Details from "./Details";

vi.mock("@pwa/api/swapi", () => ({
  useGetFilmByIdQuery: vi.fn(),
}));

vi.mock("./CharacterLink", () => ({
  default: ({ charId, onCharacterClick }: any) => (
    <button onClick={() => onCharacterClick(charId)}>
      Character {charId}
    </button>
  ),
}));

import { useGetFilmByIdQuery } from "@pwa/api/swapi";

describe("Film Details", () => {
  it("renders loading state", () => {
    vi.mocked(useGetFilmByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    } as any);

    render(
      <Details id="1" onBackToSearch={vi.fn()} onCharacterClick={vi.fn()} />
    );

    expect(
      screen.getByText("Loading film details...")
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useGetFilmByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    } as any);

    render(
      <Details id="1" onBackToSearch={vi.fn()} onCharacterClick={vi.fn()} />
    );

    expect(
      screen.getByText("Error loading film details.")
    ).toBeInTheDocument();
  });

  it("renders film details and handles callbacks", () => {
    const onBackToSearch = vi.fn();
    const onCharacterClick = vi.fn();

    vi.mocked(useGetFilmByIdQuery).mockReturnValue({
      data: {
        properties: {
          title: "A New Hope",
          opening_crawl: "A long time ago...",
          characters: ["https://swapi.dev/api/people/1/"],
        },
      },
      isLoading: false,
      error: undefined,
    } as any);

    render(
      <Details
        id="1"
        onBackToSearch={onBackToSearch}
        onCharacterClick={onCharacterClick}
      />
    );

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("A long time ago...")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Character 1"));
    expect(onCharacterClick).toHaveBeenCalledWith("1");

    fireEvent.click(screen.getByRole("button", { name: "Back to search" }));
    expect(onBackToSearch).toHaveBeenCalled();
  });
});

