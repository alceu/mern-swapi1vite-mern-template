import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { setQuery, setSearchType } from "@pwa/features/search";

const dispatchMock = vi.fn();
let capturedSearchProps: any;
let capturedResultsProps: any;

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));

vi.mock("./Form", () => ({
  default: (props: any) => {
    capturedSearchProps = props;
    return <div data-testid="search-form" />;
  },
}));

vi.mock("./ResultsDisplay", () => ({
  default: (props: any) => {
    capturedResultsProps = props;
    return <div data-testid="results-display" />;
  },
}));

import Container from "./Container";

describe("Search Container", () => {
  it("dispatches initial search state and wires callbacks", () => {
    const onSearchSubmit = vi.fn();
    const onResultClick = vi.fn();

    render(
      <Container
        type="films"
        query="lu"
        onSearchSubmit={onSearchSubmit}
        onResultClick={onResultClick}
      />
    );

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("results-display")).toBeInTheDocument();

    expect(dispatchMock).toHaveBeenCalledWith(setSearchType("films"));
    expect(dispatchMock).toHaveBeenCalledWith(setQuery("lu"));

    capturedSearchProps.onSearch({
      searchType: "people",
      searchQuery: "leia",
    });
    expect(onSearchSubmit).toHaveBeenCalledWith({
      searchType: "people",
      searchQuery: "leia",
    });

    capturedResultsProps.onResultClick("1", "people");
    expect(onResultClick).toHaveBeenCalledWith("1", "people");
  });
});

