import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import ResultItem from "./ResultItem";

const useSelectorMock = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<typeof import("react-redux")>(
    "react-redux"
  );
  return {
    ...actual,
    useSelector: (selector: unknown) => useSelectorMock(selector),
  };
});

describe("ResultItem", () => {
  it("renders the name and calls the click handler with the search type", () => {
    useSelectorMock.mockImplementation((selector) =>
      (selector as (state: unknown) => string)({
        features: { search: { searchType: "people" } },
      })
    );

    const onResultClick = vi.fn();
    render(
      <ResultItem name="Luke Skywalker" id="1" onResultClick={onResultClick} />
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "See details" }));
    expect(onResultClick).toHaveBeenCalledWith("1", "people");
  });
});

