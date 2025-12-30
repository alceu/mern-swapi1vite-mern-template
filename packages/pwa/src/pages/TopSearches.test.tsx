import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const navigateMock = vi.fn();
const locationMock = {
  pathname: "/",
  search: "",
  hash: "#top-searches",
  state: { from: "test" },
};

vi.mock("react-router-dom", () => ({
  useLocation: () => locationMock,
  useNavigate: () => navigateMock,
}));

vi.mock("@pwa/features/topSearch/TopSearchesChart", () => ({
  default: ({ title }: any) => <div>{title}</div>,
}));

import TopSearchesPage from "./TopSearches";

describe("TopSearchesPage", () => {
  it("renders charts and closes modal", () => {
    render(<TopSearchesPage />);

    expect(screen.getByText("Top Searches Chart")).toBeInTheDocument();
    expect(screen.getByText("Top Film Searches")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(navigateMock).toHaveBeenCalledWith(
      { pathname: locationMock.pathname, search: locationMock.search, hash: "" },
      { state: locationMock.state }
    );
  });
});

