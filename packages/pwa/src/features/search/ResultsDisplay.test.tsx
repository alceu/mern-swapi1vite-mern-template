import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import ResultsDisplay from "./ResultsDisplay";

const useSelectorMock = vi.fn();
const useDispatchMock = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<typeof import("react-redux")>(
    "react-redux"
  );
  return {
    ...actual,
    useSelector: (selector: unknown) => useSelectorMock(selector),
    useDispatch: () => useDispatchMock,
  };
});

vi.mock("@pwa/api/swapi", () => ({
  useGetPeopleQuery: vi.fn(),
  useGetFilmsQuery: vi.fn(),
}));

vi.mock("@pwa/api/searchQueries", () => ({
  usePostSearchQueryMutation: vi.fn(),
}));

import {
  useGetPeopleQuery,
  useGetFilmsQuery,
} from "@pwa/api/swapi";
import { usePostSearchQueryMutation } from "@pwa/api/searchQueries";

describe("ResultsDisplay", () => {
  const baseState = {
    features: {
      search: { query: "lu", searchType: "people", isSearching: false },
    },
  };

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      (selector as (state: unknown) => unknown)(baseState)
    );
  });

  it("renders a loading message when searching", () => {
    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    } as any);
    vi.mocked(useGetFilmsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as any);
    vi.mocked(usePostSearchQueryMutation).mockReturnValue([vi.fn()] as any);

    render(<ResultsDisplay onResultClick={vi.fn()} />);

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("renders an error message when the query fails", () => {
    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    } as any);
    vi.mocked(useGetFilmsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as any);
    vi.mocked(usePostSearchQueryMutation).mockReturnValue([vi.fn()] as any);

    render(<ResultsDisplay onResultClick={vi.fn()} />);

    expect(screen.getByText("Error loading results.")).toBeInTheDocument();
  });

  it("renders results and posts search query updates", async () => {
    const postSearchQuery = vi.fn();

    vi.mocked(useGetPeopleQuery).mockReturnValue({
      data: [
        {
          uid: "1",
          properties: { name: "Luke Skywalker" },
        },
      ],
      isLoading: false,
      isError: false,
    } as any);
    vi.mocked(useGetFilmsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as any);
    vi.mocked(usePostSearchQueryMutation).mockReturnValue([
      postSearchQuery,
    ] as any);

    render(<ResultsDisplay onResultClick={vi.fn()} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    await waitFor(() => {
      expect(postSearchQuery).toHaveBeenCalledWith({
        query: "lu",
        type: "people",
      });
    });
  });
});

