import React from "react";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { vi } from "vitest";

import TopSearchesChart from "./TopSearchesChart";

vi.mock("@pwa/api/topSearches", () => ({
  useGetComposedTopSearchesQuery: vi.fn(),
}));

vi.mock("recharts", () => ({
  PieChart: ({ children }: { children: ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({ children }: { children: ReactNode }) => (
    <div data-testid="pie">{children}</div>
  ),
  Cell: ({ children }: { children?: ReactNode }) => (
    <div data-testid="cell">{children}</div>
  ),
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="responsive">{children}</div>
  ),
}));

import { useGetComposedTopSearchesQuery } from "@pwa/api/topSearches";

describe("TopSearchesChart", () => {
  it("renders loading state", () => {
    vi.mocked(useGetComposedTopSearchesQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    render(<TopSearchesChart title="Top Film Searches" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    vi.mocked(useGetComposedTopSearchesQuery).mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    render(<TopSearchesChart title="Top Film Searches" />);

    expect(
      screen.getByText("No top searches to display.")
    ).toBeInTheDocument();
  });

  it("renders chart data when available", () => {
    vi.mocked(useGetComposedTopSearchesQuery).mockReturnValue({
      data: [
        {
          searchQuery: { query: "luke" },
          percentage: 0.5,
        },
      ],
      isLoading: false,
    } as any);

    render(<TopSearchesChart title="Top Film Searches" />);

    expect(screen.getByText("Top Film Searches")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });
});

