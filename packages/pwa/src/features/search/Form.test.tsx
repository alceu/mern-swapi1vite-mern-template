import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Form from "./Form";

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

describe("Search Form", () => {
  it("renders the people placeholder and disables submit for short queries", () => {
    useSelectorMock.mockImplementation((selector) =>
      (selector as (state: unknown) => unknown)({
        features: {
          search: { query: "", searchType: "people", isSearching: false },
        },
      })
    );

    render(<Form onSearch={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("e.g. Luke Skywalker, C-3PO, R2-D2")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("renders the films placeholder when search type is films", () => {
    useSelectorMock.mockImplementation((selector) =>
      (selector as (state: unknown) => unknown)({
        features: {
          search: { query: "ab", searchType: "films", isSearching: false },
        },
      })
    );

    render(<Form onSearch={vi.fn()} />);

    expect(
      screen.getByPlaceholderText(
        "e.g. A New Hope, The Empire Strikes Back, Return of the Jedi"
      )
    ).toBeInTheDocument();
  });
});

