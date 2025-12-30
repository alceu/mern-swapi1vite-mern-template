import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const navigateMock = vi.fn();
const locationMock = {
  pathname: "/search",
  search: "?query=lu",
  hash: "",
  state: { from: "test" },
};

vi.mock("react-router-dom", () => ({
  Link: ({ children, to, className }: any) => (
    <a
      href={typeof to === "string" ? to : to?.pathname}
      className={className}
    >
      {children}
    </a>
  ),
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
}));

import Header from "./Header";

describe("Header", () => {
  it("renders the title and navigates to top searches", () => {
    render(<Header />);

    expect(
      screen.getByText("SWAPI M-E-R-N stack app example")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(navigateMock).toHaveBeenCalledWith(
      {
        pathname: locationMock.pathname,
        search: locationMock.search,
        hash: "#top-searches",
      },
      { state: locationMock.state }
    );
  });
});

