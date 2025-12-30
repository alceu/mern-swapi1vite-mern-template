import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
}));

vi.mock("./Header", () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock("./TopSearches", () => ({
  default: () => <div data-testid="top-searches" />,
}));

import Layout from "./Layout";

describe("Layout", () => {
  it("renders header, outlet, and top searches sections", () => {
    render(<Layout />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("top-searches")).toBeInTheDocument();
  });
});

