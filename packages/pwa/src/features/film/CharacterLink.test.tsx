import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import CharacterLink from "./CharacterLink";

vi.mock("@pwa/api/swapi", () => ({
  useGetPersonByIdQuery: vi.fn(),
}));

import { useGetPersonByIdQuery } from "@pwa/api/swapi";

describe("CharacterLink", () => {
  it("renders loading state", () => {
    vi.mocked(useGetPersonByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    } as any);

    render(<CharacterLink charId="1" onCharacterClick={vi.fn()} />);

    expect(screen.getByText("Loading character...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useGetPersonByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    } as any);

    render(<CharacterLink charId="1" onCharacterClick={vi.fn()} />);

    expect(screen.getByText("Error loading character.")).toBeInTheDocument();
  });

  it("renders the character name and handles click", () => {
    const onCharacterClick = vi.fn();
    vi.mocked(useGetPersonByIdQuery).mockReturnValue({
      data: { properties: { name: "Luke Skywalker" } },
      isLoading: false,
      error: undefined,
    } as any);

    render(
      <CharacterLink charId="1" onCharacterClick={onCharacterClick} />
    );

    fireEvent.click(screen.getByText("Luke Skywalker"));
    expect(onCharacterClick).toHaveBeenCalledWith("1");
  });
});

